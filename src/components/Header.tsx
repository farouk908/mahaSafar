import React, { useState } from 'react';
import { Compass, Calendar, Briefcase, Menu, Search, User, Sparkles, MapPin, Shield, Info, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E1D8] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            setCurrentTab('explore');
            setIsMobileMenuOpen(false);
          }} 
          className="flex cursor-pointer items-center space-x-2.5 transition-opacity hover:opacity-90 animate-fade-in"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-moss-700 text-white shadow-md shadow-brand-moss-900/10">
            <Compass className="h-5.5 w-5.5 animate-spin-slow text-brand-gold-500" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-semibold italic tracking-tight text-brand-moss-700 leading-none">
              Maha<span className="text-brand-clay-500 not-italic font-sans font-bold">Safar</span>
            </h1>
            <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
              Adventure Marketplace
            </p>
          </div>
        </div>

        {/* Global Search Bar (Only shown on explore tab - Hidden on mobile, handled in mobile drawer or inline) */}
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

        {/* Desktop Navigation Actions */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-3">
          
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
            <span>Ask Saby AI</span>
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

        {/* Mobile Hamburger Navigation Button */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Mobile booking count shortcut */}
          {bookingCount > 0 && currentTab !== 'bookings' && (
            <button
              onClick={() => setCurrentTab('bookings')}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-moss-50 text-brand-moss-700"
            >
              <Calendar className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-clay-500 text-[8px] font-bold text-white ring-2 ring-brand-moss-50">
                {bookingCount}
              </span>
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none transition-all active:scale-95 shadow-sm"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 text-slate-900" /> : <Menu className="h-5 w-5 text-slate-700" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-slate-900/60 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="absolute top-0 inset-x-0 bg-white border-b border-[#E5E1D8] p-5 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="space-y-3.5">
              
              {/* Mobile Search Input */}
              {currentTab === 'explore' && (
                <div className="relative mb-4">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search expeditions or places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9.5 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-brand-moss-500 focus:bg-white"
                  />
                </div>
              )}

              {/* Navigation Links */}
              <button
                onClick={() => {
                  setCurrentTab('explore');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  currentTab === 'explore'
                    ? 'bg-brand-moss-50 text-brand-moss-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Compass className="h-5 w-5 text-brand-moss-600" />
                <span>Explore Adventures</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('bookings');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  currentTab === 'bookings'
                    ? 'bg-brand-moss-50 text-brand-moss-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Calendar className="h-5 w-5 text-brand-clay-500" />
                <span className="flex-1 text-left">My passes & Tickets</span>
                {bookingCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-clay-500 text-[10px] font-bold text-white">
                    {bookingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setCurrentTab('safety');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  currentTab === 'safety'
                    ? 'bg-brand-moss-50 text-brand-moss-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Shield className="h-5 w-5 text-emerald-600" />
                <span>Safety Guidelines</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  currentTab === 'about'
                    ? 'bg-brand-moss-50 text-brand-moss-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Info className="h-5 w-5 text-blue-600" />
                <span>About MahaSafar</span>
              </button>

              <button
                onClick={() => {
                  openAIAssistant();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-brand-moss-800 to-brand-moss-600 px-4 py-3.5 text-sm font-extrabold text-white shadow-md active:scale-98 transition-all"
              >
                <Sparkles className="h-4.5 w-4.5 text-brand-gold-500 animate-pulse" />
                <span>Ask Saby AI Guide</span>
              </button>

              <div className="border-t border-slate-100 my-2 pt-2"></div>

              <button
                onClick={() => {
                  setCurrentTab('operator');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all border ${
                  currentTab === 'operator'
                    ? 'bg-brand-clay-50 text-brand-clay-700 border-brand-clay-300'
                    : 'text-slate-700 border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <Briefcase className="h-5 w-5 text-brand-clay-500" />
                <span>Operator Portal (Publish Trip)</span>
              </button>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
