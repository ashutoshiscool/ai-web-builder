import React, { useState } from 'react';
import { 
  Play, Pause, Search, Bell, ChevronDown, Check, Plus, X, Star, 
  Flame, Zap, Shield, TrendingUp, Film, Tv, Volume2, VolumeX, 
  RotateCcw, SkipForward, Info, Heart, Sparkles, Compass
} from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  type: 'movie' | 'series';
  genre: string[];
  matchScore: number;
  duration: string;
  rating: string;
  year: number;
  description: string;
  bannerUrl: string;
  posterUrl: string;
  episodes?: number;
}

const mockMedia: MediaItem[] = [
  {
    id: '1',
    title: 'Cyber Pulse: Neo Tokyo 2099',
    type: 'series',
    genre: ['Sci-Fi', 'Cyberpunk', 'Action'],
    matchScore: 98,
    duration: '1 Season',
    rating: 'TV-MA',
    year: 2025,
    episodes: 8,
    description: 'In a neon-drenched megacity controlled by sentient AI cartels, an elite cyber-detective uncovers a conspiracy that threatens the fabric of human consciousness.',
    bannerUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=1920',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    title: 'The Quantum Paradox',
    type: 'movie',
    genre: ['Thriller', 'Time Travel', 'Drama'],
    matchScore: 95,
    duration: '2h 18m',
    rating: 'PG-13',
    year: 2024,
    description: 'Physicists racing to close a tear in spacetime must decide whether to save their loved ones or prevent the collapse of reality itself.',
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1920',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    title: 'Abyssal Deep',
    type: 'movie',
    genre: ['Documentary', 'Nature', 'Mystery'],
    matchScore: 92,
    duration: '1h 45m',
    rating: 'TV-PG',
    year: 2023,
    description: 'A groundbreaking submersible expedition dives into the Mariana Trench, discovering bioluminescent ecosystems and geological anomalies previously thought impossible.',
    bannerUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=1920',
    posterUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    title: 'Echoes of Valhalla',
    type: 'series',
    genre: ['Fantasy', 'Action', 'Adventure'],
    matchScore: 97,
    duration: '3 Seasons',
    rating: 'TV-MA',
    year: 2024,
    episodes: 24,
    description: 'Exiled shield-maidens and resurrected warriors forge an uneasy alliance against dark gods awakening beneath the frozen fjords of the North.',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920',
    posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '5',
    title: 'Velocity Syndicate',
    type: 'movie',
    genre: ['Action', 'Crime', 'Thriller'],
    matchScore: 90,
    duration: '1h 58m',
    rating: 'R',
    year: 2025,
    description: 'An underground street racer with a military past is blackmailed into executing the most daring armored truck heist in European history.',
    bannerUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1920',
    posterUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '6',
    title: 'Chef & Alchemist',
    type: 'series',
    genre: ['Comedy', 'Romance', 'Reality'],
    matchScore: 89,
    duration: '2 Seasons',
    rating: 'TV-14',
    year: 2023,
    episodes: 16,
    description: 'A Michelin-starred chef opens a restaurant in an eccentric mountain village where local herbs seem to possess mind-altering magical properties.',
    bannerUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920',
    posterUrl: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=600'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'movies' | 'series' | 'watchlist'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>(['1', '4']);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleWatchlist = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredMedia = mockMedia.filter(item => {
    const matchesTab = 
      activeTab === 'home' || 
      (activeTab === 'movies' && item.type === 'movie') || 
      (activeTab === 'series' && item.type === 'series') ||
      (activeTab === 'watchlist' && watchlist.includes(item.id));

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const featured = mockMedia[0];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-rose-600 selection:text-white">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090d]/90 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-600/30">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CINEPULSE
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'home' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab('movies')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'movies' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                Movies
              </button>
              <button 
                onClick={() => setActiveTab('series')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'series' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                Series
              </button>
              <button 
                onClick={() => setActiveTab('watchlist')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${activeTab === 'watchlist' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                Watchlist
                {watchlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold">
                    {watchlist.length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search movies, series, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
              />
            </div>

            <button className="relative p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="User Profile"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-rose-500/50"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-18">
        {/* Hero Section (Only on Home & if not searching) */}
        {activeTab === 'home' && !searchQuery && (
          <div className="relative h-[85vh] min-h-[600px] w-full flex items-center">
            {/* Background Image & Gradients */}
            <div className="absolute inset-0 z-0">
              <img
                src={featured.bannerUrl}
                alt={featured.title}
                className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#08090d] via-[#08090d]/80 to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-rose-600/20 border border-rose-500/30 text-rose-400 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> #1 in Streaming Today
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 text-xs font-semibold">
                    {featured.rating}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">{featured.year}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
                  {featured.title}
                </h1>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" /> {featured.matchScore}% Match
                  </span>
                  <span className="text-slate-300">{featured.duration}</span>
                  <div className="flex items-center gap-1.5">
                    {featured.genre.map((g, idx) => (
                      <span key={idx} className="text-slate-400 text-xs bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-slate-300 text-base sm:text-lg line-clamp-3 leading-relaxed">
                  {featured.description}
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={() => setSelectedMedia(featured)}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-bold flex items-center gap-3 shadow-lg shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="w-5 h-5 fill-current" /> Watch Trailer
                  </button>

                  <button
                    onClick={(e) => toggleWatchlist(featured.id, e)}
                    className={`px-6 py-4 rounded-xl border font-semibold flex items-center gap-2.5 transition-all ${
                      watchlist.includes(featured.id)
                        ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {watchlist.includes(featured.id) ? (
                      <>
                        <Check className="w-5 h-5" /> In Watchlist
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" /> Add to Watchlist
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedMedia(featured)}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 hover:bg-slate-800 transition-all"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Catalog Grid / Rows */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              {activeTab === 'home' && <Flame className="w-6 h-6 text-rose-500" />}
              {activeTab === 'movies' && <Film className="w-6 h-6 text-indigo-500" />}
              {activeTab === 'series' && <Tv className="w-6 h-6 text-purple-500" />}
              {activeTab === 'watchlist' && <Heart className="w-6 h-6 text-rose-500" />}
              
              {activeTab === 'home' && (searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Now')}
              {activeTab === 'movies' && 'Blockbuster Movies'}
              {activeTab === 'series' && 'Binge-Worthy Series'}
              {activeTab === 'watchlist' && 'My Watchlist'}
            </h2>
            <span className="text-sm text-slate-400 font-medium">
              {filteredMedia.length} titles available
            </span>
          </div>

          {filteredMedia.length === 0 ? (
            <div className="text-center py-24 space-y-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <Compass className="w-12 h-12 text-slate-500 mx-auto animate-spin" />
              <h3 className="text-lg font-bold text-slate-300">No titles found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find anything matching your criteria. Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className="group relative bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-rose-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-xl flex flex-col"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.bannerUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-slate-200 border border-white/10 uppercase">
                        {item.type}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                        {item.matchScore}% Match
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleWatchlist(item.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                        watchlist.includes(item.id)
                          ? 'bg-rose-600 text-white'
                          : 'bg-black/60 text-slate-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {watchlist.includes(item.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/50 scale-75 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-rose-400">{item.rating}</span>
                        <span>{item.duration} • {item.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
                      {item.genre.map((g, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded font-medium">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Media Details / Player Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <button
              onClick={() => {
                setSelectedMedia(null);
                setIsPlaying(false);
              }}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-slate-300 hover:text-white border border-white/10 hover:bg-black/80 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Video Player Simulator */}
            <div className="relative aspect-video w-full bg-black">
              {isPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-rose-600/20 border border-rose-500/50 flex items-center justify-center animate-pulse">
                    <Play className="w-8 h-8 text-rose-500 fill-current ml-1" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Streaming {selectedMedia.title}</h4>
                    <p className="text-xs text-slate-400">High Definition 4K Ultra HDR • Dolby Atmos 7.1</p>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-sm font-semibold hover:bg-slate-700 transition-all flex items-center gap-2"
                    >
                      <Pause className="w-4 h-4" /> Pause Player
                    </button>
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-sm font-semibold hover:bg-slate-700 transition-all flex items-center gap-2"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      {isMuted ? 'Muted' : 'Volume: 100%'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={selectedMedia.bannerUrl}
                    alt={selectedMedia.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl shadow-rose-600/50 hover:scale-110 active:scale-95 transition-all"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Modal Content Info */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-rose-600/20 text-rose-400 text-xs font-bold border border-rose-500/30">
                      {selectedMedia.rating}
                    </span>
                    <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" /> {selectedMedia.matchScore}% Match
                    </span>
                    <span className="text-slate-400 text-sm">{selectedMedia.year}</span>
                    <span className="text-slate-400 text-sm">{selectedMedia.duration}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white pt-2">{selectedMedia.title}</h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleWatchlist(selectedMedia.id, e)}
                    className={`px-5 py-3 rounded-xl border font-semibold flex items-center gap-2 transition-all ${
                      watchlist.includes(selectedMedia.id)
                        ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {watchlist.includes(selectedMedia.id) ? (
                      <>
                        <Check className="w-4 h-4" /> Watchlist
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Watchlist
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed">
                {selectedMedia.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-slate-400 mr-2">Genres:</span>
                {selectedMedia.genre.map((g, idx) => (
                  <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 font-medium">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#08090d] py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black tracking-wider text-white">CINEPULSE</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} CinePulse Streaming Inc. All rights reserved. Zero errors guaranteed.
          </p>
        </div>
      </footer>
    </div>
  );
}