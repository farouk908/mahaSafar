import React from 'react';
import { Compass, Calendar, Briefcase, Menu, Search, User, Sparkles, MapPin, Shield, Info } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  bookingCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openAIAssistant: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  bookingCount,
  searchQuery,
  setSearchQuery,
  openAIAssistant,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E1D8] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('explore')} 
          className="flex cursor-pointer items-center space-x-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-moss-700 text-white shadow-md shadow-brand-moss-900/10">
            <Compass className="h-5.5 w-5.5 animate-spin-slow text-brand-gold-500" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-semibold italic tracking-tight text-brand-moss-700">
              Maha<span className="text-brand-clay-500 not-italic font-sans font-bold">Safar</span>
            </h1>
            <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              Adventure Marketplace
            </p>
          </div>
        </div>

        {/* Global Search Bar (Only shown on explore tab) */}
        {currentTab === 'explore' && (
          <div className="hidden max-w-md flex-1 px-8 md:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search Kalsubai, river rafting, camping, etc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-brand-moss-500 focus:bg-white focus:ring-2 focus:ring-brand-moss-100"
              />
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <nav className="flex items-center space-x-1 sm:space-x-3">
          
          {/* Explore Adventures Button */}
          <button
            id="nav-explore-btn"
            onClick={() => setCurrentTab('explore')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              currentTab === 'explore'
                ? 'bg-brand-moss-50 text-brand-moss-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Compass className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Explore</span>
          </button>

          {/* Bookings Button */}
          <button
            id="nav-bookings-btn"
            onClick={() => setCurrentTab('bookings')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              currentTab === 'bookings'
                ? 'bg-brand-moss-50 text-brand-moss-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Calendar className="h-4.5 w-4.5" />
              {bookingCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-clay-500 text-[9px] font-bold text-white ring-2 ring-white">
                  {bookingCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">My Passes</span>
          </button>

          {/* Safety Button */}
          <button
            id="nav-safety-btn"
            onClick={() => setCurrentTab('safety')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              currentTab === 'safety'
                ? 'bg-brand-moss-50 text-brand-moss-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Shield className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Safety Guides</span>
          </button>

          {/* About Button */}
          <button
            id="nav-about-btn"
            onClick={() => setCurrentTab('about')}
            className={`flex items-center space-x-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              currentTab === 'about'
                ? 'bg-brand-moss-50 text-brand-moss-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Info className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">About</span>
          </button>

          {/* AI Guide Quick Launch */}
          <button
            id="nav-ai-guide-btn"
            onClick={openAIAssistant}
            className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-brand-moss-700 to-brand-moss-600 px-3 py-2 text-sm font-medium text-white shadow-sm shadow-brand-moss-900/10 transition-transform hover:scale-102 active:scale-98"
          >
            <Sparkles className="h-4 w-4 text-brand-gold-500 animate-pulse" />
            <span className="hidden md:inline">Ask Saby AI</span>
            <span className="md:hidden">Saby</span>
          </button>

          <div className="h-5 w-[1px] bg-slate-200"></div>

          {/* Operator Mode Toggle */}
          <button
            id="nav-operator-btn"
            onClick={() => setCurrentTab('operator')}
            className={`flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
              currentTab === 'operator'
                ? 'border-brand-clay-500 bg-brand-clay-50/50 text-brand-clay-600'
                : 'border-[#E5E1D8] text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span className="hidden lg:inline">Operator Portal</span>
            <span className="lg:hidden">Partner</span>
          </button>

        </nav>
      </div>
    </header>
  );
}
