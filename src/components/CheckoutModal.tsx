import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Lock, ArrowLeft, ArrowRight, Loader2, Sparkles, MapPin, Calendar, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { Listing, Participant, Booking } from '../types';

interface CheckoutModalProps {
  listing: Listing;
  bookingDate: string;
  participantsCount: number;
  onClose: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export default function CheckoutModal({
  listing,
  bookingDate,
  participantsCount,
  onClose,
  onBookingComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Step 1: Contact & Participant states
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>(
    Array.from({ length: participantsCount }, () => ({ name: '', age: 20, gender: 'Male' }))
  );

  // Step 2: Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCVV, setCardCVV] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('');

  // Generated Booking results
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      alert('Please fill out all contact information fields.');
      return;
    }
    for (let i = 0; i < participants.length; i++) {
      if (!participants[i].name) {
        alert(`Please enter the name of Participant #${i + 1}`);
        return;
      }
    }
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate safe API processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          bookingDate: bookingDate,
          participantsCount: participantsCount,
          customerName,
          customerEmail,
          customerPhone,
          participants
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server rejected booking.');
      }

      const bookingResult: Booking = await response.json();
      setConfirmedBooking(bookingResult);
      setStep(3);
    } catch (error: any) {
      alert(error.message || 'Payment system error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateParticipant = (index: number, key: keyof Participant, value: any) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], [key]: value };
    setParticipants(updated);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleFinalDone = () => {
    if (confirmedBooking) {
      onBookingComplete(confirmedBooking);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-moss-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div 
        id="checkout-modal-container"
        className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        
        {/* Header Ribbon */}
        <div className="bg-brand-moss-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-brand-gold-500" />
            <div>
              <h2 className="text-sm font-extrabold tracking-wide uppercase">
                Secure Checkout Marketplace
              </h2>
              <p className="text-[10px] text-slate-300">
                128-Bit SSL Encrypted Escrow Gateway
              </p>
            </div>
          </div>
          <button 
            disabled={step === 3}
            onClick={onClose} 
            className="text-xs font-semibold text-slate-400 hover:text-white transition-all hover:scale-105 disabled:opacity-30 cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Wizard Steps indicator */}
        <div className="flex border-b text-center text-xs">
          <div className={`flex-1 py-3 font-semibold ${step === 1 ? 'bg-brand-clay-50/50 text-brand-clay-500 border-b-2 border-brand-clay-500' : 'text-slate-400'}`}>
            1. Participant Info
          </div>
          <div className={`flex-1 py-3 font-semibold ${step === 2 ? 'bg-brand-clay-50/50 text-brand-clay-500 border-b-2 border-brand-clay-500' : 'text-slate-400'}`}>
            2. Payment Details
          </div>
          <div className={`flex-1 py-3 font-semibold ${step === 3 ? 'bg-brand-moss-50/50 text-brand-moss-700 border-b-2 border-brand-moss-700 font-bold' : 'text-slate-400'}`}>
            3. Digital Pass Issued
          </div>
        </div>

        {/* Body content based on Step */}
        <div className="p-6 md:p-8 max-h-[65vh] overflow-y-auto">
          
          {/* STEP 1: PARTICIPANT FORM */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Order Summary</h3>
                <div className="flex justify-between text-xs text-slate-600">
                  <span className="font-semibold">{listing.title}</span>
                  <span className="font-extrabold text-slate-900 shrink-0 ml-4">₹{listing.price} × {participantsCount}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 mt-1">
                  <span>Batch Weekend Start:</span>
                  <span className="font-bold text-brand-moss-700">{bookingDate}</span>
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1.5">
                  Primary Contact info
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">WhatsApp Phone</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-brand-moss-500"
                    />
                  </div>
                </div>
              </div>

              {/* Participant List */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b pb-1.5">
                  Trekker/Participant Details
                </h3>
                
                {participants.map((participant, index) => (
                  <div key={index} className="rounded-xl border p-4 space-y-3 bg-slate-50/50">
                    <span className="inline-block text-[10px] font-extrabold bg-brand-moss-100 text-brand-moss-700 px-2 py-0.5 rounded-full uppercase">
                      Participant #{index + 1}
                    </span>
                    
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={participant.name}
                          onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                          placeholder="Name of trekker"
                          className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white outline-none focus:border-brand-moss-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Age</label>
                        <input
                          type="number"
                          required
                          min={10}
                          max={80}
                          value={participant.age}
                          onChange={(e) => updateParticipant(index, 'age', Number(e.target.value))}
                          className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white outline-none focus:border-brand-moss-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Gender</label>
                        <select
                          value={participant.gender}
                          onChange={(e) => updateParticipant(index, 'gender', e.target.value)}
                          className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white outline-none focus:border-brand-moss-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nav triggers */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center space-x-1 rounded-xl bg-brand-moss-800 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-moss-750 transition-all cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT GATEWAY */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              
              {/* Payment selector tabs */}
              <div className="flex space-x-3 rounded-xl border bg-slate-50 p-1">
                {[
                  { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="h-4 w-4" /> },
                  { id: 'upi', label: 'UPI / QR Scan', icon: <Sparkles className="h-4 w-4" /> }
                ].map((method) => (
                  <button
                    type="button"
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-1.5 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === method.id
                        ? 'bg-white text-brand-moss-700 shadow-xs ring-1 ring-slate-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {method.icon}
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>

              {/* CARD INPUT FORM */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 rounded-2xl border p-5 bg-slate-50/30">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center">
                      <Lock className="h-3.5 w-3.5 mr-1 text-brand-moss-600" />
                      Razorpay Gateway Direct Secure
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">DEMO AUTHORIZATION</span>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name printed on card"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs outline-none bg-white focus:border-brand-moss-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="4111 2222 3333 4444"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs font-mono outline-none bg-white focus:border-brand-moss-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs font-mono outline-none bg-white focus:border-brand-moss-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">CVV Security Code</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        placeholder="123"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs font-mono outline-none bg-white focus:border-brand-moss-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI INPUT FORM */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 rounded-2xl border p-5 bg-slate-50/30 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mx-auto">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Scan & Pay via BHIM / GPay / PhonePe</h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                      Enter your Virtual Payment Address (VPA) below. A secure notification pull request will be sent instantly to your UPI application.
                    </p>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. rahulsharma@okaxis"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-center font-mono outline-none bg-white focus:border-brand-moss-500"
                    />
                  </div>
                </div>
              )}

              {/* Navigation and price */}
              <div className="flex items-center justify-between border-t pt-5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Trekkers</span>
                </button>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400">Escrow Total Price</p>
                  <p className="text-sm font-black text-brand-moss-900">
                    ₹{(listing.price * participantsCount).toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  id="submit-payment-btn"
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 rounded-xl bg-brand-clay-500 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-clay-600 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 text-brand-gold-500" />
                      <span>Pay & Secure Spot</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: BOOKING PASS RENDER (THE TICKET) */}
          {step === 3 && confirmedBooking && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Congratulations! Pass Issued successfully.
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your registration is verified with operator. WhatsApp group link is sent!
                </p>
              </div>

              {/* TICKET CARD RENDERING */}
              <div className="relative border-2 border-brand-moss-700/20 bg-emerald-50/10 rounded-3xl overflow-hidden shadow-md max-w-md mx-auto">
                {/* Visual Ticket Top */}
                <div className="bg-brand-moss-900 p-4 text-white text-left flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-brand-gold-500 tracking-wider uppercase">MAHARASHTRA ADVENTURE PASS</span>
                    <h4 className="text-sm font-black tracking-tight">{confirmedBooking.listingTitle}</h4>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-white bg-brand-clay-500 px-2 py-1 rounded">
                    {confirmedBooking.id}
                  </span>
                </div>

                {/* Ticket Details */}
                <div className="p-5 text-left space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">BATCH WEEKEND</span>
                      <span className="font-bold text-slate-800 flex items-center mt-0.5">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-slate-500" />
                        {confirmedBooking.bookingDate}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">HEAD TRAVELER</span>
                      <span className="font-bold text-slate-800 mt-0.5 truncate block">{confirmedBooking.customerName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">ON-GROUND OPERATOR</span>
                      <span className="font-extrabold text-brand-moss-800 mt-0.5 block">{confirmedBooking.operatorName}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">SEATS REGISTERED</span>
                      <span className="font-bold text-slate-800 mt-0.5 block">{confirmedBooking.participantsCount} Trekkers</span>
                    </div>
                  </div>

                  {/* Maha Adventure Council Standards Audit Stamps */}
                  <div className="grid grid-cols-2 gap-3 border-b border-slate-100 pb-3 bg-brand-moss-50/40 p-2.5 rounded-xl border border-brand-moss-100/40">
                    <div>
                      <span className="block text-[8px] font-black text-brand-moss-800 uppercase tracking-wider">★ STATE ACCIDENT INSURANCE</span>
                      <span className="text-[10px] font-bold text-emerald-700 block mt-0.5">ACTIVE & INCLUDED</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-black text-brand-moss-800 uppercase tracking-wider">★ MAC SAFETY AUDIT</span>
                      <span className="text-[10px] font-bold text-brand-moss-700 block mt-0.5">PASSED (UIAA APPROVED)</span>
                    </div>
                  </div>

                  {/* QR code and verification column */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                      <span className="block text-[8px] font-bold text-slate-400 uppercase">OPERATOR DIRECT PHONE</span>
                      <span className="font-bold text-slate-700 flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-1 text-brand-moss-500" />
                        +91 98201 12345
                      </span>
                      <span className="block text-[8px] font-bold text-slate-400 uppercase pt-1">PAYMENT STATUS</span>
                      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-[9px] font-bold text-emerald-800 uppercase">
                        ESCROW CAPTURED
                      </span>
                    </div>

                    {/* SVG MOCK QR CODE */}
                    <div className="h-16 w-16 shrink-0 border bg-white p-1 rounded-lg">
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <rect x="0" y="0" width="20" height="20" fill="currentColor" className="text-slate-900" />
                        <rect x="80" y="0" width="20" height="20" fill="currentColor" className="text-slate-900" />
                        <rect x="0" y="80" width="20" height="20" fill="currentColor" className="text-slate-900" />
                        <rect x="25" y="25" width="10" height="10" fill="currentColor" className="text-slate-900" />
                        <rect x="45" y="15" width="20" height="15" fill="currentColor" className="text-slate-900" />
                        <rect x="65" y="55" width="15" height="25" fill="currentColor" className="text-slate-900" />
                        <rect x="15" y="55" width="25" height="15" fill="currentColor" className="text-slate-900" />
                        <rect x="45" y="45" width="10" height="10" fill="currentColor" className="text-slate-900" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Edge scalloped style */}
                <div className="absolute top-[4.5rem] -left-3 h-6 w-6 rounded-full bg-white border-r"></div>
                <div className="absolute top-[4.5rem] -right-3 h-6 w-6 rounded-full bg-white border-l"></div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={() => {
                    alert('Simulated PDF Download triggered! Your adventure pass was saved locally to your "My Passes" dashboard.');
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Download pass
                </button>
                <button
                  id="checkout-final-done-btn"
                  onClick={handleFinalDone}
                  className="rounded-xl bg-brand-moss-800 px-6 py-2 text-xs font-bold text-white hover:bg-brand-moss-750 transition-all cursor-pointer"
                >
                  View My Passes
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
