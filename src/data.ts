import { Listing, Operator, Destination } from './types';

export const SEEDED_OPERATORS: Operator[] = [
  {
    id: 'op-sahyadri-rangers',
    companyName: 'Sahyadri Rangers Adventure Club',
    contactPerson: 'Abhishek Deshmukh',
    phone: '+91 98201 12345',
    email: 'info@sahyadrirangers.com',
    baseLocation: 'Pune, Maharashtra',
    experience: '8+ Years',
    licenseNumber: 'MHT-OPS-2018-094',
    rating: 4.9,
    reviewCount: 312,
    verified: true,
  },
  {
    id: 'op-kolad-rafting',
    companyName: 'Kundalika White-Water Pioneers',
    contactPerson: 'Sanjay Patil',
    phone: '+91 91670 54321',
    email: 'bookings@koladrafting.in',
    baseLocation: 'Kolad, Raigad',
    experience: '12+ Years',
    licenseNumber: 'MHT-OPS-2014-012',
    rating: 4.8,
    reviewCount: 480,
    verified: true,
  },
  {
    id: 'op-western-escapes',
    companyName: 'Western Ghats Escapes',
    contactPerson: 'Sneha Kulkarni',
    phone: '+91 88888 98765',
    email: 'sneha@westernescapes.com',
    baseLocation: 'Mumbai, Maharashtra',
    experience: '5+ Years',
    licenseNumber: 'MHT-OPS-2021-302',
    rating: 4.7,
    reviewCount: 185,
    verified: true,
  },
  {
    id: 'op-kalsubai-expeditions',
    companyName: 'Kalsubai Summit Guides',
    contactPerson: 'Rahul Gavit',
    phone: '+91 75060 11223',
    email: 'rahul@kalsubaiguides.co.in',
    baseLocation: 'Bari Village, Akole',
    experience: '15+ Years',
    licenseNumber: 'MHT-OPS-2011-003',
    rating: 4.95,
    reviewCount: 654,
    verified: true,
  }
];

export const SEEDED_DESTINATIONS: Destination[] = [
  {
    name: 'Harishchandragad',
    region: 'Ahmednagar District',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    description: 'An ancient hill fort dating back to the 6th century, famous for its grand Kokankada cliff, caves, and scenic rugged climbing routes.',
    popularFor: ['Trekking', 'Cave Camping', 'Star Gazing'],
  },
  {
    name: 'Kolad',
    region: 'Raigad District',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80',
    description: 'The white-water rafting capital of Maharashtra, located along the gushing Kundalika River, ideal for high-adrenaline adventure sports.',
    popularFor: ['White-Water Rafting', 'Ziplining', 'Kayaking'],
  },
  {
    name: 'Bhandardara',
    region: 'Nashik Region',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
    description: 'A quiet, pristine lakeside retreat set against Arthur Lake and surrounded by high Sahyadri peaks, perfect for camping under the stars.',
    popularFor: ['Lake Camping', 'Fireflies Trek', 'Boating'],
  },
  {
    name: 'Kalsubai Peak',
    region: 'Nagar-Nashik Border',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80',
    description: 'The Everest of Maharashtra, Kalsubai stands proud at 1,646m, offering unmatched panoramic views of surrounding forts and reservoirs.',
    popularFor: ['Night Trekking', 'Sunrise Summiting', 'Photography'],
  },
  {
    name: 'Rajmachi & Lonavala',
    region: 'Pune District',
    image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1000&q=80',
    description: 'Lush green valleys, mist-covered twin forts of Shrivardhan and Manaranjan, and spectacular monsoon waterfalls that come alive.',
    popularFor: ['Monsoon Treks', 'Historical Exploration', 'Home stays'],
  },
  {
    name: 'Devkund Waterfall',
    region: 'Bhira, Raigad',
    image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=1000&q=80',
    description: 'A magical plunge pool hidden deep inside the forests of Tamhini Ghat, where three streams join together to cascade into a turquoise pool.',
    popularFor: ['Forest Hiking', 'Natural Pool Swimming', 'Photography']
  }
];

