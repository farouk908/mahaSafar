import React from 'react';
import { MapPin, Compass, ArrowUpRight } from 'lucide-react';
import { SEEDED_DESTINATIONS } from '../data';
import { Destination } from '../types';

interface DestinationsGridProps {
  onSelectDestination: (destName: string | null) => void;
  selectedDestination: string | null;
}

export default function DestinationsGrid({
  onSelectDestination,
  selectedDestination,
}: DestinationsGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center space-x-1.5 text-brand-clay-500 font-semibold text-xs tracking-wider uppercase">
            <MapPin className="h-3.5 w-3.5" />
            <span>Regional Hotspots</span>
          </div>
          <h2 className="text-3xl font-serif font-medium tracking-tight text-[#1B2B20] sm:text-4xl mt-1 italic">
            Explore Maharashtra's Wilderness
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl">
            From the misty towering heights of Ahmednagar forts to the turbulent river channels of Raigad, discover the unique geographical wonders of Maharashtra.
          </p>
        </div>
        
        {selectedDestination && (
          <button
            onClick={() => onSelectDestination(null)}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-xs font-semibold text-brand-moss-600 bg-brand-moss-50 px-3 py-1.5 rounded-full hover:bg-brand-moss-100 transition-all cursor-pointer"
          >
            <span>Reset Region Filter</span>
            <span>×</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SEEDED_DESTINATIONS.map((dest: Destination) => {
          const isSelected = selectedDestination === dest.name;
          return (
            <div
              id={`destination-card-${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={dest.name}
              onClick={() => onSelectDestination(isSelected ? null : dest.name)}
              className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-brand-clay-500 ring-2 ring-brand-clay-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-lg'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                
                {/* Region Location Tag */}
                <div className="absolute top-3 left-3 flex items-center space-x-1 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
                  <MapPin className="h-3 w-3 text-brand-gold-500" />
                  <span>{dest.region}</span>
                </div>
                
                {/* Active Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-brand-clay-500 p-1 text-white shadow">
                    <Compass className="h-4 w-4 animate-spin-slow" />
                  </div>
                )}

                {/* Name Overlay */}
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-1">
                    <span>{dest.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 text-brand-gold-500" />
                  </h3>
                </div>
              </div>

              {/* Description Body */}
              <div className="p-4">
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {dest.description}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {dest.popularFor.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
