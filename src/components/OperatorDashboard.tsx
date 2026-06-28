import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, Plus, Compass, PlusCircle, CheckCircle, Clock, TrendingUp, Users, DollarSign, Award, AlertCircle, RefreshCw } from 'lucide-react';
import { Listing, Booking, Operator, ActivityCategory } from '../types';

interface OperatorDashboardProps {
  onAddListing: (newListing: any) => Promise<void>;
  listings: Listing[];
  bookings: Booking[];
}

export default function OperatorDashboard({
  onAddListing,
  listings,
  bookings,
}: OperatorDashboardProps) {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // Form states for Operator Registration
  const [companyName, setCompanyName] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [baseLocation, setBaseLocation] = useState<string>('');
  const [experience, setExperience] = useState<string>('5+ Years');
  const [licenseNumber, setLicenseNumber] = useState<string>('');

  // Form states for creating a new listing
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<ActivityCategory>('trekking');
  const [destination, setDestination] = useState<string>('');
  const [duration, setDuration] = useState<string>('1 Day');
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'challenging' | 'expert'>('moderate');
  const [price, setPrice] = useState<number>(1200);
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [maxGroupSize, setMaxGroupSize] = useState<number>(20);
  const [distance, setDistance] = useState<string>('100 km from Mumbai');
  const [bestTime, setBestTime] = useState<string>('Monsoons (July - Sept)');

  // Load operator profile from server
  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const res = await fetch('/api/operators');
      const data = await res.json();
      if (data && data.length > 0) {
        // Just take the first operator as the logged-in demo operator for simple UX
        setOperator(data[0]);
      }
    } catch (e) {
      console.error('Error fetching operator profiles:', e);
    }
  };

  const handleRegisterOperator = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    const profileData: Operator = {
      id: operator?.id || 'op-sahyadri-rangers', // Link with seed or generate
      companyName,
      contactPerson,
      phone,
      email,
      baseLocation,
      experience,
      licenseNumber: licenseNumber || `MHT-OPS-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewCount: 1,
      verified: true
    };

    try {
      const res = await fetch('/api/operators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      const savedProfile = await res.json();
      setOperator(savedProfile);
    } catch (err) {
      alert('Error updating profile details.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCreateListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !destination || !description) {
      alert('Please complete all adventure listing fields.');
      return;
    }

    // Default high quality image based on category if empty
    const finalImage = image || (
      category === 'trekking' ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' :
      category === 'camping' ? 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80' :
      category === 'water_sports' ? 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80' :
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80'
    );

    // Build some structured sample itineraries/inclusions/exclusions/gear based on inputs to make it rich
    const mockItinerary = [
      {
        day: 1,
        title: 'Arrival, Safety Briefing & Activity Run',
        activities: [
          '08:00 AM: Arrival at the regional base and check-in.',
          '08:30 AM: Fresh hot traditional Maharashtrian breakfast.',
          '09:15 AM: Multi-sport safety briefing from expert guide lead.',
          '10:00 AM: Start of primary adventure run / ascent.',
          '02:00 PM: Delicious fresh local woodland lunch.',
          '05:00 PM: Return to camp/base for high tea and dispersal.'
        ]
      }
    ];

    const mockInclusions = ['Certified adventure gear & helmets', 'Morning fresh breakfast & local buffet lunch', 'Qualified first aid certified sweep guides', 'Forest entry clearance permissions'];
    const mockExclusions = ['Personal transportation to base coordinates', 'GoPro action recordings', 'Personal trekking gear & backpacks'];
    const mockGear = ['Proper sturdy rubber grip shoes', '2 Litres of drinking water', 'Personal medication and hand sanitizer', 'Warm extra jackets'];

    const newAdventure = {
      title,
      category,
      destination,
      duration,
      difficulty,
      price: Number(price),
      image: finalImage,
      description,
      itinerary: mockItinerary,
      inclusions: mockInclusions,
      exclusions: mockExclusions,
      gearRequired: mockGear,
      bestTime,
      distance,
      operatorId: operator?.id || 'op-sahyadri-rangers',
      maxGroupSize: Number(maxGroupSize)
    };

    try {
      await onAddListing(newAdventure);
      setShowAddForm(false);
      // Reset fields
      setTitle('');
      setDestination('');
      setPrice(1200);
      setImage('');
      setDescription('');
    } catch (err: any) {
      alert(err.message || 'Error publishing your listing.');
    }
  };

  // Prepopulate form if operator exists
  useEffect(() => {
    if (operator) {
      setCompanyName(operator.companyName);
      setContactPerson(operator.contactPerson);
      setPhone(operator.phone);
      setEmail(operator.email);
      setBaseLocation(operator.baseLocation);
      setExperience(operator.experience);
      setLicenseNumber(operator.licenseNumber);
    }
  }, [operator]);

  // Compute metrics specifically for this operator
  const myListings = listings.filter((l) => l.operatorId === (operator?.id || 'op-sahyadri-rangers'));
  const myBookings = bookings.filter((b) => b.operatorId === (operator?.id || 'op-sahyadri-rangers'));
  const totalRevenue = myBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalHikers = myBookings.reduce((sum, b) => sum + b.participantsCount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Operator Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b pb-6">
        <div>
          <div className="flex items-center space-x-1.5 text-brand-clay-500 font-semibold text-sm tracking-wider uppercase">
            <Briefcase className="h-4 w-4" />
            <span>Operator Administration Area</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl mt-1">
            {operator ? operator.companyName : 'Local Operator Dashboard'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Publish your expert-guided itineraries, monitor guest booking escrow funds, and verify your licenses.
          </p>
        </div>

        {/* If registered, show Add Listing and quick verification info */}
        {operator && (
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              id="op-toggle-add-form-btn"
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-1.5 rounded-xl bg-brand-moss-800 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-moss-700 transition-all cursor-pointer"
            >
              <PlusCircle className="h-4 w-4 text-brand-gold-500" />
              <span>{showAddForm ? 'View My Metrics' : 'Create New Adventure'}</span>
            </button>
          </div>
        )}
      </div>

      {/* RENDER PROFILE REGISTRATION IF NOT CONFIGURED */}
      {!operator && (
        <div className="max-w-xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="text-center space-y-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-clay-50 text-brand-clay-500 mx-auto">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Become a Certified MahaSafar Operator</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              List your treks, camping setups, or river rafting batches. Your details are secured and escrow is guaranteed.
            </p>
          </div>

          <form onSubmit={handleRegisterOperator} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Company/Club Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Sahyadri Trekkers Club"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lead Contact Person</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Pradeep Shinde"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 91122 33445"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@club.com"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Base Location</label>
                <input
                  type="text"
                  required
                  value={baseLocation}
                  onChange={(e) => setBaseLocation(e.target.value)}
                  placeholder="Mumbai, Maharashtra"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Govt Adventure License #</label>
                <input
                  type="text"
                  required
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="MHT-OPS-2026-X11"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                />
              </div>
            </div>

            <button
              id="register-operator-submit-btn"
              type="submit"
              disabled={isRegistering}
              className="w-full rounded-xl bg-brand-clay-500 py-3 text-xs font-bold text-white transition-all hover:bg-brand-clay-600 disabled:opacity-50 mt-4 cursor-pointer"
            >
              {isRegistering ? 'Registering...' : 'Complete Registration & Open Dashboard'}
            </button>
          </form>
        </div>
      )}

      {/* CORE OPERATOR DASHBOARD VIEW */}
      {operator && !showAddForm && (
        <div className="space-y-10">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border bg-white p-5 shadow-xs flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Escrow Revenue</span>
                <span className="text-xl font-extrabold text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-xs flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-clay-50 text-brand-clay-500">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Total Bookings</span>
                <span className="text-xl font-extrabold text-slate-900">{myBookings.length} Bookings</span>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-xs flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Active Trekkers</span>
                <span className="text-xl font-extrabold text-slate-900">{totalHikers} Travelers</span>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-xs flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-moss-50 text-brand-moss-700">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Listed Adventures</span>
                <span className="text-xl font-extrabold text-slate-900">{myListings.length} Listings</span>
              </div>
            </div>
          </div>

          {/* Bookings Table log */}
          <div className="rounded-2xl border bg-white shadow-xs overflow-hidden">
            <div className="border-b bg-slate-50/50 p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Booked Guest Roster</h3>
                <p className="text-xs text-slate-400 mt-0.5">Live roster of trekkers registered under your club.</p>
              </div>
            </div>

            {myBookings.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                <AlertCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                No reservations have been placed yet for your adventure listings.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold uppercase border-b border-slate-100">
                      <th className="p-4">Pass ID</th>
                      <th className="p-4">Adventure Trek Name</th>
                      <th className="p-4">Trek Date</th>
                      <th className="p-4">Lead Traveler</th>
                      <th className="p-4 text-center">Batch Size</th>
                      <th className="p-4 text-right">Escrow Sum</th>
                      <th className="p-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myBookings.map((b) => (
                      <tr key={b.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/30">
                        <td className="p-4 font-mono font-bold text-slate-800">{b.id}</td>
                        <td className="p-4 font-bold text-slate-900 max-w-xs truncate">{b.listingTitle}</td>
                        <td className="p-4 text-slate-600 font-medium">{b.bookingDate}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-800">{b.customerName}</div>
                          <div className="text-[10px] text-slate-400">{b.customerPhone}</div>
                        </td>
                        <td className="p-4 text-center font-bold text-slate-700">{b.participantsCount}</td>
                        <td className="p-4 text-right font-black text-slate-950">₹{b.totalPrice.toLocaleString('en-IN')}</td>
                        <td className="p-4 text-center">
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800 uppercase">
                            CONFIRMED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Operator Profile settings info */}
          <div className="rounded-2xl border p-5 bg-slate-50/50">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center">
              <Award className="h-4.5 w-4.5 mr-1 text-brand-moss-600" />
              Manage Operator Profile Settings
            </h4>
            <form onSubmit={handleRegisterOperator} className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-end text-xs">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Company Name</label>
                <input 
                  type="text" 
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-lg border bg-white px-2.5 py-1.5 outline-none" 
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Contact Phone</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border bg-white px-2.5 py-1.5 outline-none" 
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">License Number</label>
                <input 
                  type="text" 
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full rounded-lg border bg-white px-2.5 py-1.5 font-mono outline-none" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full rounded-lg bg-brand-moss-800 py-2 font-bold text-white hover:bg-brand-moss-700 transition-all cursor-pointer"
              >
                Save Details
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW ADVENTURE LISTING FORM */}
      {operator && showAddForm && (
        <div className="max-w-2xl mx-auto rounded-3xl border bg-white p-6 md:p-8 shadow-xs">
          <h3 className="text-base font-extrabold text-slate-950 mb-1 flex items-center">
            <PlusCircle className="h-5 w-5 text-brand-moss-700 mr-1.5" />
            Publish a New Guided Experience
          </h3>
          <p className="text-xs text-slate-400 mb-6">Create highly detailed itineraries with standard pricing. Instantly publish to the seeker directory.</p>

          <form onSubmit={handleCreateListingSubmit} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Adventure Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Kalsubai Peak Overnight Night Trek with Hot Sunrise Tea"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Category style</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-lg border px-3 py-2 bg-white outline-none focus:border-brand-moss-500"
                >
                  <option value="trekking">Trekking</option>
                  <option value="camping">Camping</option>
                  <option value="water_sports">Water Sports</option>
                  <option value="paragliding">Paragliding</option>
                  <option value="wildlife">Wildlife Safari</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Target Regional Destination</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Bhandardara, Kolad"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Adventure Duration</label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 1 Day, 2 Days / 1 Night"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Trek/Trip Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full rounded-lg border px-3 py-2 bg-white outline-none focus:border-brand-moss-500"
                >
                  <option value="easy">Easy (First-timers)</option>
                  <option value="moderate">Moderate (Normal physical fitness)</option>
                  <option value="challenging">Challenging (Experienced trekkers)</option>
                  <option value="expert">Expert (Extremely rugged navigation)</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Price per person (INR)</label>
                <input
                  type="number"
                  required
                  min={100}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Max Batch Group Size</label>
                <input
                  type="number"
                  required
                  min={5}
                  value={maxGroupSize}
                  onChange={(e) => setMaxGroupSize(Number(e.target.value))}
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Travel Distance from Mumbai/Pune</label>
                <input
                  type="text"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="e.g. 110 km from Pune"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Best Season To Run</label>
                <input
                  type="text"
                  value={bestTime}
                  onChange={(e) => setBestTime(e.target.value)}
                  placeholder="e.g. June to October"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Cover Image URL (Unsplash/etc)</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Detailed Description</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Highlight key sights, temple ruins, historical relevance, and meals provided."
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:border-brand-moss-500 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg border px-4 py-2 hover:bg-slate-50 font-bold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="create-listing-submit-btn"
                type="submit"
                className="rounded-lg bg-brand-clay-500 px-6 py-2 font-bold text-white hover:bg-brand-clay-600 transition-all cursor-pointer"
              >
                Publish Listing
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
