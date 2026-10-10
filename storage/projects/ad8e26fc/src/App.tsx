import React, { useState } from 'react';
import { 
  Play, Info, Search, Check, ChevronRight,
  X, Flame, Coffee, Menu, Sparkles, ShoppingBag, Sun, Moon
} from 'lucide-react';

interface CoffeeItem {
  id: string;
  title: string;
  category: 'single-origin' | 'blend' | 'masterclass' | 'equipment';
  matchScore: number;
  roastLevel: 'Light' | 'Medium' | 'Dark' | 'Omni';
  originOrDuration: string;
  flavorNotes: string[];
  description: string;
  thumbnail: string;
  backdrop: string;
}

const COFFEE_CATALOG: CoffeeItem[] = [
  {
    id: '1',
    title: 'Ethiopia Yirgacheffe G1 Natural',
    category: 'single-origin',
    matchScore: 99,
    roastLevel: 'Light',
    originOrDuration: '2,100m · 300g Bag',
    flavorNotes: ['Blueberry', 'Jasmine', 'Bergamot', 'Honey'],
    description: 'Exquisite heirloom beans processed under African sun drying beds. Delivers vibrant floral aromas with a sparkling citrus acidity and syrupy body.',
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '2',
    title: 'Panama Hacienda La Esmeralda Geisha',
    category: 'single-origin',
    matchScore: 98,
    roastLevel: 'Light',
    originOrDuration: '1,850m · 250g Reserve',
    flavorNotes: ['White Peach', 'Jasmine', 'Lemongrass'],
    description: 'The crown jewel of specialty coffee. Cultivated in volcanic soil under shaded canopies in Boquete, Panama. Unmatched aromatic complexity.',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '3',
    title: 'Mastering V60 Pour-Over Extraction',
    category: 'masterclass',
    matchScore: 96,
    roastLevel: 'Medium',
    originOrDuration: '24m Masterclass',
    flavorNotes: ['Technique', 'Ratio 1:16', 'Water Temp'],
    description: 'Join World Brewers Cup champion in a step-by-step masterclass on pour-over geometry, agitation, and dial-in extraction curves.',
    thumbnail: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '4',
    title: 'Midnight Velvet Espresso Blend',
    category: 'blend',
    matchScore: 95,
    roastLevel: 'Dark',
    originOrDuration: 'Guatemala & Sumatra · 500g',
    flavorNotes: ['Dark Chocolate', 'Molasses', 'Toasted Walnut'],
    description: 'Crafted specifically for rich crema and heavy body. Cuts effortlessly through milk for velvety flat whites and intense double ristrettos.',
    thumbnail: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '5',
    title: 'Colombia Huila Pink Bourbon',
    category: 'single-origin',
    matchScore: 94,
    roastLevel: 'Medium',
    originOrDuration: '1,900m · 300g Bag',
    flavorNotes: ['Pink Guava', 'Raspberry', 'Panela'],
    description: 'A rare natural mutation of red and yellow bourbon yielding extraordinarily sweet, tropical fruit profiles with a creamy mouthfeel.',
    thumbnail: 'https://images.unsplash.com/photo-1507133750043-495f57cf04d5?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1507133750043-495f57cf04d5?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '6',
    title: 'The Chemex & Cold Drip Science',
    category: 'masterclass',
    matchScore: 92,
    roastLevel: 'Medium',
    originOrDuration: '32m Masterclass',
    flavorNotes: ['Clarity', 'Immersion', 'Flow Rate'],
    description: 'Unlock crystal-clear tasting notes using bonded paper filters and slow-steep cold extraction mathematics.',
    thumbnail: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80',
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'single-origin' | 'blend' | 'masterclass' | 'mylist'>('home');
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);
  const [isBrewing, setIsBrewing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [myList, setMyList] = useState<string[]>(['1', '3']);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'explorer' | 'connoisseur' | 'roaster'>('connoisseur');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMyList = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (myList.includes(id)) {
      setMyList(myList.filter(item => item !== id));
    } else {
      setMyList([...myList, id]);
    }
  };

  const filteredCatalog = COFFEE_CATALOG.filter(item => {
    if (searchQuery) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.flavorNotes.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (activeTab === 'single-origin') return item.category === 'single-origin';
    if (activeTab === 'blend') return item.category === 'blend';
    if (activeTab === 'masterclass') return item.category === 'masterclass';
    if (activeTab === 'mylist') return myList.includes(item.id);
    return true;
  });

  const featured = COFFEE_CATALOG[0];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0d0d0d] text-white selection:bg-[#f59e0b] selection:text-black' : 'bg-[#f8f6f0] text-zinc-900 selection:bg-amber-500 selection:text-white'}`}>
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between backdrop-blur-md transition-all ${isDarkMode ? 'bg-gradient-to-b from-black/95 via-black/70 to-transparent' : 'bg-gradient-to-b from-white/95 via-white/70 to-transparent border-b border-zinc-200/60'}`}>
        <div className="flex items-center gap-4 sm:gap-8">
          <button 
            onClick={() => setShowMobileMenu(true)}
            className={`md:hidden p-1 ${isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-600/30">
              <Coffee className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-amber-500 font-black text-xl sm:text-2xl tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]">
                Migre
              </span>
              <span className={`hidden sm:inline-block ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold ${isDarkMode ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-amber-500/10 text-amber-700 border border-amber-500/30'}`}>
                ARTISANAL 4K
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('home')}
              className={`transition-colors ${activeTab === 'home' ? 'text-amber-500 font-semibold' : isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('single-origin')}
              className={`transition-colors ${activeTab === 'single-origin' ? 'text-amber-500 font-semibold' : isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
            >
              Single Origins
            </button>
            <button 
              onClick={() => setActiveTab('blend')}
              className={`transition-colors ${activeTab === 'blend' ? 'text-amber-500 font-semibold' : isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
            >
              Espresso Blends
            </button>
            <button 
              onClick={() => setActiveTab('masterclass')}
              className={`transition-colors ${activeTab === 'masterclass' ? 'text-amber-500 font-semibold' : isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
            >
              Brew Masterclasses
            </button>
            <button 
              onClick={() => setActiveTab('mylist')}
              className={`transition-colors ${activeTab === 'mylist' ? 'text-amber-500 font-semibold' : isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
            >
              Roast Wishlist ({myList.length})
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex items-center">
            <Search className={`w-4 h-4 absolute left-3 pointer-events-none ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <input 
              type="text"
              placeholder="Beans, notes, origins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`border rounded-full pl-9 pr-3 sm:px-4 py-1.5 text-xs focus:outline-none focus:border-amber-500 w-28 sm:w-60 transition-all shadow-inner ${isDarkMode ? 'bg-black/70 border-zinc-700/80 text-white placeholder-zinc-400' : 'bg-white/90 border-zinc-300 text-black placeholder-zinc-500'}`}
            />
          </div>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full border transition-all ${isDarkMode ? 'bg-zinc-900 border-zinc-700 text-amber-400 hover:bg-zinc-800' : 'bg-white border-zinc-300 text-amber-600 hover:bg-zinc-100 shadow-sm'}`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setShowSubscriptionModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-xs font-bold text-black shadow-lg shadow-amber-500/30 transition-all transform hover:scale-105"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Subscribe Box</span>
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-orange-700 flex items-center justify-center font-bold text-xs shadow-md text-white border border-amber-500/50">
            MG
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex md:hidden animate-fadeIn">
          <div className={`w-4/5 max-w-xs h-full p-6 flex flex-col justify-between shadow-2xl relative ${isDarkMode ? 'bg-[#141414] border-r border-zinc-800 text-white' : 'bg-white border-r border-zinc-200 text-black'}`}>
            <button 
              onClick={() => setShowMobileMenu(false)}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-black'}`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2 pt-2">
                <Coffee className="w-6 h-6 text-amber-500" />
                <span className="text-amber-500 font-black text-xl tracking-tighter uppercase">
                  Migre
                </span>
              </div>

              <nav className="flex flex-col space-y-3 font-medium text-sm">
                <button 
                  onClick={() => { setActiveTab('home'); setShowMobileMenu(false); }}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors ${activeTab === 'home' ? 'bg-amber-500 text-black font-bold' : isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => { setActiveTab('single-origin'); setShowMobileMenu(false); }}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors ${activeTab === 'single-origin' ? 'bg-amber-500 text-black font-bold' : isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100'}`}
                >
                  Single Origins
                </button>
                <button 
                  onClick={() => { setActiveTab('blend'); setShowMobileMenu(false); }}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors ${activeTab === 'blend' ? 'bg-amber-500 text-black font-bold' : isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100'}`}
                >
                  Espresso Blends
                </button>
                <button 
                  onClick={() => { setActiveTab('masterclass'); setShowMobileMenu(false); }}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors ${activeTab === 'masterclass' ? 'bg-amber-500 text-black font-bold' : isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100'}`}
                >
                  Brew Masterclasses
                </button>
                <button 
                  onClick={() => { setActiveTab('mylist'); setShowMobileMenu(false); }}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors ${activeTab === 'mylist' ? 'bg-amber-500 text-black font-bold' : isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100'}`}
                >
                  Roast Wishlist ({myList.length})
                </button>
              </nav>
            </div>

            <div className={`pt-6 border-t space-y-3 ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <button 
                onClick={() => { setShowSubscriptionModal(true); setShowMobileMenu(false); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-amber-500 text-black font-bold text-xs shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Subscribe Box</span>
              </button>
              <div className="text-[10px] text-zinc-500 text-center">
                Migre Roastery v3.2 • 100% Arabica
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowMobileMenu(false)}></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="pb-24">
        {activeTab === 'home' && !searchQuery && (
          <div className="relative">
            {/* Hero Spotlight Banner */}
            <div className="relative h-[70vh] sm:h-[82vh] w-full">
              <div className="absolute inset-0">
                <img 
                  src={featured.backdrop} 
                  alt={featured.title} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-black/60' : 'bg-gradient-to-t from-[#f8f6f0] via-[#f8f6f0]/60 to-black/40'}`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-20 left-6 sm:left-12 max-w-2xl space-y-4 z-10">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 fill-current" />
                    CHEF&apos;S ROAST OF THE WEEK
                  </span>
                  <span className="text-amber-400 font-bold text-xs">99% Connoisseur Match</span>
                  <span className="px-2 py-0.5 border border-amber-500/40 text-amber-300 text-[10px] rounded font-mono">{featured.roastLevel} Roast</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                  {featured.title}
                </h1>

                <p className="text-sm sm:text-base text-zinc-200 line-clamp-3 drop-shadow">
                  {featured.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {featured.flavorNotes.map((note, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-black/60 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
                      ✨ {note}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button 
                    onClick={() => {
                      setSelectedCoffee(featured);
                      setIsBrewing(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-zinc-200 text-black font-bold text-sm shadow-xl transition-all transform hover:scale-105"
                  >
                    <Play className="w-5 h-5 fill-current text-amber-600" />
                    <span>Brew Guide Simulation</span>
                  </button>

                  <button 
                    onClick={() => setSelectedCoffee(featured)}
                    className="flex items-center gap-2 px-6 py-3 rounded-md bg-zinc-800/80 hover:bg-zinc-800 text-white font-bold text-sm backdrop-blur-md border border-zinc-700 transition-all transform hover:scale-105"
                  >
                    <Info className="w-5 h-5" />
                    <span>Tasting Notes & Origin</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Catalog Rows */}
        <div className="px-6 sm:px-12 -mt-16 sm:-mt-24 relative z-20 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                <Flame className="w-5 h-5 text-amber-500" />
                {searchQuery ? `Search Results for "${searchQuery}"` : activeTab === 'home' ? 'Trending Single Origins & Masterclasses' : `${activeTab.toUpperCase()} Collection`}
              </h2>
              <span className="text-xs text-amber-500 hover:text-amber-600 cursor-pointer flex items-center gap-1 font-medium">
                Explore Full Roastery <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredCatalog.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedCoffee(item)}
                  className={`group relative rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 hover:z-30 ${isDarkMode ? 'bg-[#141414] border-zinc-800 hover:border-amber-500/60' : 'bg-white border-zinc-200 hover:border-amber-500'}`}
                >
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/30">
                      {item.roastLevel}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCoffee(item);
                          setIsBrewing(true);
                        }}
                        className="w-9 h-9 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg hover:bg-amber-400 transition-colors font-bold"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-500 font-semibold">{item.matchScore}% Match</span>
                      <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}>{item.originOrDuration}</span>
                    </div>

                    <h3 className={`font-bold text-sm line-clamp-1 group-hover:text-amber-500 transition-colors ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap gap-1">
                      {item.flavorNotes.slice(0, 2).map((note, i) => (
                        <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded border ${isDarkMode ? 'text-zinc-300 bg-zinc-900 border-zinc-800' : 'text-zinc-700 bg-zinc-100 border-zinc-200'}`}>
                          {note}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-zinc-500 font-mono">Fresh Roasted</span>
                      <button 
                        onClick={(e) => toggleMyList(item.id, e)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${myList.includes(item.id) ? 'bg-amber-500 border-amber-500 text-black font-bold' : isDarkMode ? 'border-zinc-700 text-zinc-300 hover:border-white' : 'border-zinc-300 text-zinc-700 hover:border-black'}`}
                      >
                        {myList.includes(item.id) ? <Check className="w-3.5 h-3.5" /> : '+'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className={`border rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn ${isDarkMode ? 'bg-[#181818] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
            <button 
              onClick={() => setShowSubscriptionModal(false)}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-zinc-200 text-black hover:bg-zinc-300'}`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold border border-amber-500/40">
                Migre Roastery Box
              </span>
              <h2 className="text-2xl font-black">Choose Your Subscription Plan</h2>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Fresh single-origin coffees delivered to your doorstep every month. Cancel or pause anytime.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'explorer', name: 'Explorer', bags: '1 Bag / mo', price: '$19' },
                { id: 'connoisseur', name: 'Connoisseur', bags: '2 Bags / mo', price: '$35' },
                { id: 'roaster', name: 'Master Roaster', bags: '4 Bags / mo', price: '$65' }
              ].map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${selectedPlan === plan.id ? 'bg-amber-500/10 border-amber-500 text-amber-500' : isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700' : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300'}`}
                >
                  <div>
                    <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{plan.name}</h4>
                    <span className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{plan.bags}</span>
                  </div>
                  <div className="mt-4">
                    <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{plan.price}</span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}> /mo</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                setCheckoutSuccess(true);
                setTimeout(() => {
                  setCheckoutSuccess(false);
                  setShowSubscriptionModal(false);
                }, 2000);
              }}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {checkoutSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Subscription Confirmed! Roasting Fresh...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Confirm Subscription</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Detail / More Info Modal */}
      {selectedCoffee && !isBrewing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className={`border rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fadeIn relative ${isDarkMode ? 'bg-[#181818] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
            <button 
              onClick={() => setSelectedCoffee(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full">
              <img src={selectedCoffee.backdrop} alt={selectedCoffee.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedCoffee.title}</h2>
                  <div className="flex items-center gap-3 text-xs text-zinc-300 mt-1">
                    <span className="text-amber-400 font-bold">{selectedCoffee.matchScore}% Match</span>
                    <span className="text-amber-300 font-mono">{selectedCoffee.originOrDuration}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">{selectedCoffee.roastLevel} Roast</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsBrewing(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-md bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-xl transition-all"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Brew Guide</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                {selectedCoffee.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">Tasting Notes & Profile</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCoffee.flavorNotes.map((note, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-md text-xs font-medium border ${isDarkMode ? 'bg-zinc-900 text-amber-300 border-zinc-800' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                      ✨ {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}