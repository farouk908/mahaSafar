import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Compass, MessageSquareCode, ShieldAlert, Coffee, AlertCircle, Loader2 } from 'lucide-react';
import { Listing } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectListing: (listing: Listing) => void;
  listings: Listing[];
}

interface ChatMessage {
  sender: 'user' | 'saby';
  text: string;
  matchedListings?: Listing[];
}

export default function AIAssistant({
  isOpen,
  onClose,
  onSelectListing,
  listings,
}: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'saby',
      text: "Apla Swagat Ahe! 🏔️ I am **Saby**, your local Sahyadri Adventure Guide! I can help you find your perfect weekend getaway across Maharashtra. \n\nAsk me anything about treks, white-water rafting, weather conditions, or gear prep! Feel free to try our quick guides below.",
    }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quick prompt chips
  const promptChips = [
    { label: '⛰️ Recommend a monsoon trek', prompt: 'Suggest a beautiful, safe trekking experience in Maharashtra during the monsoons.' },
    { label: '🌊 Thrilling water adventures', prompt: 'Where can I go for the best water sports or white-water rafting in Maharashtra?' },
    { label: '🏕️ Camping under the stars', prompt: 'Recommend a peaceful lakeside camping experience with clear night stargazing.' },
    { label: '🏰 Tell me about Shivaji Maharaj forts', prompt: 'Explain the history of Harishchandragad and its medieval forts.' }
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          userContext: {
            currentTime: new Date().toISOString(),
            currentSeason: 'Monsoons/Early Winters'
          }
        })
      });

      if (!response.ok) {
        throw new Error('AI Server is not responding.');
      }

      const data = await response.json();
      
      const sabyMsg: ChatMessage = {
        sender: 'saby',
        text: data.reply,
        matchedListings: data.listings || []
      };

      setMessages((prev) => [...prev, sabyMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'saby',
          text: "Mafi Asavi! I am experiencing a temporary connection lag with my Sahyadri knowledge base. \n\nFor a quick suggestion: I highly recommend checking out our **Harishchandragad Trek** for scenic views, or **Kolad** for adrenaline-pumping white water rafting. Let me know if you would like to explore these listings directly!",
          matchedListings: listings.slice(0, 2)
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Chat message rendering with special link support
  const renderMessageContent = (msg: ChatMessage) => {
    const text = msg.text;
    
    // Simple markdown parsing for bold text and newlines
    const lines = text.split('\n').map((line, lineIdx) => {
      // Parse bold **text**
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      const parsedLine = parts.map((part, partIdx) => {
        if (partIdx % 2 === 1) {
          return <strong key={partIdx} className="font-extrabold text-brand-moss-900">{part}</strong>;
        }
        
        // Parse special markdown links `[Title](listing:ID)`
        const linkParts = part.split(/\[([^\]]+)\]\(listing:([^)]+)\)/g);
        if (linkParts.length > 1) {
          return linkParts.map((sub, sIdx) => {
            if (sIdx % 3 === 1) {
              const listingId = linkParts[sIdx + 1];
              const matchedListing = listings.find((l) => l.id === listingId);
              return (
                <button
                  key={sIdx}
                  onClick={() => matchedListing && onSelectListing(matchedListing)}
                  className="mx-0.5 inline-flex items-center rounded-md bg-brand-clay-100 px-1.5 py-0.5 text-xs font-bold text-brand-clay-600 transition-all hover:bg-brand-clay-200 hover:scale-102 cursor-pointer"
                >
                  <Compass className="h-3 w-3 mr-0.5" />
                  {sub}
                </button>
              );
            }
            if (sIdx % 3 === 2) return null; // skipped ID part
            return sub;
          });
        }
        return part;
      });

      return <p key={lineIdx} className="mt-1.5 first:mt-0 leading-relaxed">{parsedLine}</p>;
    });

    return (
      <div className="space-y-1">
        <div>{lines}</div>
        
        {/* Render card suggestions directly in the chat balloon if matching listings are attached */}
        {msg.matchedListings && msg.matchedListings.length > 0 && (
          <div className="mt-3.5 space-y-2 border-t border-slate-100 pt-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matched Adventures:</p>
            <div className="grid grid-cols-1 gap-2">
              {msg.matchedListings.map((l) => (
                <div
                  key={l.id}
                  onClick={() => onSelectListing(l)}
                  className="flex items-center space-x-3 rounded-xl border bg-white p-2.5 shadow-xs hover:border-brand-moss-300 transition-all cursor-pointer hover:scale-101"
                >
                  <img
                    src={l.image}
                    alt={l.title}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{l.title}</h5>
                    <p className="text-[10px] text-brand-moss-600 font-bold mt-0.5">₹{l.price} / person • {l.difficulty}</p>
                  </div>
                  <Compass className="h-4 w-4 text-brand-clay-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl border-l border-slate-200/80 animate-slide-in">
      {/* Saby Header */}
      <div className="bg-brand-moss-900 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-moss-800 text-brand-gold-500 shadow-md">
            <Sparkles className="h-5 w-5 animate-pulse text-brand-gold-500" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-brand-moss-900"></span>
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center">
              <span>Saby AI Travel Guide</span>
            </h3>
            <p className="text-[10px] text-slate-300">Sahyadri Specialist Advisor</p>
          </div>
        </div>
        
        <button 
          onClick={onClose} 
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white transition-all hover:bg-black/40 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Message Log Window */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                msg.sender === 'user'
                  ? 'bg-brand-clay-500 text-white font-medium rounded-tr-none'
                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50'
              }`}
            >
              {renderMessageContent(msg)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tl-none p-4 bg-slate-100 text-slate-500 text-xs border flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-brand-moss-700" />
              <span>Saby is consulting local maps...</span>
            </div>
          </div>
        )}
      </div>

      {/* Saby Prompt Suggestions chips */}
      <div className="bg-slate-50 border-t p-3 space-y-1.5">
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Inquiries:</span>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-1">
          {promptChips.map((chip) => (
            <button
              key={chip.label}
              disabled={isLoading}
              onClick={() => handleSendMessage(chip.prompt)}
              className="rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[10px] text-slate-600 font-semibold hover:border-brand-moss-500 hover:text-brand-moss-700 hover:bg-slate-50 transition-all disabled:opacity-40 cursor-pointer text-left"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* User Chat Input */}
      <div className="border-t p-4 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(userInput);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            required
            disabled={isLoading}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask about monsoon treks, rafting safety..."
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-brand-moss-500 focus:ring-1 focus:ring-brand-moss-100 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-moss-800 text-white shadow hover:bg-brand-moss-750 disabled:opacity-50 cursor-pointer shrink-0"
          >
            <Send className="h-4 w-4 text-brand-gold-500" />
          </button>
        </form>
      </div>
    </div>
  );
}
