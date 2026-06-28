import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { SEEDED_OPERATORS, SEEDED_LISTINGS } from './src/data.js';
import { Listing, Booking, Operator } from './src/types.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'data-store.json');

// Initialize local JSON Database if not existing
function initDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      operators: SEEDED_OPERATORS,
      listings: SEEDED_LISTINGS,
      bookings: [] as Booking[]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    console.log('Database initialized with pre-seeded Maharashtra listings & operators.');
  }
}

initDatabase();

// Helper functions to read/write DB
function readDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading database file, returning default pre-seeded state.', error);
    return {
      operators: SEEDED_OPERATORS,
      listings: SEEDED_LISTINGS,
      bookings: [] as Booking[]
    };
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file.', error);
  }
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Get listings
app.get('/api/listings', (req, res) => {
  const db = readDB();
  res.json(db.listings);
});

// Add new listing (Operator action)
app.post('/api/listings', (req, res) => {
  const db = readDB();
  const newListing: Listing = {
    ...req.body,
    id: `lst-${Date.now()}`,
    availableSlots: Number(req.body.maxGroupSize || 20)
  };
  
  db.listings.unshift(newListing);
  writeDB(db);
  res.status(201).json(newListing);
});

// Get operators
app.get('/api/operators', (req, res) => {
  const db = readDB();
  res.json(db.operators);
});

// Create/Update operator profile
app.post('/api/operators', (req, res) => {
  const db = readDB();
  const operatorData: Operator = req.body;
  
  // Check if exists
  const idx = db.operators.findIndex((op: any) => op.id === operatorData.id);
  if (idx > -1) {
    db.operators[idx] = { ...db.operators[idx], ...operatorData };
  } else {
    operatorData.id = operatorData.id || `op-${Date.now()}`;
    operatorData.rating = 5.0;
    operatorData.reviewCount = 1;
    operatorData.verified = true; // default verify for UX
    db.operators.push(operatorData);
  }
  
  writeDB(db);
  res.status(201).json(operatorData);
});

// Get bookings
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json(db.bookings);
});

// Create new booking (with simulation of payment status change)
app.post('/api/bookings', (req, res) => {
  const db = readDB();
  const bookingRequest = req.body;
  
  // Find listing to deduct slots
  const listingIdx = db.listings.findIndex((lst: any) => lst.id === bookingRequest.listingId);
  if (listingIdx === -1) {
    return res.status(404).json({ error: 'Selected adventure listing not found.' });
  }
  
  const listing = db.listings[listingIdx];
  const count = Number(bookingRequest.participantsCount || 1);
  
  if (listing.availableSlots < count) {
    return res.status(400).json({ error: `Not enough slots available. Only ${listing.availableSlots} spots remaining.` });
  }
  
  // Deduct slots
  listing.availableSlots -= count;
  db.listings[listingIdx] = listing;
  
  const newBooking: Booking = {
    id: `BKG-${Math.floor(100000 + Math.random() * 900000)}`,
    listingId: listing.id,
    listingTitle: listing.title,
    listingImage: listing.image,
    operatorId: listing.operatorId,
    operatorName: db.operators.find((op: any) => op.id === listing.operatorId)?.companyName || 'Local Operator',
    customerName: bookingRequest.customerName,
    customerEmail: bookingRequest.customerEmail,
    customerPhone: bookingRequest.customerPhone,
    bookingDate: bookingRequest.bookingDate,
    createdAt: new Date().toISOString(),
    participantsCount: count,
    participants: bookingRequest.participants || [],
    totalPrice: listing.price * count,
    paymentStatus: 'paid', // Seamless auto-paid on successful mock checkout
    paymentId: `pay_${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
    bookingStatus: 'confirmed'
  };
  
  db.bookings.unshift(newBooking);
  writeDB(db);
  res.status(201).json(newBooking);
});

// ==========================================
// GEMINI AI INTEGRATION (Saby Assistant)
// ==========================================
app.post('/api/ai/recommend', async (req, res) => {
  const { prompt, userContext } = req.body;
  const db = readDB();
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Graceful response if API Key is not configured yet
    return res.json({
      reply: `Hi! I'm **Saby**, your Sahyadri Adventure Guide. 🏔️ \n\nIt looks like my Gemini AI credentials are not fully wired up yet in the Secrets panel, but I am still happy to suggest some amazing adventures! \n\nBased on your query, I highly recommend exploring **Harishchandragad** if you want a beautiful, challenging trek with views of the epic Kokankada, or **Kolad** if you want adrenaline-pumping water sports and white-water rafting! \n\nLet me know if you would like me to show you our listings for these destinations!`,
      listings: db.listings.slice(0, 2)
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Provide listings context to the AI model so it can dynamically make connections!
    const listingsContext = db.listings.map((l: Listing) => {
      return `- [${l.title}] (ID: ${l.id}) - Category: ${l.category}, Destination: ${l.destination}, Price: INR ${l.price}, Difficulty: ${l.difficulty}, Duration: ${l.duration}, Best Time: ${l.bestTime}.`;
    }).join('\n');

    const systemInstruction = `You are 'Saby', the highly enthusiastic and expert AI Adventure Guide for Maharashtra Tourism. 
Your primary goal is to guide outdoor seekers to find their perfect weekend escape in the beautiful Western Ghats (Sahyadris) and coastal regions of Maharashtra.

Core Persona:
- Warm, professional, and adventurous.
- Extremely knowledgeable about historical forts (Chhatrapati Shivaji Maharaj's legacy), local trekking culture, and flora/fauna of the Sahyadris.
- You absolutely love local food: mention cravings like spicy 'Misal Pav', warm 'Poha', rustic 'Pitla Bhakri' with 'Thecha', or cooling 'Solkadhi' for river adventures.
- Safety-First Advocate: You must explicitly call out safety practices! (e.g. wearing proper trekking shoes, staying hydrated, avoiding swimming in flooded monsoon cascades, keeping trails clean from plastics).

Directory Integration (CRITICAL):
You have direct access to our live marketplace listings. You MUST reference these listings when relevant!
Whenever recommending one of our listings, format the link exactly as: [Trek Name](listing:LISTING_ID) where LISTING_ID matches the ID provided in the list below.
Do not invent listings that aren't in the provided list, but you can suggest overall destinations or regional sights (like Devkund Waterfall, Harishchandragad, Rajmachi, Bhandardara, Kalsubai).

Available Marketplace Listings:
${listingsContext}

Respond in clean, beautiful Markdown. Structure your recommendations with clear bullet points, bold text for visual emphasis, and high-energy encouragement!`;

    const contents = `User Query: "${prompt}"
User Demographics/Context: ${JSON.stringify(userContext || {})}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I was unable to process that. Let's try again with a different adventure question!";
    
    // Extract listing IDs from the generated text to provide rich UI-cards on the side
    const matchedListings: Listing[] = [];
    db.listings.forEach((l: Listing) => {
      if (replyText.includes(`listing:${l.id}`) || replyText.toLowerCase().includes(l.title.toLowerCase().substring(0, 15))) {
        matchedListings.push(l);
      }
    });

    res.json({
      reply: replyText,
      listings: matchedListings.length > 0 ? matchedListings : db.listings.slice(0, 2)
    });

  } catch (error: any) {
    console.error('Gemini API call failed:', error);
    res.status(500).json({ error: 'Failed to generate recommendations. Please try again.' });
  }
});


// ==========================================
// VITE OR STATIC FILE SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log('Vite Dev Middleware mounted.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build files from dist.');
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Maharashtra Tourism marketplace running on http://localhost:${PORT}`);
  });
}

startServer();
