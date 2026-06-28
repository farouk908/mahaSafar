import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DestinationsGrid from './components/DestinationsGrid';
import ListingCard from './components/ListingCard';
import ListingDetailModal from './components/ListingDetailModal';
import CheckoutModal from './components/CheckoutModal';
import OperatorDashboard from './components/OperatorDashboard';
import AIAssistant from './components/AIAssistant';
import SafetyPortal from './components/SafetyPortal';
import AboutUs from './components/AboutUs';
import { Listing, Booking, ActivityCategory, TabType } from './types';
import { Compass, Calendar, Sparkles, MapPin, Search, Star, MessageSquareCode, ShieldAlert, BadgeCheck, AlertCircle, Phone, Globe, Trees } from 'lucide-react';

export default function App() {
  // Navigation & Filter States
  const [currentTab, setCurrentTab] = useState<TabType>('explore');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Loaded Directory Data
  const [listings, setListings] = useState<Listing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modal / Sidebar Controls
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isBookingInitiated, setIsBookingInitiated] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [participantsCount, setParticipantsCount] = useState<number>(1);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);

  // Load directories on mount
  useEffect(() => {
    fetchListings();
    fetchBookings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await fetch('/api/listings');
      const data = await res.json();
      setListings(data);
    } catch (e) {
      console.error('Error fetching adventure listings:', e);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (e) {
      console.error('Error fetching customer passes:', e);
    }
  };

  const handleInitiateBooking = (listing: Listing, date: string, count: number) => {
    setBookingDate(date);
    setParticipantsCount(count);
    setIsBookingInitiated(true);
  };

  const handleBookingComplete = (newBooking: Booking) => {
    // Add to state and redirect
    setBookings((prev) => [newBooking, ...prev]);
    setIsBookingInitiated(false);
    setSelectedListing(null);
    setCurrentTab('bookings'); // Go view passes!
    
    // Refetch in background to update slot counts
    fetchListings();
  };

  const handleAddListing = async (listingData: any) => {
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listingData)
      });
      if (!res.ok) throw new Error('Failed to create listing');
      
      const savedListing = await res.json();
      setListings((prev) => [savedListing, ...prev]);
      alert('Adventure Listing published successfully to the directory!');
    } catch (e) {
      console.error(e);
      alert('Error creating listing.');
    }
  };

  // Parsing & filtering adventure listings
  const filteredListings = listings.filter((l) => {
    // Category filter
    if (selectedCategory && l.category !== selectedCategory) return false;
    
    // Difficulty filter
    if (selectedDifficulty && l.difficulty !== selectedDifficulty) return false;
    
    // Regional Destination filter
    if (selectedDestination && l.destination !== selectedDestination) return false;
    
    // Global text search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(query);
      const matchDesc = l.description.toLowerCase().includes(query);
      const matchDest = l.destination.toLowerCase().includes(query);
      const matchCategory = l.category.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc && !matchDest && !matchCategory) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {/* Brand Header Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // If moving tabs, clear modal details
          setSelectedListing(null);
          setIsBookingInitiated(false);
        }}
        bookingCount={bookings.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openAIAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Main tab screen render layout */}
      <main className="flex-1">
        
        {/* TAB 1: EXPLORE MARKETPLACE */}
        {currentTab === 'explore' && (
          <div className="space-y-6">
            {/* Sahyadri Hero Section with filters */}
            <Hero
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              onQuickSearch={(term) => setSearchQuery(term)}
            />

            {/* Regional Destinations horizontal scroll grids */}
            <DestinationsGrid
              selectedDestination={selectedDestination}
              onSelectDestination={setSelectedDestination}
            />

            {/* Search results banner / current filter summary */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E1D8] pb-5 gap-4">
                <div>
                  <h3 className="text-2xl font-serif font-medium text-[#1B2B20] tracking-tight flex items-center italic">
                    <span>Available Expeditions</span>
                    <span className="ml-2 rounded-full bg-brand-moss-100 px-2.5 py-0.5 text-xs font-bold text-brand-moss-800">
                      {filteredListings.length} Trips
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Showing real-time slots and pre-audited safety listings for Maharashtra.
                  </p>
                </div>

                {/* Reset button if filter is active */}
                {(selectedCategory || selectedDifficulty || selectedDestination || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedDifficulty(null);
                      setSelectedDestination(null);
                      setSearchQuery('');
                    }}
                    className="self-start sm:self-center text-xs font-bold text-brand-clay-500 hover:text-brand-clay-600 transition-all underline cursor-pointer"
                  >
                    Reset All Search Filters
                  </button>
                )}
              </div>

              {/* Grid of adventures */}
              {filteredListings.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto mt-10">
                  <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">No Adventures Match Filters</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                    We couldn't find matching active batches. Try loosening your difficulty settings or ask Saby, our AI Advisor, to recommend alternatives!
                  </p>
                  <button
                    onClick={() => setAiAssistantOpen(true)}
                    className="mt-5 inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-brand-moss-800 to-brand-moss-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4 text-brand-gold-500 animate-pulse" />
                    <span>Ask Saby to Suggest Trips</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                  {filteredListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onViewDetails={setSelectedListing}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MY BOOKINGS (PASSES LOG) */}
        {currentTab === 'bookings' && (
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="border-b pb-6 mb-8">
              <div className="flex items-center space-x-1.5 text-brand-clay-500 font-semibold text-sm tracking-wider uppercase">
                <Calendar className="h-4 w-4" />
                <span>My Personal Passes & Vouchers</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl mt-1">
                Your Adventure passes
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Active tickets issued for upcoming weekend adventures. Present these QR codes at assembly coordinates.
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-lg mx-auto">
                <Compass className="h-12 w-12 text-slate-300 mx-auto mb-3 animate-spin-slow" />
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">No active adventure passes</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                  You haven't booked any experiences yet. Browse the directories or speak with Saby AI to book your first weekend getaway!
                </p>
                <button
                  onClick={() => setCurrentTab('explore')}
                  className="mt-6 rounded-xl bg-brand-moss-800 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-moss-750 cursor-pointer"
                >
                  Explore Adventure Listings
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="relative border-2 border-slate-200/80 bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row"
                  >
                    {/* Left Section: Adventure Cover */}
                    <div className="relative w-full md:w-56 h-40 md:h-auto shrink-0 bg-slate-100">
                      <img
                        src={booking.listingImage}
                        alt={booking.listingTitle}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/10 md:to-transparent"></div>
                      <span className="absolute top-3 left-3 rounded-full bg-brand-clay-500 px-2.5 py-1 text-[9px] font-extrabold text-white uppercase tracking-wider">
                        {booking.id}
                      </span>
                    </div>

                    {/* Middle Section: Pass Details */}
                    <div className="flex-1 p-6 text-xs text-slate-600 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-brand-moss-700 uppercase tracking-wider">MAHARASHTRA TOURISM APPROVED PASS</span>
                        <h4 className="text-base font-black text-slate-900 leading-snug mt-1">{booking.listingTitle}</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-3 border-y border-slate-100 py-3">
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">BATCH WEEKEND</span>
                          <span className="font-extrabold text-slate-800 mt-0.5">{booking.bookingDate}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">HEAD TRAVELER</span>
                          <span className="font-bold text-slate-800 mt-0.5 truncate block">{booking.customerName}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">VERIFIED OPERATOR</span>
                          <span className="font-extrabold text-brand-moss-800 mt-0.5 block">{booking.operatorName}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold text-slate-400 uppercase">TREKKERS BATCH</span>
                          <span className="font-bold text-slate-800 mt-0.5 block">{booking.participantsCount} Seats Registered</span>
                        </div>
                      </div>

                      {/* Participant Names sublist */}
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase mb-1.5">Registered Travelers Roster:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {booking.participants.map((p, idx) => (
                            <span key={idx} className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700 border border-slate-200/50">
                              {p.name} ({p.age}, {p.gender})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Section: Secure QR & Actions */}
                    <div className="border-t md:border-t-0 md:border-l border-slate-100 bg-slate-50/50 p-6 flex flex-col justify-between items-center text-center w-full md:w-48 shrink-0">
                      
                      {/* Secure QR */}
                      <div className="space-y-1 text-center">
                        <div className="h-20 w-20 border bg-white p-1 rounded-lg mx-auto shadow-xs">
                          <svg viewBox="0 0 100 100" className="h-full w-full">
                            <rect x="0" y="0" width="20" height="20" fill="currentColor" className="text-slate-900" />
                            <rect x="80" y="0" width="20" height="20" fill="currentColor" className="text-slate-900" />
                            <rect x="0" y="80" width="20" height="20" fill="currentColor" className="text-slate-900" />
                            <rect x="25" y="25" width="10" height="10" fill="currentColor" className="text-slate-900" />
                            <rect x="45" y="15" width="20" height="15" fill="currentColor" className="text-slate-900" />
                            <rect x="65" y="55" width="15" height="25" fill="currentColor" className="text-slate-900" />
                            <rect x="15" y="55" width="25" height="15" fill="currentColor" className="text-slate-900" />
                          </svg>
                        </div>
                        <span className="text-[9px] font-mono font-extrabold text-slate-400">QR SCAN TO CHECK-IN</span>
                      </div>

                      {/* Receipt specs */}
                      <div className="mt-4 md:mt-0 space-y-1.5 w-full">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase">Paid: ₹{booking.totalPrice}</span>
                        <button
                          onClick={() => {
                            alert('Voucher pass ready for offline save! PDF tickets contain assembly village maps, weather advisory, and gear checklists.');
                          }}
                          className="w-full text-center block rounded-xl bg-brand-moss-800 py-2 text-[11px] font-bold text-white hover:bg-brand-moss-700 transition-all cursor-pointer"
                        >
                          Print Voucher Pass
                        </button>
                      </div>
                    </div>

                    {/* Scalloped ticket dividers on desktop */}
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-3 h-6 w-6 rounded-full bg-slate-50 border-r border-slate-200"></div>
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[11.4rem] h-6 w-6 rounded-full bg-slate-50 border-l border-slate-200"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OPERATOR WORKSPACE AREA */}
        {currentTab === 'operator' && (
          <OperatorDashboard
            listings={listings}
            bookings={bookings}
            onAddListing={handleAddListing}
          />
        )}

        {/* TAB 4: SAFETY GUIDES PORTAL */}
        {currentTab === 'safety' && (
          <SafetyPortal />
        )}

        {/* TAB 5: ABOUT US */}
        {currentTab === 'about' && (
          <AboutUs />
        )}

      </main>

      {/* DETAILED ADVENTURE DRILL MODAL */}
      {selectedListing && !isBookingInitiated && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onInitiateBooking={handleInitiateBooking}
        />
      )}

      {/* SECURE PAYMENT & TREKKER REGISTRATION MODAL */}
      {selectedListing && isBookingInitiated && (
        <CheckoutModal
          listing={selectedListing}
          bookingDate={bookingDate}
          participantsCount={participantsCount}
          onClose={() => setIsBookingInitiated(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* SABY AI ASSISTANT SLIDE-OUT PANEL */}
      <AIAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        listings={listings}
        onSelectListing={(listing) => {
          // Open details modal directly from AI recommendation clicks!
          setSelectedListing(listing);
          setAiAssistantOpen(false);
        }}
      />

      {/* Dynamic Floating FAB launcher for AI Guide */}
      {!aiAssistantOpen && (
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="pulse-ring fixed bottom-6 right-6 z-35 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-brand-moss-800 to-brand-moss-600 text-white shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer text-brand-gold-500 hover:text-white"
          title="Ask Saby AI Sahyadri Guide"
        >
          <Sparkles className="h-6 w-6 animate-pulse" />
        </button>
      )}

      {/* Centralized Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h4 className="text-base font-extrabold text-white">MahaSafar Outdoor Adventures</h4>
              <p className="max-w-md text-slate-500">
                Centralized discovery and booking marketplace for adventure tourism in Maharashtra. Empowering local communities and promoting responsible, sustainable travel.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span onClick={() => { setSelectedCategory('trekking'); setCurrentTab('explore'); }} className="hover:text-white transition-colors cursor-pointer">Trekking</span>
              <span onClick={() => { setSelectedCategory('camping'); setCurrentTab('explore'); }} className="hover:text-white transition-colors cursor-pointer">Lakeside Camping</span>
              <span onClick={() => { setSelectedCategory('water_sports'); setCurrentTab('explore'); }} className="hover:text-white transition-colors cursor-pointer">River Rafting</span>
              <span onClick={() => setCurrentTab('safety')} className="hover:text-white transition-colors cursor-pointer">Safety Guides</span>
              <span onClick={() => setCurrentTab('about')} className="hover:text-white transition-colors cursor-pointer">About Us</span>
              <span onClick={() => setAiAssistantOpen(true)} className="hover:text-white transition-colors cursor-pointer">Ask Saby AI</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row md:items-center justify-between text-[11px] text-slate-500 gap-4">
            <div className="flex items-center space-x-1.5">
              <Trees className="h-4 w-4 text-emerald-500" />
              <span>Supported by Directorate of Tourism, Government of Maharashtra. Always Keep Trails Clean.</span>
            </div>
            
            <p>© 2026 MahaSafar Tourism. Designed for Adventure Seekers. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
