import React, { useState } from 'react';
import { 
  Coffee, ShoppingBag, Search, Menu, X, Star, Check, 
  Sparkles, Flame, Shield, ChevronRight, SlidersHorizontal, 
  Heart, Plus, Minus, ArrowRight, Play, Award
} from 'lucide-react';

interface CoffeeItem {
  id: string;
  name: string;
  origin: string;
  roastLevel: 'Light' | 'Medium' | 'Dark' | 'Espresso';
  process: string;
  flavorNotes: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
}

const COFFEE_CATALOG: CoffeeItem[] = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe Aricha',
    origin: 'Gedeb, Yirgacheffe (Elevation: 2,100m)',
    roastLevel: 'Light',
    process: 'Natural Washed',
    flavorNotes: ['Jasmine', 'Blueberry', 'Bergamot', 'Lemon Zest'],
    price: 21.50,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
    description: 'A legendary Ethiopian single-origin boasting vibrant floral aromas and a sparkling, tea-like body with sweet berry undertones.'
  },
  {
    id: '2',
    name: 'Sumatra Mandheling Reserve',
    origin: 'Lake Toba, Sumatra',
    roastLevel: 'Dark',
    process: 'Wet-Hulled (Giling Basah)',
    flavorNotes: ['Dark Chocolate', 'Cedar', 'Black Cherry', 'Tobacco'],
    price: 19.00,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    badge: 'Rich & Bold',
    description: 'Full-bodied with low acidity and a syrupy mouthfeel. Notes of bittersweet dark chocolate and earthy cedar wood.'
  },
  {
    id: '3',
    name: 'Colombia Huila Supremo',
    origin: 'San Agustín, Huila',
    roastLevel: 'Medium',
    process: 'Fully Washed',
    flavorNotes: ['Caramel', 'Red Apple', 'Milk Chocolate', 'Almond'],
    price: 18.50,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80',
    badge: 'Staff Pick',
    description: 'Immensely balanced and approachable. Sweet caramel sweetness backed by crisp red apple acidity and a nutty finish.'
  },
  {
    id: '4',
    name: 'Midnight Crema Espresso',
    origin: 'Blend (Guatemala & Brazil)',
    roastLevel: 'Espresso',
    process: 'Natural & Washed Blend',
    flavorNotes: ['Hazelnut', 'Molasses', 'Vanilla Cream', 'Cocoa'],
    price: 20.00,
    rating: 5.0,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    badge: 'Best for Espresso',
    description: 'Engineered specifically for espresso machines and moka pots. Pulls thick tiger-stripe crema with zero harsh bitterness.'
  },
  {
    id: '5',
    name: 'Guatemala Antigua San José',
    origin: 'Antigua Valley, Guatemala',
    roastLevel: 'Medium',
    process: 'Washed',
    flavorNotes: ['Toffee', 'Orange Blossom', 'Milk Chocolate'],
    price: 22.00,
    rating: 4.7,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1610887588638-773099955404?auto=format&fit=crop&w=600&q=80',
    description: 'Grown in volcanic soil surrounded by three volcanoes. Offers a spicy, complex cup with distinct floral sweetness.'
  },
  {
    id: '6',
    name: 'Costa Rica Tarrazú Honey',
    origin: 'Tarrazú Region',
    roastLevel: 'Light',
    process: 'Yellow Honey Process',
    flavorNotes: ['Brown Sugar', 'Peach', 'Vanilla Bean', 'Red Honey'],
    price: 24.00,
    rating: 4.9,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
    badge: 'Limited Harvest',
    description: 'Mucilage left on the bean during sun drying imparts intense natural sweetness reminiscent of wildflower honey and stone fruit.'
  }
];

