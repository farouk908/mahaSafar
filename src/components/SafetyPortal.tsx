import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  PhoneCall, 
  MapPin, 
  CloudRain, 
  Compass, 
  Activity, 
  AlertTriangle, 
  FileCheck, 
  Heart, 
  Search,
  BookOpen
} from 'lucide-react';

interface WeatherAdvisory {
  district: string;
  status: 'Normal' | 'Advisory' | 'Alert';
  color: string;
  rainLevel: string;
  windSpeed: string;
  landslideRisk: 'Low' | 'Medium' | 'High' | 'Severe';
  recommendations: string[];
}

const ADVISORIES: WeatherAdvisory[] = [
  {
    district: 'Pune District (Lonavala, Bhimashankar, Rajmachi)',
    status: 'Advisory',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
    rainLevel: 'Moderate (20-40mm/day)',
    windSpeed: '25 km/h',
    landslideRisk: 'Medium',
    recommendations: [
      'Avoid camping on open ridges or near valley drop-offs.',
      'Always keep safe distance from gushing waterfalls and stream crossings.',
      'Carry high-traction footwear for slippery red basalt rock.'
    ]
  },
  {
    district: 'Raigad District (Devkund, Kolad, Sudhagad)',
    status: 'Alert',
    color: 'bg-red-50 text-red-800 border-red-200',
    rainLevel: 'Heavy Rain (110-150mm/day)',
    windSpeed: '45 km/h',
    landslideRisk: 'Severe',
    recommendations: [
      'All valley river rafting activities in Kolad are strictly regulated via Dam release times.',
      'Devkund waterfall trail is CLOSED for tourist treks due to high water-levels and flash floods.',
      'Check in directly with your registered on-ground operator before leaving home.'
    ]
  },
  {
    district: 'Nashik & Ahmednagar (Kalsubai, Harishchandragad, Bhandardara)',
    status: 'Normal',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    rainLevel: 'Light Drizzle (5-10mm/day)',
    windSpeed: '12 km/h',
    landslideRisk: 'Low',
    recommendations: [
      'Ideal conditions for night camping and sunrise summit climbs.',
      'Keep warm layers as night temperatures on Harishchandragad plateau can drop significantly.',
      'Ensure headlamps or flashlights are charged for overnight treks.'
    ]
  },
  {
    district: 'Satara District (Kaas Plateau, Vasota, Mahabaleshwar)',
    status: 'Normal',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    rainLevel: 'Light to Moderate Mist (10-25mm/day)',
    windSpeed: '18 km/h',
    landslideRisk: 'Low',
    recommendations: [
      'Vasota Forest Trek is open; valid permit from Koyna Wildlife Sanctuary required.',
      'High visibility mist on the mountain passes; proceed with experienced local trail scouts only.'
    ]
  }
];

const EMERGENCY_CONTACTS = [
  { name: 'Shivdurga Rescue Team (Lonavala)', phone: '+91 98223 93081', coverage: 'Sahyadri-wide cliff rescue, rappelling & missing trekkers' },
  { name: 'Maharashtra Mountaineering Rescue Coordination', phone: '+91 22 2202 7990', coverage: 'All State Mountain Districts' },
  { name: 'Kolad River Rafting Safety Cell', phone: '+91 2194 256102', coverage: 'Kundalika River water emergency team' },
  { name: 'Saby AI SOS Coordinator', phone: 'Direct Chat In-App', coverage: 'Automated distress checklist generator' },
  { name: 'Pune District Disaster Management Cell', phone: '+91 20 2550 1260', coverage: 'Pune, Lonavala, Mulshi coordination' },
  { name: 'Thane District Emergency Command Center', phone: '+91 22 2530 1001', coverage: 'Thane, Malshej, Naneghat coordination' }
];

const GENERAL_GUIDELINES = [
  {
    title: 'DoT Maharashtra Registration',
    description: 'All operators are strictly required to be registered under the Directorate of Tourism (DoT), Govt of Maharashtra (GR Temp-2021/C.R.76). No unlicensed listings are permitted on MahaSafar.',
    icon: Compass
  },
  {
    title: 'Maha Adventure Council Compliance',
    description: 'We require compliance with MAC standards: dual-anchor point rappels, CE/UIAA certified safety helmets, static-rated climbing ropes, and daily local weather briefings.',
    icon: AlertTriangle
  },
  {
    title: 'Certified NIM/HMI Instructors',
    description: 'Every high-risk excursion is lead by guides certified by premium mountaineering academies like Nehru Institute of Mountaineering (NIM) or Himalayan Mountaineering Institute (HMI).',
    icon: FileCheck
  },
  {
    title: 'State Policy Accidental Insurance',
    description: 'Every booking pass automatically includes a ₹5 Lakhs personal accident insurance coverage scheme, compliant with the Maharashtra State Adventure Tourism department policy.',
    icon: Activity
  }
];

