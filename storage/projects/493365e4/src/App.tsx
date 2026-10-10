import React, { useState } from 'react';
import { 
  Car, MapPin, Navigation, Clock, Shield, Star, Users, Phone, Mail, 
  ChevronRight, ArrowRight, Search, CheckCircle2, User, CreditCard, 
  SlidersHorizontal, Sparkles, Menu, X, HelpCircle, Calendar, DollarSign,
  Compass, Award, Headphones, Briefcase, Zap
} from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  category: 'Economy' | 'Comfort' | 'Executive' | 'Van';
  image: string;
  basePrice: number;
  perKm: number;
  capacity: number;
  bags: number;
  features: string[];
  description: string;
}

const FLEET: Vehicle[] = [
  {
    id: '1',
    name: 'AeroSedan Eco',
    category: 'Economy',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    basePrice: 12,
    perKm: 2.5,
    capacity: 4,
    bags: 2,
    features: ['Free Wi-Fi', 'Phone Chargers', 'Air Conditioned'],
    description: 'Clean, efficient hybrid sedans for everyday city commuting and quick errands.'
  },
  {
    id: '2',
    name: 'AeroComfort Cruiser',
    category: 'Comfort',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
    basePrice: 18,
    perKm: 3.5,
    capacity: 4,
    bags: 3,
    features: ['Leather Seats', 'Bottled Water', 'Extra Legroom', 'Top Rated Drivers'],
    description: 'Spacious modern sedans designed for ultimate relaxation and smooth daily rides.'
  },
  {
    id: '3',
    name: 'AeroExecutive Limo',
    category: 'Executive',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    basePrice: 35,
    perKm: 5.5,
    capacity: 3,
    bags: 4,
    features: ['VIP Treatment', 'Complimentary Champagne', 'Wi-Fi & Tablet', 'Professional Suit Driver'],
    description: 'Top-tier luxury vehicles for corporate executives, airport VIPs, and special occasions.'
  },
  {
    id: '4',
    name: 'AeroVan Shuttle',
    category: 'Van',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=600&q=80',
    basePrice: 40,
    perKm: 6.0,
    capacity: 7,
    bags: 6,
    features: ['7 Seater', 'Extra Luggage Space', 'Family Friendly', 'Group Travel'],
    description: 'Perfect for airport transfers with family, groups, or heavy luggage.'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Samantha Vance',
    role: 'Marketing Director',
    comment: 'AeroCab has completely transformed how I travel to client meetings. Immaculate cars and extremely punctual drivers!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Tech Entrepreneur',
    comment: 'The liquid glass booking app is slick, and the Executive Limo service is world-class. Highly recommend!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Frequent Traveler',
    comment: 'Never missed a flight since switching to AeroCab airport pickups. Drivers track flights automatically.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'book' | 'track' | 'fleet'>('book');
  
  // Booking state
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(FLEET[1]);
  const [rideTime, setRideTime] = useState('Now');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Track state
  const [searchTrackId, setSearchTrackId] = useState('');
  const [trackedRide, setTrackedRide] = useState<any | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleBookRide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      alert('Please enter both pickup and drop-off locations.');
      return;
    }
    const randomId = 'AC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setBookingConfirmed(true);
  };

  const handleTrackRide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTrackId) return;
    setTrackedRide({
      id: searchTrackId,
      driverName: 'David K.',
      car: 'AeroComfort Cruiser (Navy Blue)',
      plate: 'SKY-7892',
      eta: '4 mins away',
      status: 'On the way to pickup',
      driverPhone: '+1 (555) 382-9102',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* LIQUID GLASS NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b132b]/70 border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('book')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_0_20px_rgba(56,189,248,0.4)] border border-sky-300/30">
              <Car className="w-6 h-6 text-white drop-shadow" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent">
                AEROCAB
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-sky-400 font-semibold">
                Elite Taxi & Fleet
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button 
              onClick={() => { setActiveTab('book'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`transition-colors hover:text-sky-400 ${activeTab === 'book' ? 'text-sky-400 font-semibold' : ''}`}
            >
              Book Ride
            </button>
            <button 
              onClick={() => { setActiveTab('track'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`transition-colors hover:text-sky-400 ${activeTab === 'track' ? 'text-sky-400 font-semibold' : ''}`}
            >
              Track Ride
            </button>
            <button 
              onClick={() => { setActiveTab('fleet'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`transition-colors hover:text-sky-400 ${activeTab === 'fleet' ? 'text-sky-400 font-semibold' : ''}`}
            >
              Our Fleet
            </button>
            <a href="#services" className="transition-colors hover:text-sky-400">Services</a>
            <a href="#about" className="transition-colors hover:text-sky-400">About</a>
            <a href="#faq" className="transition-colors hover:text-sky-400">FAQ</a>
          </nav>

          {/* Liquid Glass CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:18005558294" 
              className="flex items-center gap-2 text-xs font-semibold text-sky-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>1-800-555-TAXI</span>
            </a>
            
            <button
              onClick={() => { setActiveTab('book'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none"
            >
              {/* Liquid glass gradient border ring */}
              <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 rounded-xl opacity-80 group-hover:opacity-100 transition-opacity"></span>
              
              {/* Liquid glass inner surface */}
              <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-[11px] bg-[#0b132b]/80 backdrop-blur-md text-white font-semibold text-sm transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-sky-500/20 group-hover:to-blue-600/30 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Book Now</span>
              </span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0b132b]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
            <button 
              onClick={() => { setActiveTab('book'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-lg text-slate-200 hover:text-sky-400 py-2 border-b border-white/5"
            >
              Book Ride
            </button>
            <button 
              onClick={() => { setActiveTab('track'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-lg text-slate-200 hover:text-sky-400 py-2 border-b border-white/5"
            >
              Track Ride
            </button>
            <button 
              onClick={() => { setActiveTab('fleet'); setMobileMenuOpen(false); }}
              className="block w-full text-left font-medium text-lg text-slate-200 hover:text-sky-400 py-2 border-b border-white/5"
            >
              Our Fleet
            </button>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left font-medium text-lg text-slate-200 hover:text-sky-400 py-2 border-b border-white/5"
            >
              Services
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left font-medium text-lg text-slate-200 hover:text-sky-400 py-2"
            >
              FAQ
            </a>
            <div className="pt-4">
              <button
                onClick={() => { setActiveTab('book'); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book a Ride Now</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO / MAIN BOOKING SECTION */}
      {activeTab === 'book' && (
        <section className="relative pt-12 pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Hero Copy */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                  24/7 Premium Fleet Available in Your City
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
                  Ride in Ultimate <br />
                  <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-white bg-clip-text text-transparent">
                    Comfort & Style
                  </span>
                </h1>

                <p className="text-slate-300 text-lg max-w-xl font-normal leading-relaxed">
                  Experience seamless, fixed-rate luxury transit. Professional vetted chauffeurs, spotless navy-blue fleet, and instantaneous booking with live GPS tracking.
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
                  <div>
                    <div className="text-2xl font-bold text-sky-400">4.9/5</div>
                    <div className="text-xs text-slate-400">Over 50k+ Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sky-400">&lt; 5 min</div>
                    <div className="text-xs text-slate-400">Average Pickup Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sky-400">100%</div>
                    <div className="text-xs text-slate-400">Vetted Drivers</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Liquid Glass Interactive Booking Card */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl p-1 bg-gradient-to-b from-sky-400/30 via-white/10 to-blue-900/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
                  <div className="bg-[#0b132b]/85 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 border border-white/10 relative overflow-hidden">
                    
                    {/* Card header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                      <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <Car className="w-5 h-5 text-sky-400" />
                          <span>Book Your Journey</span>
                        </h2>
                        <p className="text-xs text-slate-400">Instant dispatch & guaranteed best rates</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-medium border border-sky-500/30">
                        Instant Fare
                      </span>
                    </div>

                    {!bookingConfirmed ? (
                      <form onSubmit={handleBookRide} className="space-y-4">
                        
                        {/* Pickup Input */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Pickup Location
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <MapPin className="w-4 h-4 text-sky-400" />
                            </div>
                            <input
                              type="text"
                              value={pickup}
                              onChange={(e) => setPickup(e.target.value)}
                              placeholder="Enter pickup address or airport terminal"
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                              required
                            />
                          </div>
                        </div>

                        {/* Dropoff Input */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Destination
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Navigation className="w-4 h-4 text-blue-400" />
                            </div>
                            <input
                              type="text"
                              value={dropoff}
                              onChange={(e) => setDropoff(e.target.value)}
                              placeholder="Where are you heading?"
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                              required
                            />
                          </div>
                        </div>

                        {/* Vehicle Category Selector */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Select Vehicle Class
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {FLEET.map((veh) => (
                              <button
                                key={veh.id}
                                type="button"
                                onClick={() => setSelectedVehicle(veh)}
                                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                                  selectedVehicle.id === veh.id
                                    ? 'bg-sky-500/20 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                              >
                                <img src={veh.image} alt={veh.name} className="w-12 h-10 object-cover rounded-lg" />
                                <div className="overflow-hidden">
                                  <div className="text-xs font-bold text-white truncate">{veh.name}</div>
                                  <div className="text-[11px] text-sky-400 font-semibold">${veh.basePrice} base</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Schedule & Time */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                              Pickup Time
                            </label>
                            <select
                              value={rideTime}
                              onChange={(e) => setRideTime(e.target.value)}
                              className="w-full px-3 py-2.5 bg-[#070b14] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-sky-400"
                            >
                              <option value="Now">Ride Now (~4 min)</option>
                              <option value="In 15 mins">In 15 minutes</option>
                              <option value="In 30 mins">In 30 minutes</option>
                              <option value="Scheduled">Schedule for Later</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                              Estimated Fare
                            </label>
                            <div className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sky-300 font-bold text-sm flex items-center justify-between">
                              <span>Est.</span>
                              <span>${selectedVehicle.basePrice + 18}.00</span>
                            </div>
                          </div>
                        </div>

                        {/* Submit Liquid Glass Button */}
                        <button
                          type="submit"
                          className="w-full mt-4 group relative overflow-hidden rounded-xl p-[1px] focus:outline-none"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300 rounded-xl"></span>
                          <span className="relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-[11px] bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-500/30 group-hover:from-sky-400 group-hover:to-blue-500 transition-all">
                            <span>Confirm & Dispatch Driver</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      </form>
                    ) : (
                      /* Success State */
                      <div className="py-8 text-center space-y-4 animate-fade-in">
                        <div className="w-16 h-16 bg-sky-500/20 border border-sky-400 rounded-full flex items-center justify-center mx-auto text-sky-400">
                          <CheckCircle2 className="w-10 h-10 animate-bounce" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Driver Dispatched!</h3>
                        <p className="text-slate-300 text-sm max-w-sm mx-auto">
                          Your <span className="text-sky-400 font-semibold">{selectedVehicle.name}</span> is on the way. Booking Reference: <strong className="text-white">{bookingId}</strong>
                        </p>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left text-xs space-y-2 max-w-sm mx-auto">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Pickup:</span>
                            <span className="text-white font-medium truncate max-w-[200px]">{pickup}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Drop-off:</span>
                            <span className="text-white font-medium truncate max-w-[200px]">{dropoff}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Driver ETA:</span>
                            <span className="text-sky-400 font-bold">3 mins (Plate: SKY-921)</span>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-center pt-2">
                          <button
                            onClick={() => { setActiveTab('track'); setSearchTrackId(bookingId); }}
                            className="px-5 py-2.5 rounded-xl bg-sky-500 text-white font-semibold text-xs shadow-lg shadow-sky-500/30"
                          >
                            Live GPS Track
                          </button>
                          <button
                            onClick={() => setBookingConfirmed(false)}
                            className="px-5 py-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white font-semibold text-xs"
                          >
                            Book Another Ride
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* TRACK RIDE TAB */}
      {activeTab === 'track' && (
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-black text-white">Live Ride Tracking</h2>
            <p className="text-slate-400 text-sm">Enter your booking code to monitor your driver's real-time location.</p>
          </div>

          <div className="bg-[#0b132b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <form onSubmit={handleTrackRide} className="flex gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-sky-400" />
                <input
                  type="text"
                  value={searchTrackId}
                  onChange={(e) => setSearchTrackId(e.target.value)}
                  placeholder="Enter Booking ID (e.g. AC-492104)"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 transition-all"
              >
                Track Live
              </button>
            </form>

            {trackedRide ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Status</div>
                    <div className="text-lg font-bold text-sky-400 mt-1 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {trackedRide.status}
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Estimated Arrival</div>
                    <div className="text-lg font-bold text-white mt-1">{trackedRide.eta}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Vehicle Plate</div>
                    <div className="text-lg font-bold text-white mt-1">{trackedRide.plate}</div>
                  </div>
                </div>

                {/* Simulated Live Map */}
                <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b] via-transparent to-transparent"></div>
                  
                  {/* Radar pulse */}
                  <div className="absolute w-32 h-32 rounded-full border border-sky-400/30 animate-ping"></div>
                  
                  <div className="relative z-10 flex flex-col items-center gap-3 bg-[#0b132b]/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-sky-400/30 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <img src={trackedRide.avatar} alt="Driver" className="w-12 h-12 rounded-full object-cover border-2 border-sky-400" />
                      <div>
                        <div className="font-bold text-white">{trackedRide.driverName}</div>
                        <div className="text-xs text-sky-300">{trackedRide.car}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs pt-2 border-t border-white/10 w-full justify-between">
                      <span className="text-slate-300">Rating: ⭐ {trackedRide.rating}</span>
                      <a href={`tel:${trackedRide.driverPhone}`} className="text-sky-400 font-bold hover:underline">
                        Call Driver ({trackedRide.driverPhone})
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-sm">
                Enter your booking ID above to see real-time vehicle telemetry, driver info, and GPS path.
              </div>
            )}
          </div>
        </section>
      )}

      {/* FLEET TAB */}
      {activeTab === 'fleet' && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Our Navy Blue Fleet</h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              From economical city hybrids to luxurious executive sedans, discover our meticulously maintained fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET.map((car) => (
              <div 
                key={car.id} 
                className="bg-[#0b132b]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-400/50 transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-900">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-sky-500/80 backdrop-blur-md text-white text-xs font-semibold">
                      {car.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{car.name}</h3>
                  <p className="text-xs text-slate-300 mb-4 line-clamp-2">{car.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 pb-4 border-b border-white/10">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-sky-400" /> {car.capacity} Seats</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-sky-400" /> {car.bags} Bags</span>
                  </div>

                  <div className="space-y-1.5 mb-6">
                    {car.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400">Starting at</span>
                    <span className="text-lg font-extrabold text-sky-400">${car.basePrice} <span className="text-xs text-slate-400 font-normal">/ ride</span></span>
                  </div>
                  <button
                    onClick={() => { setSelectedVehicle(car); setActiveTab('book'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-sky-500 hover:text-white text-slate-200 font-semibold text-xs transition-all duration-200 border border-white/10"
                  >
                    Select {car.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 bg-gradient-to-b from-transparent via-[#0b132b]/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Why Choose AeroCab</h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              We combine cutting-edge liquid glass booking technology with old-fashioned hospitality and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0b132b]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl space-y-4 hover:border-sky-400/40 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Bank-Grade Safety</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                All vehicles undergo daily safety inspections, and every driver is rigorously background-checked and insured.
              </p>
            </div>

            <div className="bg-[#0b132b]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl space-y-4 hover:border-sky-400/40 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Instant Flight Tracking</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Flying in? We monitor your flight arrival time automatically so your chauffeur is waiting even if your flight is delayed.
              </p>
            </div>

            <div className="bg-[#0b132b]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl space-y-4 hover:border-sky-400/40 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Fixed Transparent Pricing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No surge pricing surprises. The price you see upfront when booking is the exact price you pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-black text-white">Loved by Thousands of Riders</h2>
          <p className="text-slate-400 text-sm">Here is what our frequent business and leisure riders have to say.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-[#0b132b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sky-400 text-sky-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm italic">&ldquo;{t.comment}&rdquo;</p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-sky-400" />
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-sky-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Got questions? We have answers.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How do I identify my AeroCab driver?',
              a: 'Your driver arrives in a clean navy-blue vehicle. You will receive their name, exact license plate number, and photo via SMS and in the live track tab.'
            },
            {
              q: 'Can I book a ride in advance for airport pickups?',
              a: 'Yes! You can schedule rides up to 30 days in advance. Our system monitors flight numbers for real-time adjustments.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit/debit cards, Apple Pay, Google Pay, and corporate billing accounts.'
            },
            {
              q: 'Are pets allowed in AeroCab vehicles?',
              a: 'Service animals are always welcome. For pets, please select our Van or Comfort class and notify us in the driver notes.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-[#0b132b]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left font-bold text-white flex items-center justify-between text-sm sm:text-base hover:text-sky-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-sky-400 transition-transform ${openFaq === idx ? 'rotate-90' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-slate-300 text-sm border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050810] border-t border-white/10 pt-16 pb-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">AEROCAB</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium navy-blue taxi and private chauffeur services engineered with liquid-smooth digital booking.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { setActiveTab('book'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-sky-400">Book a Ride</button></li>
              <li><button onClick={() => { setActiveTab('track'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-sky-400">Track Ride</button></li>
              <li><button onClick={() => { setActiveTab('fleet'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-sky-400">Our Fleet</button></li>
              <li><a href="#services" className="hover:text-sky-400">Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-sky-400">Help Center</a></li>
              <li><a href="#faq" className="hover:text-sky-400">Safety & Security</a></li>
              <li><a href="#faq" className="hover:text-sky-400">Airport Pickup Guide</a></li>
              <li><a href="tel:18005558294" className="hover:text-sky-400">Contact Dispatch</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Dispatch Hotline</h4>
            <div className="text-xl font-extrabold text-sky-400 mb-2">1-800-555-TAXI</div>
            <p className="text-xs text-slate-400 mb-4">Available 24 hours a day, 7 days a week across all major metropolitan areas.</p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>support@aerocab.com</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>&copy; 2025 AeroCab Technologies Inc. All rights reserved.</div>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <a href="#security" className="hover:text-slate-400">Security</a>
          </div>
        </div>
      </footer>

    </div>
  );
}