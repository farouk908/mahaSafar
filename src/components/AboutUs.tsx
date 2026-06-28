import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  HeartHandshake, 
  Award, 
  ShieldCheck, 
  Leaf, 
  Coins, 
  Check, 
  Users,
  Trees
} from 'lucide-react';

export default function AboutUs() {
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeSigned, setPledgeSigned] = useState(false);
  const [signedNames, setSignedNames] = useState<string[]>([
    'Farouk Ayomide',
    'Amol Shinde (Sahyadri Guides)',
    'Pooja Deshmukh (Lonavala Trails)',
    'Rahul Mehta'
  ]);

  const handleSignPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;
    setSignedNames(prev => [...prev, pledgeName]);
    setPledgeSigned(true);
  };

  return (
    <div id="about-us-root" className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-brand-moss-100 px-3 py-1 text-xs font-semibold text-brand-moss-800 border border-brand-moss-200">
            <Compass className="h-3.5 w-3.5 animate-spin-slow text-brand-moss-700" />
            <span>Since Monsoon 2024</span>
          </div>
          <h1 className="mt-4 text-3xl font-serif font-medium tracking-tight text-brand-moss-900 sm:text-5xl">
            Empowering Maharashtra’s <span className="italic font-serif">Rural Pioneers</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 leading-relaxed">
            MahaSafar was born out of a critical need: bridging the gap between passionate adventure seekers and remote village guides who possess generations of trail wisdom.
          </p>
        </div>

        {/* Big Editorial Feature Banner */}
        <div className="mb-16 grid grid-cols-1 overflow-hidden rounded-3xl border border-[#E5E1D8] bg-white shadow-sm md:grid-cols-2">
          <div className="relative h-64 md:h-full bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=1200" 
              alt="Malshej Ghat mountains" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-moss-900/60 to-transparent md:bg-gradient-to-r md:from-brand-moss-900/40" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="inline-flex items-center space-x-1 text-xs font-semibold text-brand-gold-500 uppercase tracking-widest">
                <MapPin className="h-3.5 w-3.5" />
                <span>The Western Ghats, India</span>
              </span>
              <h2 className="text-xl font-serif font-medium mt-1">Naneghat ancient mountain pass</h2>
            </div>
          </div>
          
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="text-xs font-bold text-brand-clay-500 uppercase tracking-widest">The Catalyst</span>
            <h3 className="mt-2 text-2xl font-serif font-semibold text-brand-moss-900">
              Conceived on the Peak of Kalsubai
            </h3>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              In June 2024, our founders undertook an overnight trek during the heavy monsoon downpours of Ahmednagar district. While reaching the summit, they discovered that high agency fees charged by commercial city tour operations rarely trickled down to the local cooks, porters, and emergency scouts residing in Bari village at the mountain base.
            </p>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              MahaSafar was created to decentralize adventure commerce. By putting robust scheduling, checkout tools, and audited safety frameworks in the hands of native experts, we enable transparent tourism that builds local economies while safeguarding hikers with double-certified operations.
            </p>

            <div className="mt-6 flex items-center space-x-6 border-t border-slate-100 pt-6">
              <div>
                <span className="block text-2xl font-serif font-bold text-brand-moss-700">92%</span>
                <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Direct Payouts to Villagers</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-200" />
              <div>
                <span className="block text-2xl font-serif font-bold text-brand-moss-700">10k+</span>
                <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Safe Summit Climbs</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Core Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-xl font-serif font-semibold text-brand-moss-900">Our Operational Pillars</h3>
            <p className="text-xs text-slate-400 mt-1">Building digital interfaces for rugged environments</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-moss-50 text-brand-moss-700">
                <Coins className="h-5.5 w-5.5" />
              </div>
              <h4 className="mt-4 font-serif text-lg font-semibold text-[#1B2B20]">
                Fair Trade Adventure Commission
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Traditional tour portals swallow up to 40% in platform cuts. MahaSafar charges a flat, transparent 8% marketplace fee to support server hosting and emergency rescue insurance, ensuring native guides earn maximum revenue.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-moss-50 text-brand-moss-700">
                <ShieldCheck className="h-5.5 w-5.5" />
              </div>
              <h4 className="mt-4 font-serif text-lg font-semibold text-[#1B2B20]">
                The MahaSafar Safety Audit
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                No operator goes live without physical background verification and equipment status logging. From rope anchor reviews to Wilderness First Aid certification audits, we protect travelers proactively.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-moss-50 text-brand-moss-700">
                <Leaf className="h-5.5 w-5.5" />
              </div>
              <h4 className="mt-4 font-serif text-lg font-semibold text-[#1B2B20]">
                Zero-Plastic Leave No Trace
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Our base-camp coordinators sponsor trash collection walks. Each booked traveler pledges to leave zero non-biodegradable footprint on sacred mountain plateaus and sacred water bodies.
              </p>
            </div>
          </div>
        </div>

        {/* The Conservation Pledge Interactive Widget */}
        <div className="rounded-3xl border border-[#E5E1D8] bg-brand-moss-900 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
            <Trees className="h-96 w-96 text-brand-gold-500" />
          </div>

          <div className="max-w-2xl relative z-10">
            <div className="flex items-center space-x-2 text-brand-gold-500 text-xs font-semibold uppercase tracking-wider">
              <Leaf className="h-4 w-4" />
              <span>Sustain the Wilderness</span>
            </div>
            
            <h3 className="text-2xl font-serif font-medium mt-2 md:text-3xl">
              Take the MahaSafar Conservation Pledge
            </h3>
            
            <p className="text-xs text-brand-moss-100 mt-3 leading-relaxed opacity-90">
              The Sahyadri ranges are home to hundreds of rare species of flora and fauna, including the Indian Giant Squirrel and endemic monsoon orchids. By signing our pledge, you commit to trekking ethically: pack back all trash, respect water reservoirs, and honor local tribal customs.
            </p>

            {!pledgeSigned ? (
              <form onSubmit={handleSignPledge} className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter your full name to pledge..."
                  value={pledgeName}
                  onChange={(e) => setPledgeName(e.target.value)}
                  className="rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-xs text-white placeholder-brand-moss-100/60 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-brand-gold-500 flex-1"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-brand-clay-500 hover:bg-brand-clay-600 px-5 py-2.5 text-xs font-semibold text-white transition-all shadow-md active:scale-98"
                >
                  Sign Pledge
                </button>
              </form>
            ) : (
              <div className="mt-6 flex items-center space-x-3 rounded-lg bg-white/10 border border-emerald-500/30 p-4 text-xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-emerald-400">Thank you, {pledgeName}!</p>
                  <p className="text-slate-300 mt-0.5">Your conservation pledge has been stamped on our live ledger.</p>
                </div>
              </div>
            )}

            {/* List of pledge signees */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <span className="block text-[10px] text-brand-moss-100 uppercase tracking-widest font-semibold mb-3">
                Recently Signed Adventurers
              </span>
              <div className="flex flex-wrap gap-2">
                {signedNames.map((name, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center space-x-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-mono text-[#DAD7CD]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{name}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