export const SEEDED_LISTINGS: Listing[] = [
  {
    id: 'lst-harishchandra-kokankada',
    title: 'Harishchandragad Trek via Khireshwar & Kokankada Camping',
    category: 'trekking',
    destination: 'Harishchandragad',
    duration: '2 Days / 1 Night',
    difficulty: 'challenging',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    description: 'Conquer the legendary Harishchandragad Fort, explore medieval caves, visit the ancient Kedareshwar Cave Temple housing a massive Shiva Lingam surrounded by ice-cold water, and camp right on the edge of Kokankada—a massive semi-circular cliff with a colossal 1,800 ft vertical drop that looks like a cobra hood.',
    itinerary: [
      {
        day: 1,
        title: 'Khireshwar Ascent & Kokankada Sunset',
        activities: [
          '06:00 AM: Pick up from Mumbai/Pune in a private, sanitised non-AC coach.',
          '09:30 AM: Reach Khireshwar Base Village; enjoy a hearty traditional breakfast (Poha, Misal Pav, hot Chai).',
          '10:30 AM: Briefing from Sahyadri Rangers trek leaders and start the trek via Tolar Khind.',
          '02:30 PM: Reach the fort summit. Feat on a freshly prepared, authentic Maharashtrian veg lunch cooked by villagers.',
          '04:30 PM: Walk to the Kokankada cliff to witness a mind-blowing sunset, mist-filled clouds rising up, and rare circular rainbows.',
          '08:00 PM: Return to campsite, warm up by a roaring campfire with guitar music.',
          '09:30 PM: Unlimited local dinner (Veg/Non-Veg options, Pitla Bhakri, Sukka Chicken).',
          '10:30 PM: Sleep in high-quality double-sharing tents.'
        ]
      },
      {
        day: 2,
        title: 'Taramati Peak Summit & Temple Tour',
        activities: [
          '05:30 AM: Wake up early and hike to Taramati Peak, the highest point on the fort, for a majestic sunrise.',
          '08:00 AM: Return for breakfast (Maggie, Chai). Check out caves, temple ruins, and the Kedareshwar Cave.',
          '10:00 AM: Start descending towards Khireshwar.',
          '02:00 PM: Reach base village, have a refreshing lunch.',
          '03:30 PM: Board vehicles for return journey with lifelong adventure memories.',
          '08:00 PM: Tentative arrival back in Mumbai/Pune.'
        ]
      }
    ],
    inclusions: [
      'Transport from Mumbai/Pune to base and back in private transport',
      'Day 1: Breakfast, Lunch, Evening snacks, Dinner',
      'Day 2: Breakfast, Lunch',
      'A-Grade Tent accommodation on 2/3 sharing with foam mattress and warm blankets',
      'Certified safety instructors, first-aid responders, and local expert guides',
      'All entry fees and forest permissions'
    ],
    exclusions: [
      'Personal mineral water or carbonated drinks',
      'Any personal expenses, tips, or individual porter charges',
      'Insurance cover (available as an add-on during checkout)'
    ],
    gearRequired: [
      'Trekking shoes with sturdy rubber grip (Mandatory)',
      'A robust 30-40L backpack with rain cover',
      'Reusable water bottle (At least 2 litres)',
      'Torch/Headlamp with spare batteries',
      'Odomos mosquito repellent and personal medicine kit',
      'Full-sleeved trek pants and warm jacket for night temperatures'
    ],
    bestTime: 'Monsoons (July to Oct) and Winters (Nov to Feb)',
    distance: '135 km from Pune, 150 km from Mumbai',
    operatorId: 'op-sahyadri-rangers',
    maxGroupSize: 30,
    availableSlots: 14
  },
  {
    id: 'lst-kolad-whitewater',
    title: 'Premium Kundalika River White-Water Rafting & Adventure Gala',
    category: 'water_sports',
    destination: 'Kolad',
    duration: '1 Day',
    difficulty: 'moderate',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80',
    description: 'Experience pure adrenaline with 12 kilometers of continuous Grade II and III rapids on the gushing Kundalika River in Kolad. Controlled by water released from the Rawalje Dam, this is the only year-round white-water rafting location in India, guided by certified international-level river instructors.',
    itinerary: [
      {
        day: 1,
        title: 'Dam Release Rafting & Multi-Adventure Sports',
        activities: [
          '07:30 AM: Report at the Rafting Start Point in Kolad (Sajje village).',
          '08:00 AM: Get geared up with high-buoyancy lifejackets, professional helmets, and high-tensile oars.',
          '08:15 AM: Comprehensive 30-minute safety drill and paddling instructions by our river specialists.',
          '08:45 AM: Enter the rapids! Experience rapids with names like "Morning Headache", "Johnny Walker", and "The Butterfly". Swim safely in calm stretches.',
          '11:30 AM: Complete the 12 km rafting run at the end-point. Transfer back to the primary campsite.',
          '01:00 PM: Enjoy a hot buffet lunch (traditional Konkani cuisine, Fish curry, Solkadhi, Veg options).',
          '02:30 PM: Access supplementary activities: Zip-lining over the river, Kayaking, and Burma Bridge crossing.',
          '05:00 PM: Evening hot tea/coffee with local snacks (Kanda Bhaji). Depart with digital high-res action photos of your rafting adventure.'
        ]
      }
    ],
    inclusions: [
      'Full 12km white-water rafting equipment and licensing',
      'International Rescue 3 certified river captains',
      'Sumptuous buffet lunch (Veg and Non-Veg)',
      'Complementary Ziplining and Kayaking pass',
      'Local transport from rafting end-point back to start-point'
    ],
    exclusions: [
      'Travel to and from Kolad base camp (Mumbai/Pune transport add-on available)',
      'Photography & GoPro helmet video files (INR 300 payable directly to captain)',
      'Dry clothing rentals'
    ],
    gearRequired: [
      'Synthetic, quick-dry clothes (t-shirts & shorts; cotton jeans strictly forbidden)',
      'Sturdy water sandals or old sports shoes with straps (flip-flops NOT allowed)',
      'Complete change of dry clothes and a towel',
      'Sunscreen, waterproof pouch for mobile phones'
    ],
    bestTime: 'Monsoons (June to Sept) is prime. Feasible till May.',
    distance: '110 km from Mumbai, 120 km from Pune',
    operatorId: 'op-kolad-rafting',
    maxGroupSize: 50,
    availableSlots: 28
  },
  {
    id: 'lst-bhandardara-stars',
    title: 'Secret Lakeside Camping at Bhandardara & Star Gazing session',
    category: 'camping',
    destination: 'Bhandardara',
    duration: '2 Days / 1 Night',
    difficulty: 'easy',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
    description: 'Escape the city rush and camp on a secluded peninsula protruding into the crystal-clear waters of Arthur Lake. Watch fireflies glow in the dark forests, gaze at the stellar Milky Way galaxy through an astronomical telescope, and wake up to a stunning mist-covered view of Mt. Kalsubai.',
    itinerary: [
      {
        day: 1,
        title: 'Boating, Sunset & Star-Gazing',
        activities: [
          '03:00 PM: Arrive at Bhandardara lakeside camp; check into premium weather-proof dome tents.',
          '04:30 PM: Leisurely motorboat ride across Arthur Lake to explore the iconic Sandhan Valley mouth.',
          '05:30 PM: Evening snacks with tea as the sun sets over the Sahyadri mountains.',
          '07:00 PM: Prepare barbecue skewers (Paneer, Potatoes, Chicken) with customized spices.',
          '08:30 PM: Expert-led astronomical session with an 8-inch computerized telescope. Spot Saturn ring, Moon craters, and distant nebulas.',
          '10:00 PM: Enjoy local Maharashtrian unlimited dinner cooked on wood fires.',
          '11:00 PM: Live acoustic music and stargazing near the warmth of the bonfire.'
        ]
      },
      {
        day: 2,
        title: 'Kayaking & Umbrella Falls hike',
        activities: [
          '06:30 AM: Sunrise kayaking on the calm lake water.',
          '08:00 AM: Delicious breakfast (Misal Pav, Eggs to order, tea).',
          '09:30 AM: Brief hike to the majestic Umbrella Falls and historical Wilson Dam built in 1910.',
          '11:30 AM: Check out from camp with peaceful minds and rejuvenated spirits.'
        ]
      }
    ],
    inclusions: [
      'Lakeside tent camping with cozy sleeping bags, pillows and clean air-pillows',
      'Unlimited High Tea, Barbecue (200g/person), Dinner, and Day 2 Breakfast',
      'High-grade Telescope Stargazing with astronomer guide',
      '15-minute Boat ride and Kayaking session with safety jacket',
      'Clean washrooms, first aid, and charging points at base camp'
    ],
    exclusions: [
      'Travel to Bhandardara village',
      'Any additional meals or activity upgrades',
      'Lakeside forest conservation entrance fee (INR 30/person)'
    ],
    gearRequired: [
      'Warm jackets or sweaters (night temperatures plunge below 12°C)',
      'Comfortable sports shoes',
      'Odomos cream and personal sanitation items',
      'Camera or smartphone with tripod for night photography'
    ],
    bestTime: 'November to May for Stargazing; June to August for Waterfalls and Fireflies.',
    distance: '165 km from Mumbai, 175 km from Pune',
    operatorId: 'op-western-escapes',
    maxGroupSize: 40,
    availableSlots: 22
  },
  {
    id: 'lst-kalsubai-sunrise',
    title: 'Kalsubai Night Trek to the Highest Peak of Maharashtra',
    category: 'trekking',
    destination: 'Kalsubai Peak',
    duration: '1 Day / 1 Night',
    difficulty: 'challenging',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80',
    description: 'Challenge yourself to summit the highest geographical peak in Maharashtra, soaring high at 1,646 meters (5,400 feet). This overnight guided night trek uses ladders and stone steps to reach the Kalsubai Temple at the summit, just in time to witness an iconic, breathtaking golden sunrise over Arthur Lake and the Bhandardara dam backwaters.',
    itinerary: [
      {
        day: 1,
        title: 'Night Travel & Bari Village Base',
        activities: [
          '09:30 PM: Private bus pick-ups from Mumbai (Dadar, Thane) / Pune (Shivajinagar).',
          '01:30 AM: Arrive at Bari Village base. Quick briefing, warm up stretching, and high-energy snacks distribution.',
          '02:00 AM: Under a starry sky, begin the night climb guided by Kalsubai Summit Guides carrying emergency safety lights.'
        ]
      },
      {
        day: 2,
        title: 'Golden Sunrise Summit & Bari descent',
        activities: [
          '05:30 AM: Climb the final vertical iron ladder to reach the flat summit block.',
          '06:00 AM: Witness the spectacular golden sunrise. Watch the rays pierce through dense fog and illuminate the whole Sahyadri range.',
          '07:00 AM: Warm tea served right at the temple summit by local villagers. Take photos.',
          '07:30 AM: Begin descending back towards Bari Village.',
          '10:30 AM: Arrive back at Bari; refresh and indulge in an unlimited rustic Maharashtrian breakfast.',
          '12:00 PM: Depart base village in our comfortable private coach.',
          '04:30 PM: Reach Mumbai/Pune safely.'
        ]
      }
    ],
    inclusions: [
      'Travel in non-AC pushback luxury seaters from Mumbai/Pune',
      'Midnight energy refreshments and warm tea at base',
      'Day 2: Unlimited local breakfast and lunch (Veg/Non-Veg options)',
      'Expert local Bari guides with state-of-the-art trekking equipment',
      'Kalsubai peak entry registry fees and forest permits'
    ],
    exclusions: [
      'Personal snacks, dry energy bars',
      'Porter services (can be hired at base village for INR 500)'
    ],
    gearRequired: [
      'Headlamp or sturdy hand torch with high beam (Mandatory for night hike)',
      'Trekking shoes with solid grip (Avoid flat soles or worn-out runners)',
      'Double-strap backpack, water bottle (at least 2.5L)',
      'Windcheater or jacket (summit gets extremely windy and cold)',
      'Electoral powder or ORS sachets'
    ],
    bestTime: 'July to September (Monsoon mist and green meadows) or October to February (Clear winters).',
    distance: '155 km from Mumbai, 160 km from Pune',
    operatorId: 'op-kalsubai-expeditions',
    maxGroupSize: 35,
    availableSlots: 15
  },
  {
    id: 'lst-lonavala-paragliding',
    title: 'Tandem Paragliding over Lonavala Scenic Valleys',
    category: 'paragliding',
    destination: 'Rajmachi & Lonavala',
    duration: '1 Day',
    difficulty: 'easy',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1000&q=80',
    description: 'Fulfill your dream of flying like a bird over the spectacular, emerald valleys of Lonavala and Kamshet. Fly tandem with a highly qualified, USHPA certified paragliding pilot. No prior experience is needed as you simply take a short run and glide into the thermal winds, looking down on historical forts, lakes, and expressway twists.',
    itinerary: [
      {
        day: 1,
        title: 'Kamshet Flight & Video session',
        activities: [
          '09:00 AM: Report at Kamshet Paragliding hub (Shelar/Karanjole hills based on wind).',
          '09:30 AM: Introduction to flight gear, glider anatomy, and safety protocols.',
          '10:00 AM: Harnessing up with your professional pilot. Check helmet and radio.',
          '10:15 AM: Run 10 steps off the gentle slope and lift off! Enjoy a 10 to 15-minute glider flight.',
          '11:00 AM: Soft landing in the green fields below. Receive your high-definition flight video captured on a wide-angle GoPro stick.'
        ]
      }
    ],
    inclusions: [
      '10-15 min Tandem Flight with certified flight instructor',
      'State-of-the-art paragliding wing, harnesses, reserve parachute, helmet',
      'Complete GoPro flight video and selfie photos package',
      'Safety insurance coverage for pilot and passenger'
    ],
    exclusions: [
      'Transport to paragliding site from Mumbai/Pune (local trains go directly to Kamshet)',
      'Food and meals'
    ],
    gearRequired: [
      'Sturdy closed shoes (sports shoes are mandatory; sandals/slippers will fly off)',
      'Comfortable full clothes (jeans or track pants and full t-shirt)',
      'Sunglasses, sun cap'
    ],
    bestTime: 'October to May (Excellent wind thermals, clear skies). Not operated during peak monsoons for safety.',
    distance: '45 km from Pune, 110 km from Mumbai',
    operatorId: 'op-western-escapes',
    maxGroupSize: 15,
    availableSlots: 8
  }
];