interface CartItem {
  coffee: CoffeeItem;
  quantity: number;
  grind: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'subscriptions' | 'quiz' | 'brewguides'>('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoast, setSelectedRoast] = useState<string>('All');
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [grindPreference, setGrindPreference] = useState('Whole Bean');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Quiz state
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({ roast: '', brewMethod: '', flavor: '' });
  const [quizResult, setQuizResult] = useState<CoffeeItem | null>(null);

  const addToCart = (coffee: CoffeeItem, grind: string = 'Whole Bean') => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.coffee.id === coffee.id && item.grind === grind);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { coffee, quantity: 1, grind }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index].quantity += delta;
      if (newCart[index].quantity <= 0) {
        return newCart.filter((_, i) => i !== index);
      }
      return newCart;
    });
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.coffee.price * item.quantity, 0);

  const filteredCoffee = COFFEE_CATALOG.filter(coffee => {
    const matchesSearch = coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          coffee.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          coffee.flavorNotes.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRoast = selectedRoast === 'All' || coffee.roastLevel === selectedRoast;
    return matchesSearch && matchesRoast;
  });

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-200 text-xs py-2 px-4 text-center font-medium border-b border-amber-900/50 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Free artisan shipping on all recurring subscriptions & orders over $45! Use code <strong className="text-white underline">FRESHBREW</strong></span>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-[#0c0a09]/90 backdrop-blur-md border-b border-stone-800/80 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-stone-300 hover:text-white p-1"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div 
              onClick={() => setActiveTab('shop')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-lg sm:text-xl tracking-tight text-white uppercase block leading-none">
                  Aroma Craft
                </span>
                <span className="text-[10px] tracking-widest text-amber-500 uppercase font-semibold">
                  Artisanal Roasters
                </span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium ml-6">
              <button 
                onClick={() => setActiveTab('shop')}
                className={`transition-colors py-1 border-b-2 ${activeTab === 'shop' ? 'border-amber-500 text-amber-400 font-semibold' : 'border-transparent text-stone-300 hover:text-white'}`}
              >
                Shop Roasts
              </button>
              <button 
                onClick={() => setActiveTab('subscriptions')}
                className={`transition-colors py-1 border-b-2 ${activeTab === 'subscriptions' ? 'border-amber-500 text-amber-400 font-semibold' : 'border-transparent text-stone-300 hover:text-white'}`}
              >
                Subscriptions
              </button>
              <button 
                onClick={() => setActiveTab('quiz')}
                className={`transition-colors py-1 border-b-2 flex items-center gap-1.5 ${activeTab === 'quiz' ? 'border-amber-500 text-amber-400 font-semibold' : 'border-transparent text-stone-300 hover:text-white'}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Coffee Matcher
              </button>
              <button 
                onClick={() => setActiveTab('brewguides')}
                className={`transition-colors py-1 border-b-2 ${activeTab === 'brewguides' ? 'border-amber-500 text-amber-400 font-semibold' : 'border-transparent text-stone-300 hover:text-white'}`}
              >
                Brew Guides
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="text"
                placeholder="Search origin, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-stone-900 border border-stone-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600 w-48 lg:w-60 transition-all"
              />
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-600/50 text-stone-200 hover:text-amber-400 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">
                ${totalCartPrice.toFixed(2)}
              </span>
              {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex lg:hidden animate-fadeIn">
          <div className="w-4/5 max-w-xs bg-[#12100e] h-full border-r border-stone-800 p-6 flex flex-col justify-between shadow-2xl relative">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2 pt-2">
                <Coffee className="w-6 h-6 text-amber-500" />
                <span className="font-bold text-lg text-white">Aroma Craft</span>
              </div>

              <nav className="flex flex-col space-y-3 font-medium text-sm">
                <button 
                  onClick={() => { setActiveTab('shop'); setIsMobileMenuOpen(false); }}
                  className={`text-left py-2 px-3 rounded-lg ${activeTab === 'shop' ? 'bg-amber-600/20 text-amber-400 font-bold border border-amber-600/30' : 'text-stone-300'}`}
                >
                  Shop Roasts
                </button>
                <button 
                  onClick={() => { setActiveTab('subscriptions'); setIsMobileMenuOpen(false); }}
                  className={`text-left py-2 px-3 rounded-lg ${activeTab === 'subscriptions' ? 'bg-amber-600/20 text-amber-400 font-bold border border-amber-600/30' : 'text-stone-300'}`}
                >
                  Subscriptions
                </button>
                <button 
                  onClick={() => { setActiveTab('quiz'); setIsMobileMenuOpen(false); }}
                  className={`text-left py-2 px-3 rounded-lg flex items-center gap-2 ${activeTab === 'quiz' ? 'bg-amber-600/20 text-amber-400 font-bold border border-amber-600/30' : 'text-stone-300'}`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Coffee Matcher Quiz
                </button>
                <button 
                  onClick={() => { setActiveTab('brewguides'); setIsMobileMenuOpen(false); }}
                  className={`text-left py-2 px-3 rounded-lg ${activeTab === 'brewguides' ? 'bg-amber-600/20 text-amber-400 font-bold border border-amber-600/30' : 'text-stone-300'}`}
                >
                  Brew Guides
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-800 text-xs text-stone-500 text-center">
              Small batch roasted in Portland, OR.
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="pb-24">
        {activeTab === 'shop' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-stone-900 border-b border-stone-800 py-20 px-6 sm:px-12 lg:px-20">
              <div className="absolute inset-0 z-0 opacity-40">
                <img 
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80" 
                  alt="Coffee beans background" 
                  className="w-full h-full object-cover filter brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09] via-[#0c0a09]/80 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-600/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                  <Flame className="w-3.5 h-3.5" />
                  Roasted Fresh Weekly • 100% Arabica
                </div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                  Single-Origin Coffee, Masterfully Roasted.
                </h1>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  Sourced ethically from high-altitude farms across Ethiopia, Sumatra, and Colombia. Small-batch roasted to unlock transcendent flavor notes in every cup.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog-grid');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-900/40 transition-all flex items-center gap-2"
                  >
                    <span>Shop All Roasts</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('quiz')}
                    className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-sm border border-stone-700 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Find Your Match</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Catalog Filters & Grid */}
            <div id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
                <div>
                  <h2 className="text-2xl font-black text-white">Current Roaster Selections</h2>
                  <p className="text-xs text-stone-400 mt-0.5">Showing {filteredCoffee.length} exquisite artisan coffees</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                  {['All', 'Light', 'Medium', 'Dark', 'Espresso'].map((roast) => (
                    <button
                      key={roast}
                      onClick={() => setSelectedRoast(roast)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${selectedRoast === roast ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30' : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'}`}
                    >
                      {roast} Roast
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCoffee.map((coffee) => (
                  <div 
                    key={coffee.id}
                    className="group bg-stone-900/80 border border-stone-800 hover:border-amber-600/60 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                        <img 
                          src={coffee.image} 
                          alt={coffee.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {coffee.badge && (
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black bg-amber-600 text-white uppercase tracking-wider shadow-md">
                            {coffee.badge}
                          </span>
                        )}
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-md text-stone-300 border border-stone-700/50">
                          {coffee.roastLevel} Roast
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between text-xs text-stone-400">
                          <span className="truncate">{coffee.origin}</span>
                          <div className="flex items-center gap-1 text-amber-400 font-bold flex-shrink-0">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{coffee.rating}</span>
                            <span className="text-stone-500 font-normal">({coffee.reviewsCount})</span>
                          </div>
                        </div>

                        <h3 
                          onClick={() => setSelectedCoffee(coffee)}
                          className="font-black text-lg text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          {coffee.name}
                        </h3>

                        <p className="text-xs text-stone-400 line-clamp-2">
                          {coffee.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {coffee.flavorNotes.map((note, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-full bg-stone-950 text-[10px] font-medium text-stone-300 border border-stone-800">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center justify-between border-t border-stone-800/60 mt-4">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block">12 oz Bag</span>
                        <span className="text-xl font-black text-white">${coffee.price.toFixed(2)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedCoffee(coffee)}
                          className="px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all"
                        >
                          Details
                        </button>
                        <button 
                          onClick={() => addToCart(coffee)}
                          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-900/30 transition-all flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-600/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                <Coffee className="w-3.5 h-3.5" />
                Never Run Out of Fresh Coffee
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white">The Artisan Roast Club</h2>
              <p className="text-sm sm:text-base text-stone-400">
                Customized deliveries of freshly roasted single-origin beans straight to your door. Pause, skip, or cancel anytime. Save 15% on every shipment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'The Explorer', bags: '1 Bag / Month', price: '$17.00', desc: 'Perfect for single coffee drinkers. Explore a new world-class origin every month.', popular: false },
                { name: 'The Connoisseur', bags: '2 Bags / Month', price: '$32.00', desc: 'Our most popular plan. Ideal for couples or daily coffee enthusiasts.', popular: true },
                { name: 'The Office & Cafe', bags: '4 Bags / Month', price: '$58.00', desc: 'For heavy households, remote teams, or true espresso addicts.', popular: false }
              ].map((sub, i) => (
                <div 
                  key={i}
                  className={`relative rounded-3xl p-8 border flex flex-col justify-between transition-all ${sub.popular ? 'bg-stone-900 border-amber-500 shadow-2xl shadow-amber-900/20 ring-2 ring-amber-500/50' : 'bg-stone-900/50 border-stone-800'}`}
                >
                  {sub.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black bg-amber-600 text-white uppercase tracking-wider shadow-lg">
                      MOST POPULAR CHOICE
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">{sub.name}</h3>
                    <p className="text-xs text-amber-500 font-semibold mt-1">{sub.bags}</p>
                    <p className="text-xs text-stone-400 mt-3 mb-6">{sub.desc}</p>
                    
                    <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-stone-800">
                      <span className="text-4xl font-black text-white">{sub.price}</span>
                      <span className="text-xs text-stone-400">/delivery</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {['Free priority shipping', '15% off retail prices', 'Exclusive micro-lot access', 'Flexible delivery frequency'].map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-stone-300">
                          <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => {
                      addToCart(COFFEE_CATALOG[i % COFFEE_CATALOG.length]);
                      alert(`Successfully joined ${sub.name}! Your first roast is preparing.`);
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${sub.popular ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/40' : 'bg-stone-800 hover:bg-stone-700 text-stone-200'}`}
                  >
                    Start {sub.name} Subscription
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

              {!quizResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-600/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                      Step {quizStep} of 3
                    </span>
                    <span className="text-xs text-stone-500 font-mono">Coffee Matchmaker</span>
                  </div>

                  {quizStep === 1 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl sm:text-3xl font-black text-white">How do you like your roast profile?</h2>
                      <p className="text-xs text-stone-400">This helps us determine how long the beans spend in the roaster drum.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {['Light & Fruity', 'Medium & Balanced', 'Dark & Bold', 'Intense Espresso'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setQuizAnswers({...quizAnswers, roast: opt});
                              setQuizStep(2);
                            }}
                            className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-left text-xs font-bold text-stone-200 hover:text-amber-400 transition-all flex items-center justify-between group"
                          >
                            <span>{opt}</span>
                            <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-amber-500 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl sm:text-3xl font-black text-white">What is your primary brewing method?</h2>
                      <p className="text-xs text-stone-400">Different gear extracts unique body and acidity.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {['Pour Over (V60 / Chemex)', 'Espresso Machine', 'French Press / Plunger', 'Drip Coffee Maker'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setQuizAnswers({...quizAnswers, brewMethod: opt});
                              setQuizStep(3);
                            }}
                            className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-left text-xs font-bold text-stone-200 hover:text-amber-400 transition-all flex items-center justify-between group"
                          >
                            <span>{opt}</span>
                            <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-amber-500 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quizStep === 3 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl sm:text-3xl font-black text-white">What flavor notes excite you most?</h2>
                      <p className="text-xs text-stone-400">Choose your favorite tasting notes profile.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {['Floral & Citrus Berries', 'Chocolate & Caramel Sweetness', 'Earthy Cedar & Tobacco', 'Nutty Almond & Vanilla'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setQuizAnswers({...quizAnswers, flavor: opt});
                              // Select matching coffee
                              setQuizResult(COFFEE_CATALOG[Math.floor(Math.random() * COFFEE_CATALOG.length)]);
                            }}
                            className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-left text-xs font-bold text-stone-200 hover:text-amber-400 transition-all flex items-center justify-between group"
                          >
                            <span>{opt}</span>
                            <Sparkles className="w-4 h-4 text-amber-500" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">Your Custom Match</span>
                    <h2 className="text-3xl font-black text-white mt-1">{quizResult.name}</h2>
                    <p className="text-xs text-stone-400 max-w-md mx-auto mt-2">
                      Based on your preference for <strong className="text-stone-200">{quizAnswers.roast}</strong> and <strong className="text-stone-200">{quizAnswers.brewMethod}</strong>, this is your ultimate match!
                    </p>
                  </div>

                  <div className="bg-stone-950 rounded-2xl p-6 border border-stone-800 flex items-center gap-4 text-left">
                    <img src={quizResult.image} alt={quizResult.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] text-amber-500 font-bold">{quizResult.origin}</span>
                      <h4 className="font-bold text-white text-sm">{quizResult.name}</h4>
                      <span className="text-xs font-black text-stone-200">${quizResult.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        addToCart(quizResult);
                        setQuizResult(null);
                        setQuizStep(1);
                      }}
                      className="flex-1 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-900/40 transition-all"
                    >
                      Add to Cart & Brew
                    </button>
                    <button 
                      onClick={() => {
                        setQuizResult(null);
                        setQuizStep(1);
                      }}
                      className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs transition-all"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'brewguides' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <h2 className="text-3xl font-black text-white">Master the Brew</h2>
              <p className="text-xs sm:text-sm text-stone-400">Step-by-step masterclass guides by champion baristas to extract perfection every single morning.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'The V60 Pour Over', time: '3 min', ratio: '1:16 Ratio', desc: 'Clean, vibrant extraction highlighting delicate floral and fruit notes.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
                { title: 'Espresso Dial-In', time: '28 sec', ratio: '1:2 Ratio', desc: 'Achieving rich tiger-stripe crema and velvety sweet balance.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80' },
                { title: 'French Press Immersion', time: '4 min', ratio: '1:15 Ratio', desc: 'Full-bodied, rich, and robust cup with natural oils preserved.', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80' }
              ].map((guide, idx) => (
                <div key={idx} className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 group">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-900/50">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-amber-500 font-semibold">
                      <span>{guide.time}</span>
                      <span>•</span>
                      <span>{guide.ratio}</span>
                    </div>
                    <h3 className="font-bold text-white text-lg">{guide.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">{guide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedCoffee && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141210] border border-stone-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-fadeIn">
            <button 
              onClick={() => setSelectedCoffee(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <img src={selectedCoffee.image} alt={selectedCoffee.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-amber-500 font-bold uppercase">{selectedCoffee.origin}</span>
                    <h2 className="text-2xl font-black text-white mt-1">{selectedCoffee.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2.5 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px] font-bold border border-stone-800">{selectedCoffee.roastLevel} Roast</span>
                      <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" /> {selectedCoffee.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {selectedCoffee.description}
                  </p>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-stone-400">Select Grind Preference</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Whole Bean', 'Espresso', 'Drip / Pour Over', 'French Press'].map((grind) => (
                        <button
                          key={grind}
                          onClick={() => setGrindPreference(grind)}
                          className={`p-2 rounded-xl text-xs font-semibold border transition-all ${grindPreference === grind ? 'bg-amber-600/20 border-amber-600 text-amber-400' : 'bg-stone-900 border-stone-800 text-stone-300'}`}
                        >
                          {grind}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase block">Price</span>
                    <span className="text-2xl font-black text-white">${selectedCoffee.price.toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => {
                      addToCart(selectedCoffee, grindPreference);
                      setSelectedCoffee(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-900/40 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-[#12100e] h-full border-l border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-lg text-white">Your Coffee Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-900 text-stone-300 flex items-center justify-center hover:bg-stone-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <Coffee className="w-12 h-12 text-stone-700 mx-auto" />
                  <p className="text-sm text-stone-400">Your cart is currently empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs"
                  >
                    Explore Roasts
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {cart.map((item, index) => (
                    <div key={index} className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 flex gap-4 items-center">
                      <img src={item.coffee.image} alt={item.coffee.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-white truncate">{item.coffee.name}</h4>
                        <span className="text-[10px] text-amber-500 font-medium block">Grind: {item.grind}</span>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-black text-white">${(item.coffee.price * item.quantity).toFixed(2)}</span>
                          <div className="flex items-center gap-2 bg-stone-950 rounded-lg px-2 py-1 border border-stone-800">
                            <button onClick={() => updateQuantity(index, -1)} className="text-stone-400 hover:text-white">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                            <button onClick={() => updateQuantity(index, 1)} className="text-stone-400 hover:text-white">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-stone-800">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${totalCartPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Artisan Shipping</span>
                    <span className="font-semibold text-emerald-400">{totalCartPrice > 45 ? "FREE" : "$4.99"}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-stone-800/80">
                    <span>Total</span>
                    <span className="text-amber-400">${(totalCartPrice > 45 ? totalCartPrice : totalCartPrice + 4.99).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutSuccess(true);
                    setTimeout(() => {
                      setCart([]);
                      setCheckoutSuccess(false);
                      setIsCartOpen(false);
                    }, 2000);
                  }}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-bold text-xs shadow-lg shadow-amber-900/40 transition-all flex items-center justify-center gap-2"
                >
                  {checkoutSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Order Placed! Roasting Soon...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Proceed to Checkout</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}