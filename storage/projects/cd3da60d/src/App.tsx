import React, { useState } from 'react';
import { 
  Car, Navigation, MapPin, Clock, Shield, Star, Users, Phone, 
  Calendar, Sparkles, Check, ChevronRight, ArrowRight, Zap, Award, 
  Search, Menu, X, DollarSign, Fuel, Smartphone, Compass, HelpCircle
} from 'lucide-react';

const NavIcon = Navigation;

interface Vehicle {
  id: string;
  name: string;
  category: string;
  capacity: number;
  bags: number;
  pricePerKm: number;
  baseFare: number;
  image: string;
  features: string[];
  popular?: boolean;
}

const FLEET: Vehicle[] = [
  {
    id: 'eco',
    name: 'Eco Sedan',
    category: 'Standard',
    capacity: 4,
    bags: 2,
    pricePerKm: 2.5,
    baseFare: 10,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    features: ['AC & Wi-Fi', 'Phone Charger', 'Up to 4 passengers']
  },
  {
    id: 'exec',
    name: 'Executive Mercedes',
    category: 'Luxury',
    capacity: 3,
    bags: 3,
    pricePerKm: 4.8,
    baseFare: 25,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    features: ['Leather Seats', 'Bottled Water', 'Chauffeur Suited', 'Wi-Fi'],
    popular: true
  },
  {
    id: 'tesla',
    name: 'Tesla Model Y',
    category: 'Electric',
    capacity: 4,
    bags: 3,
    pricePerKm: 3.2,
    baseFare: 15,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80',
    features: ['Zero Emissions', 'Glass Roof', 'Ultra Quiet', 'Spacious Boot']
  },
  {
    id: 'suv',
    name: 'Family SUV / Van',
    category: 'Group',
    capacity: 7,
    bags: 6,
    pricePerKm: 5.5,
    baseFare: 30,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    features: ['Up to 7 Seats', 'Extra Luggage Space', 'Group Travel', 'Child Seat on Request']
  }
];

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Corporate Executive',
    comment: 'VeloCabs is my go-to for airport transfers. The Mercedes executive fleet is spotless and drivers are always 5 minutes early.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Marcus Vance',
    role: 'Frequent Traveler',
    comment: 'The instant booking widget and fixed pricing save me so much hassle. No surge surprises ever!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Elena Rostova',
    role: 'Local Resident',
    comment: 'Ordered a Tesla EV for a night out. Super smooth ride, immaculate interior, and very polite driver. 10/10.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Booking Form State
  const [pickup, setPickup] = useState('JFK International Airport');
  const [dropoff, setDropoff] = useState('Manhattan Financial District');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(FLEET[1]);
  const [passengerCount, setPassengerCount] = useState('2 Passengers');
  const [bookingDate, setBookingDate] = useState('Now (As soon as possible)');
  
  // Modal State for Success
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState<any>(null);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleBookRide = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmedDetails({
      pickup,
      dropoff,
      vehicle: selectedVehicle,
      passengers: passengerCount,
      time: bookingDate,
      estimatedFare: (selectedVehicle.baseFare + selectedVehicle.pricePerKm * 14.5).toFixed(2),
      bookingId: 'VC-' + Math.floor(100000 + Math.random() * 900000)
    });
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#070D1D] text-slate-100 font-sans selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[140px] pointer-events-none" />

      {/* --- LIQUID GLASS NAVBAR --- */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-7xl mx-auto">
        <nav className="backdrop-blur-xl bg-[#0A1128]/70 border border-sky-500/20 shadow-[0_8px_32px_0_rgba(7,13,29,0.37)] rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                VELO<span className="text-sky-400">CABS</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Elite Taxi Service</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#fleet" className="hover:text-sky-400 transition-colors">Our Fleet</a>
            <a href="#estimator" className="hover:text-sky-400 transition-colors">Fare Estimator</a>
            <a href="#services" className="hover:text-sky-400 transition-colors">Corporate</a>
            <a href="#reviews" className="hover:text-sky-400 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-sky-400 transition-colors">FAQ</a>
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="tel:18008356222" 
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>+1 (800) VELO-CAB</span>
            </a>
            
            <a 
              href="#book"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 rounded-xl overflow-hidden shadow-lg group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-sky-500/25 active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                <span>Book a Cab</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 backdrop-blur-xl bg-[#0A1128]/95 border border-sky-500/20 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <a href="#fleet" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-200 hover:text-sky-400 py-2 border-b border-white/5">Our Fleet</a>
            <a href="#estimator" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-200 hover:text-sky-400 py-2 border-b border-white/5">Fare Estimator</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-200 hover:text-sky-400 py-2 border-b border-white/5">Corporate Services</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-200 hover:text-sky-400 py-2 border-b border-white/5">Customer Reviews</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-200 hover:text-sky-400 py-2">FAQ</a>
            <div className="pt-2 flex flex-col gap-3">
              <a href="tel:18008356222" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-200">
                <Phone className="w-4 h-4 text-sky-400" /> +1 (800) VELO-CAB
              </a>
              <a href="#book" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-sky-500/30">
                Book Ride Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION & BOOKING WIDGET --- */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Available 24/7 in 40+ Cities</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Your Journey, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-white bg-clip-text text-transparent">
                Elevated in Luxury.
              </span>
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience prompt airport transfers, professional licensed chauffeurs, and zero-surge upfront pricing. Ride in eco sedans or executive Mercedes in ultimate comfort.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#book" className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-sky-500/25 transition-all flex items-center gap-2 group">
                <span>Book Ride Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#fleet" className="px-6 py-3.5 rounded-2xl bg-[#0F1E38]/80 hover:bg-[#152747] border border-sky-500/20 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2">
                <Car className="w-4 h-4 text-sky-400" />
                <span>Explore Fleet</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-2xl font-bold text-white">4.9<span className="text-sky-400 text-lg">★</span></div>
                <div className="text-xs text-slate-400">15k+ Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">&lt; 4 min</div>
                <div className="text-xs text-slate-400">Average Pickup</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Fixed Fares</div>
              </div>
            </div>
          </div>

          {/* Right Booking Card Widget (Liquid Glass) */}
          <div className="lg:col-span-6" id="book">
            <div className="backdrop-blur-2xl bg-[#0A1128]/80 border border-sky-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <NavIcon className="w-5 h-5 text-sky-400" />
                    <span>Instant Cab Booking</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Instant dispatch with GPS tracking</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Drivers Online
                </span>
              </div>

              <form onSubmit={handleBookRide} className="space-y-4">
                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      value={pickup} 
                      onChange={(e) => setPickup(e.target.value)}
                      required
                      className="w-full bg-[#0F1E38]/90 border border-sky-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                      placeholder="Enter pickup address or airport"
                    />
                  </div>
                </div>

                {/* Dropoff Location */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Destination
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      value={dropoff} 
                      onChange={(e) => setDropoff(e.target.value)}
                      required
                      className="w-full bg-[#0F1E38]/90 border border-sky-500/20 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                      placeholder="Enter destination address"
                    />
                  </div>
                </div>

                {/* Vehicle Selection Carousel / Grid */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Select Vehicle Class
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {FLEET.map((v) => (
                      <div 
                        key={v.id}
                        onClick={() => setSelectedVehicle(v)}
                        className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center gap-3 ${
                          selectedVehicle.id === v.id 
                            ? 'bg-sky-500/20 border-sky-400 shadow-md shadow-sky-500/20' 
                            : 'bg-[#0F1E38]/50 border-white/10 hover:border-sky-500/40'
                        }`}
                      >
                        <img src={v.image} alt={v.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div>
                          <div className="text-xs font-bold text-white">{v.name}</div>
                          <div className="text-[11px] text-sky-400 font-medium">Est. ${(v.baseFare + v.pricePerKm * 14.5).toFixed(0)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date / Passenger info */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Passengers
                    </label>
                    <select 
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(e.target.value)}
                      className="w-full bg-[#0F1E38]/90 border border-sky-500/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
                    >
                      <option>1-2 Passengers</option>
                      <option>3-4 Passengers</option>
                      <option>5-7 Passengers (SUV)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Schedule Time
                    </label>
                    <select 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-[#0F1E38]/90 border border-sky-500/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400"
                    >
                      <option>Now (Asap - 4 mins)</option>
                      <option>In 30 minutes</option>
                      <option>In 1 hour</option>
                      <option>Tomorrow Morning</option>
                    </select>
                  </div>
                </div>

                {/* Submit CTA with Liquid Glass effect */}
                <button
                  type="submit"
                  className="w-full mt-2 relative inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white transition-all rounded-xl overflow-hidden shadow-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-sky-500/30 active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm & Dispatch Cab • ${(selectedVehicle.baseFare + selectedVehicle.pricePerKm * 14.5).toFixed(2)}</span>
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10" id="services">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">Why Ride With VeloCabs</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Redefining Urban & Airport Transportation</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="backdrop-blur-xl bg-[#0A1128]/60 border border-sky-500/20 p-8 rounded-3xl hover:border-sky-400/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400/20 to-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Licensed & Vetted Drivers</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every driver undergoes rigorous background checks, defensive driving tests, and maintains immaculate driving records.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-[#0A1128]/60 border border-sky-500/20 p-8 rounded-3xl hover:border-sky-400/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400/20 to-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Transparent Fixed Fares</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              No hidden night fees, no surge multiplier shock. The price you see upfront is the exact price you pay.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-[#0A1128]/60 border border-sky-500/20 p-8 rounded-3xl hover:border-sky-400/50 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400/20 to-blue-600/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">On-Time Guarantee</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              We monitor flight delays in real-time. If your flight is late, your chauffeur adjusts pickup time free of charge.
            </p>
          </div>

        </div>
      </section>

      {/* --- FLEET SHOWCASE --- */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10" id="fleet">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">Our Premium Garage</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Choose Your Ride Category</h3>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0">
            From daily commutes to executive board meetings or group airport runs, we maintain a fleet fit for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET.map((v) => (
            <div 
              key={v.id} 
              className={`backdrop-blur-xl bg-[#0A1128]/70 border rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-sky-400/50 relative ${
                v.popular ? 'border-sky-400/60 shadow-xl shadow-sky-500/10' : 'border-sky-500/20'
              }`}
            >
              {v.popular && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold bg-sky-500/20 border border-sky-500/40 text-sky-300 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  {v.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{v.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-sky-400" /> {v.capacity} Seats</span>
                    <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-sky-400" /> {v.bags} Bags</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {v.features.map((feat, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Starting at</span>
                    <div className="text-lg font-extrabold text-white">${v.baseFare} <span className="text-xs font-normal text-slate-400">base</span></div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedVehicle(v);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-xs font-bold rounded-xl transition-all"
                  >
                    Select Vehicle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- INTERACTIVE FARE ESTIMATOR --- */}
      <section className="py-20 px-4 sm:px-8 max-w-5xl mx-auto relative z-10" id="estimator">
        <div className="backdrop-blur-2xl bg-[#0A1128]/90 border border-sky-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-2">Instant Calculator</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Check Your Estimated Fare</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase">Estimated Distance (Miles)</label>
              <input 
                type="number" 
                defaultValue={14.5} 
                min={1} 
                max={200}
                className="w-full bg-[#0F1E38] border border-sky-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase">Vehicle Tier</label>
              <select className="w-full bg-[#0F1E38] border border-sky-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400">
                {FLEET.map(f => (
                  <option key={f.id}>{f.name} (${f.baseFare} base + ${f.pricePerKm}/mi)</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase">Service Type</label>
              <select className="w-full bg-[#0F1E38] border border-sky-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400">
                <option>Standard City Ride</option>
                <option>Airport Transfer (Fixed)</option>
                <option>Hourly Chauffeur ($45/hr)</option>
              </select>
            </div>
          </div>

          <div className="bg-[#0F1E38]/80 border border-sky-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Estimated Total Fare</div>
              <div className="text-3xl font-black text-white mt-1">$46.50 <span className="text-sm font-normal text-sky-400">USD incl. tolls & tax</span></div>
            </div>
            <a 
              href="#book"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 text-white font-bold text-sm shadow-lg shadow-sky-500/30 transition-all flex items-center gap-2"
            >
              <span>Book with this Fare</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- CUSTOMER TESTIMONIALS --- */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/5 relative z-10" id="reviews">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">Happy Passengers</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Trusted by Thousands Daily</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-[#0A1128]/70 border border-sky-500/20 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.comment}&rdquo;</p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border border-sky-400/40" />
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-sky-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto border-t border-white/5 relative z-10" id="faq">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3">Got Questions?</h2>
          <h3 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How do I locate my driver at the airport?',
              a: 'Your chauffeur will wait in the arrivals terminal holding a personalized digital signboard with your name. You will also receive their direct phone number and live vehicle GPS 15 minutes before pickup.'
            },
            {
              q: 'Are there any surge pricing or hidden late-night fees?',
              a: 'Never. VeloCabs operates on 100% transparent fixed pricing. The price you receive when booking is guaranteed, regardless of traffic delays or time of day.'
            },
            {
              q: 'Can I cancel or modify my booking?',
              a: 'Yes, you can cancel or reschedule your ride free of charge up to 2 hours before the scheduled pickup time through our web portal or hotline.'
            },
            {
              q: 'Do you provide child safety car seats?',
              a: 'Yes! You can request infant, toddler, or booster seats during the checkout/booking stage at no extra charge.'
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="backdrop-blur-xl bg-[#0A1128]/70 border border-sky-500/20 rounded-2xl overflow-hidden transition-all"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-sky-400"
              >
                <span>{faq.q}</span>
                <span className="text-sky-400 text-lg font-bold">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-sky-500/20 bg-[#040814] pt-16 pb-12 px-4 sm:px-8 text-slate-400 text-sm relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Car className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">VELO<span className="text-sky-400">CABS</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium airport transfers and urban transportation with zero surge pricing and luxury vehicles.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-300 font-semibold">Download App:</span>
              <a href="#" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 text-white">iOS</a>
              <a href="#" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 text-white">Android</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#fleet" className="hover:text-sky-400 transition-colors">Our Fleet</a></li>
              <li><a href="#estimator" className="hover:text-sky-400 transition-colors">Fare Estimator</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Corporate Accounts</a></li>
              <li><a href="#reviews" className="hover:text-sky-400 transition-colors">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Legal / Cities */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Top Cities</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-sky-400 transition-colors">New York (JFK / LGA)</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Los Angeles (LAX)</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">London (LHR)</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Paris (CDG)</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">24/7 Dispatch Desk</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>+1 (800) VELO-CAB</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>750 Lexington Ave, New York, NY</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Available 24 hours, 365 days</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>&copy; {new Date().getFullYear()} VeloCabs Technologies Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Driver Portal</a>
          </div>
        </div>
      </footer>

      {/* --- BOOKING CONFIRMATION MODAL --- */}
      {bookingConfirmed && confirmedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="backdrop-blur-2xl bg-[#0A1128] border border-sky-400/50 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Cab Dispatched Successfully!</h3>
            <p className="text-xs text-slate-400 mb-6">Your driver is en route. Booking reference: <span className="text-sky-400 font-mono font-bold">{confirmedDetails.bookingId}</span></p>

            <div className="space-y-3 bg-[#0F1E38]/90 p-4 rounded-2xl border border-sky-500/20 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="text-white font-semibold">{confirmedDetails.vehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pickup:</span>
                <span className="text-white font-semibold truncate max-w-[200px]">{confirmedDetails.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="text-white font-semibold truncate max-w-[200px]">{confirmedDetails.dropoff}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Schedule:</span>
                <span className="text-white font-semibold">{confirmedDetails.time}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm">
                <span className="text-slate-300 font-bold">Total Fare:</span>
                <span className="text-sky-400 font-extrabold">${confirmedDetails.estimatedFare} USD</span>
              </div>
            </div>

            <button
              onClick={() => setBookingConfirmed(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-500/30 hover:from-sky-400 transition-all"
            >
              Done / Track on Map
            </button>
          </div>
        </div>
      )}

    </div>
  );
}