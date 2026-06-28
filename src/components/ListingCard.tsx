import React from 'react';
import { Compass, Clock, MapPin, Sparkles, Tag, Users } from 'lucide-react';
import { Listing, Operator } from '../types';
import { SEEDED_OPERATORS } from '../data';

interface ListingCardProps {
  listing: Listing;
  onViewDetails: (listing: Listing) => void;
  key?: string;
}

export default function ListingCard({ listing, onViewDetails }: ListingCardProps) {
  // Find operator details
  const operator = SEEDED_OPERATORS.find((op) => op.id === listing.operatorId) || {
    companyName: 'Verified Local Operator',
    rating: 4.8,
  };

  // Colored difficulty badge mappings
  const difficultyColors = {
    easy: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    moderate: 'bg-amber-50 text-amber-700 border-amber-100',
    challenging: 'bg-orange-50 text-orange-700 border-orange-100',
    expert: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  const categoryLabels = {
    trekking: 'Trekking',
    camping: 'Camping',
    water_sports: 'Water Sports',
    paragliding: 'Paragliding',
    wildlife: 'Wildlife',
  };

  return (
    <div
      id={`adventure-card-${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E1D8] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-moss-300 hover:shadow-md"
    >
      {/* Visual Header */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={listing.image}
          alt={listing.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-104"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Category & Difficulty Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-brand-moss-900/80 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md border border-white/10">
            {categoryLabels[listing.category]}
          </span>
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${difficultyColors[listing.difficulty]}`}>
            {listing.difficulty}
          </span>
        </div>

        {/* Available slots (Urgencies) */}
        {listing.availableSlots <= 15 && (
          <div className="absolute bottom-3 right-3 rounded bg-red-600 px-2 py-0.5 text-[10px] font-extrabold text-white tracking-wide animate-pulse">
            ONLY {listing.availableSlots} SLOTS LEFT!
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <span>{listing.destination}</span>
          <span>•</span>
          <span>{listing.distance.split(',')[0]}</span>
        </div>

        {/* Title */}
        <h3 className="mt-2 text-lg font-serif font-semibold text-[#1B2B20] line-clamp-2 min-h-12 leading-snug group-hover:text-brand-moss-700 transition-colors">
          {listing.title}
        </h3>

        {/* Stats strip */}
        <div className="mt-3 flex items-center justify-between border-y border-slate-100 py-2.5 text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5 text-brand-clay-500" />
            <span>{listing.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3.5 w-3.5 text-brand-moss-500" />
            <span>Max Group: {listing.maxGroupSize}</span>
          </div>
        </div>

        {/* Operator credit */}
        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Operator:</span>
          <span className="font-bold text-slate-700 truncate max-w-40">{operator.companyName}</span>
        </div>

        {/* Price & Booking Footer */}
        <div className="mt-5 flex items-end justify-between pt-1">
          <div>
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Price per person
            </span>
            <div className="flex items-baseline">
              <span className="text-lg font-black text-brand-moss-900">
                ₹{listing.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] font-bold text-slate-500 ml-0.5">/ person</span>
            </div>
          </div>

          <button
            id={`view-details-${listing.id}`}
            onClick={() => onViewDetails(listing)}
            className="flex items-center space-x-1 rounded-xl bg-brand-moss-800 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-brand-moss-900/10 transition-all hover:bg-brand-moss-700 hover:scale-102 active:scale-98 cursor-pointer"
          >
            <span>Explore Details</span>
            <Compass className="h-3.5 w-3.5 text-brand-gold-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
