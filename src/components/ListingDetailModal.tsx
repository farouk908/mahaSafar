import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Users, ShieldAlert, BadgeCheck, FileText, Backpack, Utensils, Star, Info, ChevronRight, Phone } from 'lucide-react';
import { Listing, ItineraryDay, Operator } from '../types';
import { SEEDED_OPERATORS } from '../data';

interface ListingDetailModalProps {
  listing: Listing;
  onClose: () => void;
  onInitiateBooking: (listing: Listing, bookingDate: string, participantsCount: number) => void;
}

export default function ListingDetailModal({
  listing,
  onClose,
  onInitiateBooking,
}: ListingDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'operator' | 'gear'>('overview');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [ticketCount, setTicketCount] = useState<number>(1);

  // Retrieve operator details
  const operator: Operator = SEEDED_OPERATORS.find((op) => op.id === listing.operatorId) || {
    id: 'op-unknown',
    companyName: 'Local Sahyadri Guides Association',
    contactPerson: 'Aditya Shinde',
    phone: '+91 90000 11111',
    email: 'contact@operators.mahasafar.gov',
    baseLocation: 'Maharashtra, India',
    experience: '10+ Years',
    licenseNumber: 'MHT-OPS-PENDING',
    rating: 4.8,
    reviewCount: 42,
    verified: true,
  };

  // Check if destination matches any regional hotspots based on Maharashtra Disaster Cell Advisory database
  const getGovernmentAdvisory = (dest: string, titleStr: string) => {
    const destLower = (dest + ' ' + titleStr).toLowerCase();
    if (destLower.includes('kolad') || destLower.includes('devkund') || destLower.includes('raigad')) {
      return {
        level: 'Weather Alert',
        color: 'border-red-200 bg-red-50 text-red-800',
        message: 'Raigad District Authority: Heavy rainfall active. Devkund plunge pool treks are monitored by local disaster rescue cells. River rafting in Kolad is strictly synchronized with daily Rawalje Dam water release times.'
      };
    } else if (destLower.includes('pune') || destLower.includes('lonavala') || destLower.includes('rajmachi') || destLower.includes('harishchandra')) {
      return {
        level: 'Safety Advisory',
        color: 'border-amber-200 bg-amber-50 text-amber-800',
        message: 'Maha Adventure Council (MAC): Moderate rainfall. Beware of slippery basalt rock scrambles near Kokankada. Guide-to-adventurer ratio of 1:8 is strictly active on these trails.'
      };
    }
    return {
      level: 'Clear Trails',
      color: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      message: 'State Adventure Tourism Office: Weather normal. Trekking paths are fully open under standard local gram panchayat supervision. Please pack out all personal trash.'
    };
  };

  const advisory = getGovernmentAdvisory(listing.destination, listing.title);

  // Generate three future dates for the booking selector based on weekend schedules (Treks usually happen on Sat/Sun)
  const getUpcomingWeekends = () => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    
    // Find upcoming Saturdays and Sundays
    while (dates.length < 3) {
      current.setDate(current.getDate() + 1);
      const day = current.getDay();
      if (day === 0 || day === 6) {
        dates.push(new Date(current));
      }
    }
    return dates;
  };

  const bookingDates = getUpcomingWeekends();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Please select a booking date to proceed.');
      return;
    }
    onInitiateBooking(listing, selectedDate, ticketCount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-moss-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div 
        id="listing-detail-modal"
        className="relative flex h-full max-h-[92vh] w-full max-w-5xl flex-col rounded-3xl bg-white shadow-2xl overflow-hidden md:h-auto"
      >
        {/* Header Block with image back */}
        <div className="relative h-48 w-full md:h-64">
          <img
            src={listing.image}
            alt={listing.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/75 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Title block on image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold-500 mb-1.5">
              <span>{listing.category}</span>
              <span>•</span>
              <span>{listing.destination}</span>
            </div>
            <h2 className="text-xl font-serif font-medium italic tracking-tight sm:text-2xl md:text-3xl max-w-3xl">
              {listing.title}
            </h2>
          </div>
        </div>

        {/* Content columns split */}
        <div className="flex flex-1 flex-col overflow-y-auto md:flex-row">
          
          {/* Left Column (Details) */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[55vh] md:max-h-[60vh]">
            {/* Tabs Selector */}
            <div className="flex border-b border-slate-200">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'itinerary', label: 'Detailed Itinerary' },
                { id: 'operator', label: 'Operator Details' },
                { id: 'gear', label: 'Gear List' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`border-b-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-brand-clay-500 text-brand-clay-500'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content renders */}
            <div className="mt-6">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Real-Time Government/MAC Advisory Bar */}
                  <div className={`rounded-xl border p-4 text-xs flex items-start space-x-3 shadow-xs ${advisory.color}`}>
                    <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold uppercase tracking-wide text-[10px]">
                        Official State bulletin: {advisory.level}
                      </h4>
                      <p className="mt-1 leading-relaxed font-medium">
                        {advisory.message}
                      </p>
                    </div>
                  </div>

                  {/* Stats Badges Row */}
                  <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4 border sm:grid-cols-4">
                    <div className="flex flex-col items-center text-center">
                      <Clock className="h-5 w-5 text-brand-clay-500 mb-1" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Duration</span>
                      <span className="text-xs font-bold text-slate-800">{listing.duration}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <MapPin className="h-5 w-5 text-brand-moss-500 mb-1" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Travel Distance</span>
                      <span className="text-xs font-bold text-slate-800 line-clamp-1">{listing.distance.split('from')[0]}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Info className="h-5 w-5 text-brand-gold-500 mb-1" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Best Time</span>
                      <span className="text-xs font-bold text-slate-800 line-clamp-1">{listing.bestTime.split('(')[0]}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Users className="h-5 w-5 text-brand-moss-600 mb-1" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Batch Size</span>
                      <span className="text-xs font-bold text-slate-800">{listing.maxGroupSize} Seekers</span>
                    </div>
                  </div>

                  {/* Description text */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Description</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {listing.description}
                    </p>
                  </div>

                  {/* Inclusions and Exclusions side-by-side */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-4">
                      <h4 className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
                        <Utensils className="h-4 w-4 text-emerald-600" />
                        <span>Inclusions</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {listing.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-emerald-500 font-black mt-0.5">✓</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-red-100 bg-red-50/20 p-4">
                      <h4 className="flex items-center space-x-1.5 text-xs font-bold text-red-800 uppercase tracking-wider mb-3">
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                        <span>Exclusions</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {listing.exclusions.map((exc, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-red-500 font-black mt-0.5">×</span>
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ITINERARY TAB */}
              {activeTab === 'itinerary' && (
                <div className="space-y-8 relative before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-[1px] before:bg-slate-200">
                  {listing.itinerary.map((day: ItineraryDay) => (
                    <div key={day.day} className="relative pl-8">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-moss-900 text-xs font-bold text-brand-gold-500 shadow ring-4 ring-white">
                        D{day.day}
                      </div>
                      
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Day {day.day}: {day.title}
                      </h4>
                      
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-200/60">
                        <ul className="space-y-3">
                          {day.activities.map((act, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-clay-500"></span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* OPERATOR TAB */}
              {activeTab === 'operator' && (
                <div className="space-y-6">
                  {/* Operator Header Card */}
                  <div className="flex items-start space-x-4 rounded-2xl bg-brand-moss-50/50 p-5 border border-brand-moss-100">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-moss-700 text-brand-gold-500 shadow font-bold text-lg">
                      {operator.companyName.substring(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-base font-extrabold text-brand-moss-900">
                          {operator.companyName}
                        </h4>
                        {operator.verified && (
                          <span className="flex items-center space-x-0.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800">
                            <BadgeCheck className="h-3 w-3" />
                            <span>VERIFIED</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Licensed Adventure Outfitter • Base: {operator.baseLocation}
                      </p>
                      
                      <div className="flex items-center space-x-1 mt-2">
                        <Star className="h-4 w-4 fill-brand-gold-500 text-brand-gold-500" />
                        <span className="text-xs font-black text-slate-800">{operator.rating}</span>
                        <span className="text-[10px] text-slate-400">({operator.reviewCount} customer reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Credentials / Details */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border p-4 bg-slate-50/50">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">On-ground Director</span>
                      <span className="text-sm font-bold text-slate-800">{operator.contactPerson}</span>
                    </div>
                    <div className="rounded-xl border p-4 bg-slate-50/50">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Field Experience</span>
                      <span className="text-sm font-bold text-slate-800">{operator.experience} conducting trips</span>
                    </div>
                    <div className="rounded-xl border p-4 bg-slate-50/50">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Maharashtra Govt License #</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{operator.licenseNumber}</span>
                    </div>
                    <div className="rounded-xl border p-4 bg-slate-50/50">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Contact Information</span>
                      <span className="text-xs font-bold text-slate-800 flex items-center mt-1">
                        <Phone className="h-3.5 w-3.5 text-brand-moss-500 mr-1 shrink-0" />
                        <span>{operator.phone}</span>
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-100 p-4 text-xs text-slate-500 flex items-start space-x-2.5">
                    <BadgeCheck className="h-5 w-5 text-brand-moss-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Safar Guarantee:</strong> Payments made on the MahaSafar platform are securely escrowed. Funds are released to operators only after the successful safe completion of your adventure.
                    </p>
                  </div>
                </div>
              )}

              {/* GEAR CHECKLIST TAB */}
              {activeTab === 'gear' && (
                <div className="space-y-5">
                  <div className="flex items-start space-x-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                    <Backpack className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 uppercase">Preparation is Key!</h4>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        The Sahyadris are highly rugged, and weather can shift rapidly (heavy monsoons or chilly winters). We advise checking off every item in this operator list to ensure a safe, comfortable trek.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border p-5">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Required Gear Checklist</h4>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {listing.gearRequired.map((gear, i) => (
                        <div key={i} className="flex items-center space-x-2.5 rounded-lg border bg-slate-50 px-3 py-2.5">
                          <input 
                            type="checkbox" 
                            id={`gear-item-${i}`}
                            className="h-4.5 w-4.5 rounded border-slate-300 text-brand-moss-700 focus:ring-brand-moss-500 cursor-pointer" 
                          />
                          <label htmlFor={`gear-item-${i}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                            {gear}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column (Live Booking Pane) */}
          <div className="w-full border-t border-[#E5E1D8] bg-slate-50/50 p-6 md:w-80 md:border-t-0 md:border-l md:p-8">
            <h3 className="text-lg font-serif font-semibold text-[#1B2B20] italic">
              Reserve Your Spot
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select an upcoming weekend batch to secure your Adventure Pass.
            </p>

            <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
              {/* Date Select */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Choose Weekend Date
                </label>
                <div className="space-y-2">
                  {bookingDates.map((date) => {
                    const dateStr = date.toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    });
                    const dateVal = date.toISOString().split('T')[0];
                    const isSelected = selectedDate === dateVal;
                    return (
                      <button
                        type="button"
                        key={dateVal}
                        onClick={() => setSelectedDate(dateVal)}
                        className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-brand-clay-500 bg-brand-clay-50/40 text-brand-clay-700 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                          {dateStr}
                        </span>
                        {isSelected && <span className="text-brand-clay-500">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Participant Count */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Number of Trekkers
                </label>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2">
                  <button
                    type="button"
                    disabled={ticketCount <= 1}
                    onClick={() => setTicketCount(ticketCount - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 font-black text-slate-700 transition-all hover:bg-slate-200 disabled:opacity-50 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-slate-900">{ticketCount}</span>
                  <button
                    type="button"
                    disabled={ticketCount >= listing.availableSlots}
                    onClick={() => setTicketCount(ticketCount + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 font-black text-slate-700 transition-all hover:bg-slate-200 disabled:opacity-50 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Price per ticket:</span>
                  <span>₹{listing.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Booking Taxes:</span>
                  <span className="text-emerald-600 font-semibold">₹0 (Govt Subsidized)</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/80 pt-2 text-sm">
                  <span className="font-extrabold text-slate-900">Total Price:</span>
                  <span className="font-black text-brand-moss-900">
                    ₹{(listing.price * ticketCount).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit trigger */}
              <button
                id="initiate-booking-submit-btn"
                type="submit"
                className="w-full mt-4 flex items-center justify-center space-x-2 rounded-xl bg-brand-clay-500 py-3 text-sm font-extrabold text-white shadow-md shadow-brand-clay-500/15 transition-transform hover:scale-102 active:scale-98 hover:bg-brand-clay-600 cursor-pointer"
              >
                <span>Proceed to Book</span>
                <ChevronRight className="h-4.5 w-4.5" />
              </button>

              {/* Safety notice in booking column */}
              <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
                By purchasing, you agree to follow the safety instructions and carry required gear checklists. Safar pass will be issued immediately.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
