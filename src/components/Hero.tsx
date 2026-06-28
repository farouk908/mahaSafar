import React from 'react';
import { Tent, Compass, Waves, Flame, Award, ShieldCheck, Footprints, Trees } from 'lucide-react';
import { ActivityCategory } from '../types';

interface HeroProps {
  selectedCategory: ActivityCategory | null;
  setSelectedCategory: (cat: ActivityCategory | null) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (diff: string | null) => void;
  onQuickSearch: (query: string) => void;
}

export default function Hero({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  onQuickSearch,
}: HeroProps) {
  const categories: { id: ActivityCategory; label: string; icon: React.ReactNode; desc: string }[] = [
    { 
      id: 'trekking', 
      label: 'Trekking', 
      icon: <Footprints className="h-5 w-5" />, 
      desc: 'Climb ancient forts & peak trails' 
    },
    { 
      id: 'camping', 
      label: 'Camping', 
      icon: <Tent className="h-5 w-5" />, 
      desc: 'Sleep under stars by serene lakes' 
    },
    { 
      id: 'water_sports', 
      label: 'Water Sports', 
      icon: <Waves className="h-5 w-5" />, 
      desc: 'White-water rafting & kayaking' 
    },
    { 
      id: 'paragliding', 
      label: 'Paragliding', 
      icon: <Flame className="h-5 w-5" />, 
      desc: 'Soar high above deep green valleys' 
    },
    { 
      id: 'wildlife', 
      label: 'Wildlife', 
      icon: <Trees className="h-5 w-5" />, 
      desc: 'Spot leopards & endemic avifauna' 
    }
  ];

  const difficulties = ['easy', 'moderate', 'challenging', 'expert'];

  return (
    <div className="relative bg-brand-moss-900 py-16 text-white overflow-hidden">
      {/* Decorative backdrop patterns */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute -top-48 -right-48 h-96 w-96 rounded-full bg-brand-gold-500 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-clay-500 blur-3xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subheading Badge */}
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-brand-moss-800/80 px-3.5 py-1 text-xs font-semibold text-brand-gold-500 backdrop-blur-md ring-1 ring-white/10">
            <Compass className="h-3.5 w-3.5 animate-spin-slow" />
            <span>THE SAHYADRI ADVENTURE GATEWAY</span>
          </div>
          
          {/* Main heading */}
          <h1 className="mt-4 text-4xl font-serif font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Conquer the Rugged <span className="font-serif italic text-[#DAD7CD]">Sahyadris</span>. <br />
            Paddle the Gushing Rivers.
          </h1>
          
          <p className="mt-4 text-lg text-[#DAD7CD] font-sans opacity-95">
            Centralized marketplace connecting adventure seekers with Maharashtra’s most trusted, verified local operators. Experience zero-friction bookings, certified safety audits, and absolute outdoor thrills.
          </p>

          {/* Quick search shortcuts */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="self-center font-medium text-slate-400">Popular:</span>
            {['Kalsubai Sunrise', 'Kolad Rafting', 'Bhandardara Lake', 'Kokankada Cliff'].map((term) => (
              <button
                key={term}
                onClick={() => onQuickSearch(term)}
                className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 transition-all cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid Selector */}
        <div className="mt-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl font-serif font-medium tracking-wide text-[#DAD7CD] italic">
              Choose your activity style
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-medium text-slate-400 hover:text-white transition-all underline cursor-pointer"
              >
                Clear Category Filter
              </button>
            )}
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                  className={`group flex flex-col items-start rounded-2xl p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-clay-500 text-white shadow-lg shadow-brand-clay-500/20'
                      : 'bg-brand-moss-800/40 hover:bg-brand-moss-800/80 hover:scale-102 border border-white/5'
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-brand-moss-700/50 text-brand-gold-500 group-hover:bg-brand-moss-700 group-hover:text-white'
                  }`}>
                    {cat.icon}
                  </div>
                  <h3 className="mt-4 font-bold text-sm tracking-tight">{cat.label}</h3>
                  <p className={`mt-1 text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-white/80' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    {cat.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Filters (Difficulty) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-brand-moss-850/50 p-4 border border-white/5">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Difficulty Level:</span>
            <div className="flex flex-wrap gap-1.5">
              {difficulties.map((diff) => {
                const isSelected = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(isSelected ? null : diff)}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize tracking-wide transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-gold-500 text-brand-moss-900 font-bold'
                        : 'bg-brand-moss-800 text-slate-300 hover:bg-brand-moss-750'
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick trust metrics */}
          <div className="hidden items-center space-x-6 text-xs text-slate-400 lg:flex">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-brand-gold-500" />
              <span>Certified Safety Audits</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Award className="h-4.5 w-4.5 text-brand-gold-500" />
              <span>100% Verified Local Operators</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
