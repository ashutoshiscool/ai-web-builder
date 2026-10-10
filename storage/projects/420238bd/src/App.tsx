import React, { useState } from 'react';
import { 
  Car, MapPin, Calendar, Clock, ShieldCheck, Star, Phone, 
  User, CheckCircle, Menu, X, ChevronRight, Navigation, 
  Plane, Briefcase, Sparkles, CreditCard, ArrowRight, Shield, Award 
} from 'lucide-react';

interface FleetCar {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  pricePerKm: number;
  image: string;
  badge: string;
  description: string;
}

const fleetData: FleetCar[] = [
  {
    id: 'eco',
    name: 'Eco Sedan',
    category: 'Standard',
    passengers: 3,
    luggage: 2,
    pricePerKm: 2.5,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    badge: 'Most Popular',
    description: 'Comfortable hybrid vehicles ideal for daily city commuting and quick airport runs.'
  },
  {
    id: 'exec',
    name: 'Executive SUV',
    category: 'Business',
    passengers: 5,
    luggage: 4,
    pricePerKm: 4.0,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Rated',
    description: 'Spacious luxury SUVs with leather seating and professional chauffeur service.'
  },
  {
    id: 'lux',
    name: 'First Class Mercedes',
    category: 'Luxury',
    passengers: 3,
    luggage: 3,
    pricePerKm: 6.5,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    badge: 'VIP Ultimate',
    description: 'The pinnacle of comfort and sophistication for VIP guests and executive meetings.'
  },
  {
    id: 'van',
    name: 'Group Shuttle Van',
    category: 'Group',
    passengers: 8,
    luggage: 8,
    pricePerKm: 5.5,
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef1ae210?auto=format&fit=crop&w=800&q=80',
    badge: 'Family & Teams',
    description: 'Generous legroom and luggage space for airport transfers with large families or groups.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'book' | 'fleet' | 'services' | 'about' | 'contact'>('book');

  // Booking Form State
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [selectedVehicle, setSelectedVehicle] = useState<FleetCar>(fleetData[0]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      alert('Please enter both pickup and drop-off locations.');
      return;
    }
    const randomRef = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    setBookingReference(randomRef);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#070d1b] text-white font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Navbar with Liquid Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-8">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-[#0b132b]/60 border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] px-6 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('book')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 border border-sky-400/30">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent">
                AERO<span className="text-sky-400">CAB</span>
              </span>
              <span className="block text-[10px] text-sky-300/70 tracking-widest uppercase font-medium">Premium Chauffeur</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {[
              { id: 'book', label: 'Book a Ride' },
              { id: 'fleet', label: 'Our Fleet' },
              { id: 'services', label: 'Services' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Action / Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+18005550199" 
              className="flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors bg-sky-500/10 border border-sky-500/20 px-4 py-2 rounded-xl"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>+1 (800) 555-0199</span>
            </a>
            
            <button 
              onClick={() => setActiveTab('book')}
              className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl transition-all duration-300 group-hover:scale-105"></span>
              <span className="relative px-5 py-2 rounded-[11px] bg-[#0b132b] backdrop-blur-xl transition-all duration-300 group-hover:bg-opacity-0 flex items-center gap-2 text-sm font-semibold text-white">
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 max-w-7xl mx-auto backdrop-blur-2xl bg-[#0b132b]/95 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-2">
              {[
                { id: 'book', label: 'Book a Ride' },
                { id: 'fleet', label: 'Our Fleet' },
                { id: 'services', label: 'Services' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a 
                href="tel:+18005550199" 
                className="flex items-center justify-center gap-2 text-sm font-semibold text-sky-300 bg-sky-500/10 border border-sky-500/20 py-3 rounded-xl"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call Dispatch: +1 (800) 555-0199</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="pt-28 pb-16">

        {/* TAB 1: BOOK A RIDE & HOME */}
        {activeTab === 'book' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
            
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b132b] via-[#111e38] to-[#080e1a] border border-white/10 p-8 sm:p-14 shadow-2xl">
              
              {/* Decorative Glows */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Hero Copy */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>24/7 Professional Chauffeur Service</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
                    Your Ride, <br />
                    <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                      On Time, Every Time.
                    </span>
                  </h1>

                  <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                    Experience luxury transit with AeroCab. Fully licensed professional drivers, immaculate modern vehicles, and fixed transparent rates with zero surge pricing.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-md">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-white block">4.9 / 5.0 Rating</span>
                        <span className="text-slate-400">Over 15,000+ completed rides</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-md">
                      <ShieldCheck className="w-6 h-6 text-sky-400" />
                      <div className="text-xs">
                        <span className="font-bold text-white block">Fully Insured</span>
                        <span className="text-slate-400">Verified background drivers</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Booking Widget with Liquid Glass */}
                <div className="lg:col-span-6">
                  <div className="backdrop-blur-2xl bg-white/[0.07] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>

                    <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                      <span>Book Your Cab</span>
                      <span className="text-xs font-normal text-sky-300 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full">
                        Instant Dispatch
                      </span>
                    </h3>

                    {bookingConfirmed ? (
                      <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-bold text-white">Booking Confirmed!</h4>
                        <p className="text-slate-300 text-sm max-w-xs mx-auto">
                          Your ride has been successfully scheduled. Reference: <strong className="text-sky-300">{bookingReference}</strong>
                        </p>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-left text-xs space-y-2 max-w-sm mx-auto">
                          <div className="flex justify-between"><span className="text-slate-400">Pickup:</span> <span className="font-medium text-white">{pickup}</span></div>
                          <div className="flex justify-between"><span className="text-slate-400">Drop-off:</span> <span className="font-medium text-white">{dropoff}</span></div>
                          <div className="flex justify-between"><span className="text-slate-400">Vehicle:</span> <span className="font-medium text-sky-300">{selectedVehicle.name}</span></div>
                          <div className="flex justify-between"><span className="text-slate-400">When:</span> <span className="font-medium text-white">{date || 'Immediate'} {time}</span></div>
                        </div>
                        <button
                          onClick={() => setBookingConfirmed(false)}
                          className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium text-sm hover:opacity-95 transition-all shadow-lg shadow-sky-500/20"
                        >
                          Book Another Ride
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        
                        {/* Pickup */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-sky-400" />
                            Pickup Location
                          </label>
                          <input 
                            type="text"
                            required
                            placeholder="Enter pickup address or airport..."
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            className="w-full bg-[#070d1b]/70 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                          />
                        </div>

                        {/* Drop-off */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Navigation className="w-3.5 h-3.5 text-blue-400" />
                            Drop-off Location
                          </label>
                          <input 
                            type="text"
                            required
                            placeholder="Enter destination address..."
                            value={dropoff}
                            onChange={(e) => setDropoff(e.target.value)}
                            className="w-full bg-[#070d1b]/70 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                          />
                        </div>

                        {/* Date & Time Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-sky-400" />
                              Date
                            </label>
                            <input 
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full bg-[#070d1b]/70 border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-sky-400 transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-sky-400" />
                              Time
                            </label>
                            <input 
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              className="w-full bg-[#070d1b]/70 border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-sky-400 transition-all"
                            />
                          </div>
                        </div>

                        {/* Vehicle Category Selection */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Car className="w-3.5 h-3.5 text-sky-400" />
                            Select Vehicle Tier
                          </label>
                          <select
                            value={selectedVehicle.id}
                            onChange={(e) => {
                              const found = fleetData.find(v => v.id === e.target.value);
                              if (found) setSelectedVehicle(found);
                            }}
                            className="w-full bg-[#070d1b]/70 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400 transition-all"
                          >
                            {fleetData.map(car => (
                              <option key={car.id} value={car.id} className="bg-[#0b132b] text-white">
                                {car.name} ({car.category}) - ${car.pricePerKm}/km
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Submit Button with Liquid Glass */}
                        <button
                          type="submit"
                          className="w-full mt-2 relative group overflow-hidden rounded-xl p-[1px] focus:outline-none"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-xl transition-all duration-300 group-hover:scale-105"></span>
                          <span className="relative w-full py-3.5 rounded-[11px] bg-gradient-to-r from-sky-500 to-blue-600 backdrop-blur-xl transition-all flex items-center justify-center gap-2 text-sm font-bold text-white shadow-lg shadow-sky-500/25">
                            <span>Calculate Fare & Book Ride</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Features Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <ShieldCheck className="w-6 h-6 text-sky-400" />,
                  title: 'Fixed Transparent Rates',
                  desc: 'No hidden fees or unexpected surge multipliers. Know your fare before you step in.'
                },
                {
                  icon: <Clock className="w-6 h-6 text-sky-400" />,
                  title: 'On-Time Guarantee',
                  desc: 'Our chauffeurs arrive 10 minutes prior to your scheduled pickup time.'
                },
                {
                  icon: <Award className="w-6 h-6 text-sky-400" />,
                  title: 'Elite Professional Drivers',
                  desc: 'Fully vetted, background-checked, and extensively trained local experts.'
                }
              ].map((feat, idx) => (
                <div key={idx} className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-4">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: OUR FLEET */}
        {activeTab === 'fleet' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3.5 py-1.5 rounded-full border border-sky-500/30">
                World-Class Vehicles
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Explore Our Premium Fleet</h2>
              <p className="text-slate-400 text-sm">
                From economical hybrid sedans to ultra-luxurious Mercedes limousines, we have the perfect ride for every occasion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fleetData.map((car) => (
                <div 
                  key={car.id} 
                  className="backdrop-blur-xl bg-white/[0.04] border border-white/15 rounded-3xl overflow-hidden shadow-xl hover:border-sky-500/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070d1b] via-transparent to-transparent"></div>
                    <span className="absolute top-4 left-4 bg-sky-500/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                      {car.badge}
                    </span>
                    <span className="absolute top-4 right-4 bg-black/60 text-sky-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                      ${car.pricePerKm} / km
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-sky-400 uppercase font-semibold tracking-wider">{car.category}</span>
                        <div className="flex items-center gap-4 text-xs text-slate-300">
                          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-sky-400" /> {car.passengers} Seats</span>
                          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-sky-400" /> {car.luggage} Bags</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{car.name}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{car.description}</p>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedVehicle(car);
                        setActiveTab('book');
                      }}
                      className="w-full py-3 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 text-white font-medium text-sm transition-all duration-300 border border-white/15 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Book This Vehicle</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3.5 py-1.5 rounded-full border border-sky-500/30">
                Tailored Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Professional Services</h2>
              <p className="text-slate-400 text-sm">
                We cater to all your transportation needs with uncompromising quality and punctuality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Plane className="w-6 h-6 text-sky-400" />,
                  title: 'Airport Transfers',
                  desc: 'Flight tracking included. Your chauffeur waits for you in arrivals with a name board, rain or shine.'
                },
                {
                  icon: <Briefcase className="w-6 h-6 text-sky-400" />,
                  title: 'Corporate Travel',
                  desc: 'Streamlined corporate billing accounts, priority dispatch, and professional attire for executive meetings.'
                },
                {
                  icon: <Navigation className="w-6 h-6 text-sky-400" />,
                  title: 'City-to-City Tours',
                  desc: 'Comfortable long-distance rides with knowledgeable local drivers and custom sightseeing stops.'
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-sky-400" />,
                  title: 'VIP Event Chauffeur',
                  desc: 'Red carpet arrivals for weddings, galas, concerts, and exclusive private parties.'
                },
                {
                  icon: <Clock className="w-6 h-6 text-sky-400" />,
                  title: 'Hourly As-Directed',
                  desc: 'Keep a car and driver at your disposal for as many hours as you need with unlimited stops.'
                },
                {
                  icon: <Shield className="w-6 h-6 text-sky-400" />,
                  title: 'Secure Parcel Delivery',
                  desc: 'Urgent document and confidential package courier service with real-time GPS tracking.'
                }
              ].map((srv, idx) => (
                <div key={idx} className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                    {srv.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{srv.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{srv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ABOUT US */}
        {activeTab === 'about' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12 animate-in fade-in duration-300">
            <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/15 rounded-3xl p-8 sm:p-12 space-y-8">
              <div className="space-y-4 text-center max-w-2xl mx-auto">
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3.5 py-1.5 rounded-full border border-sky-500/30">
                  About AeroCab
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Redefining Modern Transit</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Founded in 2018, AeroCab was built on a singular vision: to eliminate the unreliability and hidden costs of traditional taxi services. We combine cutting-edge dispatch technology with luxury fleet vehicles and rigorous chauffeur standards.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-center">
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-1">15k+</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Completed Rides</span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-1">99.8%</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">On-Time Rate</span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-1">50+</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Luxury Vehicles</span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-1">4.9</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Client Rating</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12 animate-in fade-in duration-300">
            <div className="backdrop-blur-2xl bg-white/[0.04] border border-white/15 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3.5 py-1.5 rounded-full border border-sky-500/30">
                    Get in Touch
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight mt-3">We &apos;re Here 24/7</h2>
                  <p className="text-slate-400 text-sm mt-2">
                    Have questions about corporate bookings or need urgent assistance? Reach out to our dispatch team anytime.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>+1 (800) 555-0199</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span>100 Financial Plaza, Suite 400, New York, NY</span>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! Our team will contact you shortly.'); }} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 uppercase">Your Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-[#070d1b] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 uppercase">Email Address</label>
                  <input type="email" required placeholder="john@example.com" className="w-full bg-[#070d1b] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 uppercase">Message</label>
                  <textarea rows={4} required placeholder="How can we help you?" className="w-full bg-[#070d1b] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-500/20 hover:opacity-95 transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050a14] py-12 px-4 sm:px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              AERO<span className="text-sky-400">CAB</span>
            </span>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} AeroCab Technologies Inc. All rights reserved. Clean Navy & Sky Blue Theme with Liquid Glass Effects.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="#privacy" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-sky-400 transition-colors">Terms of Service</a>
            <a href="#safety" className="hover:text-sky-400 transition-colors">Safety Standards</a>
          </div>
        </div>
      </footer>

    </div>
  );
}