export default function SafetyPortal() {
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Ankle-supporting hiking shoes with deep rubber lugs (no flat running sneakers)', category: 'Gear', completed: false },
    { id: 2, label: 'High-capacity power bank + headlamp/torch with extra batteries', category: 'Electrical', completed: false },
    { id: 3, label: '3 Litres of clean water capacity (reusable bottles or hydration pack)', category: 'Hydration', completed: false },
    { id: 4, label: 'Personal medication, ORS packets, and basic waterproof first aid kit', category: 'Medical', completed: false },
    { id: 5, label: 'A heavy-duty waterproof dry bag or rain cover for electronics', category: 'Rain Protection', completed: false },
    { id: 6, label: 'Physical printed copy of the MahaSafar QR Pass & Emergency Roster', category: 'Documentation', completed: false }
  ]);
  const [searchContact, setSearchContact] = useState('');

  const completedCount = checklist.filter(item => item.completed).length;
  const totalCount = checklist.length;
  const preparednessScore = Math.round((completedCount / totalCount) * 100);

  const toggleChecklist = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const filteredContacts = EMERGENCY_CONTACTS.filter(c => 
    c.name.toLowerCase().includes(searchContact.toLowerCase()) || 
    c.coverage.toLowerCase().includes(searchContact.toLowerCase())
  );

  return (
    <div id="safety-portal-root" className="min-h-screen bg-[#FDFBF7] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-brand-clay-50 px-3 py-1 text-xs font-semibold text-brand-clay-600 border border-brand-clay-100">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>MahaSafar Audited Safety Protocols</span>
          </div>
          <h1 className="mt-3 text-3xl font-serif font-medium tracking-tight text-brand-moss-900 sm:text-4.5xl">
            Outdoor <span className="italic font-serif">Preparedness</span> & Mountain Guidelines
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
            The Sahyadris are as rugged as they are beautiful. Access real-time monsoon advisories, audit our local safety protocols, and calculate your trek-readiness.
          </p>
        </div>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left Columns - Interactive Advisors */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Weather & Monsoon Advisory Simulator */}
            <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4 mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-moss-50 text-brand-moss-700">
                    <CloudRain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-[#1B2B20]">
                      Real-Time District Bulletins
                    </h3>
                    <p className="text-xs text-slate-400">Select regional hotspots to view live weather warnings</p>
                  </div>
                </div>
                <span className="animate-pulse rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 tracking-wide uppercase">
                  Live Feed
                </span>
              </div>

              {/* District Select Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-6 sm:flex sm:flex-wrap">
                {ADVISORIES.map((adv, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDistrict(idx)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all text-left sm:text-center ${
                      selectedDistrict === idx 
                        ? 'bg-brand-moss-700 text-white shadow-sm' 
                        : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    {adv.district.split(' ')[0]} Region
                  </button>
                ))}
              </div>

              {/* District Advisory Card details */}
              <div className={`rounded-xl border p-5 ${ADVISORIES[selectedDistrict].color}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide uppercase">
                      {ADVISORIES[selectedDistrict].district}
                    </h4>
                    <p className="text-xs font-medium opacity-90 mt-1">
                      Status: <span className="font-bold underline">{ADVISORIES[selectedDistrict].status}</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-white/50 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                    Landslide Risk: {ADVISORIES[selectedDistrict].landslideRisk}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 border-y border-black/5 py-3 text-xs">
                  <div>
                    <span className="block text-black/40 uppercase font-semibold text-[9px]">Precipitation Rate</span>
                    <span className="font-medium">{ADVISORIES[selectedDistrict].rainLevel}</span>
                  </div>
                  <div>
                    <span className="block text-black/40 uppercase font-semibold text-[9px]">Ghat Wind Speeds</span>
                    <span className="font-medium">{ADVISORIES[selectedDistrict].windSpeed}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="block text-xs font-bold uppercase tracking-wider mb-2">Safety Action Plan:</span>
                  <ul className="space-y-1.5 text-xs list-disc list-inside">
                    {ADVISORIES[selectedDistrict].recommendations.map((rec, i) => (
                      <li key={i} className="leading-relaxed opacity-90">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* General Guidelines & Standards */}
            <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-serif font-semibold text-[#1B2B20] mb-1">
                The MahaSafar Four Pillar Quality Standard
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Our operations team conducts physical gear audits at operator base camps before any trip is allowed to go live.
              </p>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {GENERAL_GUIDELINES.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex space-x-3.5 p-4 rounded-xl border border-slate-100 hover:border-[#E5E1D8] bg-[#FDFBF7]/30 transition-all">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-moss-50 text-brand-moss-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-brand-moss-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column - Interactive Checklist & Quick Contacts */}
          <div className="space-y-8">
            
            {/* Trail Preparedness Checklist Widget */}
            <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-serif font-semibold text-[#1B2B20] mb-1">
                Trek-Readiness Calculator
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Check off standard equipment lists to calculate your wilderness preparedness ratio.
              </p>

              {/* Progress Bar */}
              <div className="mb-5 rounded-xl bg-[#FDFBF7] p-3 border border-[#E5E1D8]/60">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-600">Your Trail Safety Score</span>
                  <span className={`font-bold ${preparednessScore >= 80 ? 'text-emerald-600' : preparednessScore >= 50 ? 'text-amber-600' : 'text-brand-clay-500'}`}>
                    {preparednessScore}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      preparednessScore >= 80 
                        ? 'bg-emerald-500' 
                        : preparednessScore >= 50 
                          ? 'bg-amber-400' 
                          : 'bg-brand-clay-500'
                    }`}
                    style={{ width: `${preparednessScore}%` }}
                  />
                </div>
                <span className="block text-[10px] text-slate-400 mt-1.5 leading-snug">
                  {preparednessScore === 100 
                    ? '★ Elite Wilderness Ready: Fully equipped for rugged Sahyadris!' 
                    : preparednessScore >= 60 
                      ? '✓ Good to go: Ensure you don\'t skip personal medications.' 
                      : '⚠ Needs Attention: Highly recommended to secure proper rubber-soled footwear.'}
                </span>
              </div>

              {/* Interactive List */}
              <div className="space-y-2.5">
                {checklist.map(item => (
                  <label 
                    key={item.id}
                    className={`flex items-start p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      item.completed 
                        ? 'border-emerald-200 bg-emerald-50/20 text-slate-700' 
                        : 'border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklist(item.id)}
                      className="mt-0.5 mr-3 h-4 w-4 rounded border-slate-300 text-brand-moss-600 focus:ring-brand-moss-500 cursor-pointer"
                    />
                    <div>
                      <span className="block font-medium">{item.label}</span>
                      <span className="inline-block mt-0.5 rounded px-1.5 py-0.2 text-[9px] font-medium tracking-wide uppercase bg-slate-200/50 text-slate-500">
                        {item.category}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Emergency Contacts Panel */}
            <div className="rounded-2xl border border-[#E5E1D8] bg-white p-6 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-clay-50 text-brand-clay-500">
                  <PhoneCall className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <h3 className="text-base font-serif font-semibold text-[#1B2B20]">
                  Emergency Search Directory
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Immediate access numbers for regional disaster response teams and voluntary rescue pilots.
              </p>

              {/* Search contacts input */}
              <div className="relative mb-4">
                <Search className="absolute top-2.5 left-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by rescue unit, district..."
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 pl-8 pr-3 text-xs text-slate-800 focus:border-brand-moss-500 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Scrollable list */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact, index) => (
                    <div key={index} className="rounded-lg border border-slate-100 p-2.5 bg-[#FDFBF7]/40 hover:bg-[#FDFBF7] transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-brand-moss-900">{contact.name}</span>
                        <a 
                          href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                          className="text-[11px] font-bold text-brand-clay-500 hover:underline"
                        >
                          Call Now
                        </a>
                      </div>
                      <span className="block text-[11px] text-slate-600 font-mono mt-0.5">{contact.phone}</span>
                      <span className="block text-[10px] text-slate-400 mt-1 leading-normal">{contact.coverage}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-slate-400 py-4">No matching rescue cells found.</p>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Government GR highlights & official manuals */}
        <div className="mt-12 rounded-3xl border border-[#E5E1D8] bg-brand-moss-900 p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-left">
              <span className="inline-block rounded-md bg-brand-gold-500/20 px-2.5 py-1 text-[10px] font-bold text-brand-gold-400 tracking-wider uppercase border border-brand-gold-500/30">
                Official Government Resolution Reference
              </span>
              <h3 className="text-xl font-serif font-semibold italic text-brand-gold-100">
                Maharashtra Adventure Tourism Policy (DoT GR No. Temp-2021/C.R.76)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                As per the official gazette issued by the Tourism & Cultural Affairs Department, Government of Maharashtra, all land, air, and water adventure sports operators must strictly adhere to certified guidelines for equipment safety, guide qualifications (NIM/HMI/IMF), and mandatory rescue communication devices.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button 
                onClick={() => alert('Downloading official Maharashtra Government Gazetted Policy PDF (GR No. Temp-2021/C.R.76)...')}
                className="rounded-xl bg-brand-gold-500 px-4 py-2.5 text-xs font-black text-brand-moss-900 shadow hover:bg-brand-gold-600 transition-all cursor-pointer"
              >
                Download Policy GR (PDF)
              </button>
              <button 
                onClick={() => alert('Opening Maha Adventure Council (MAC) Standard Safety Audit Checklist Draft...')}
                className="rounded-xl border border-slate-500 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-100 hover:bg-white/15 transition-all cursor-pointer"
              >
                Safety Audit Checklist
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
