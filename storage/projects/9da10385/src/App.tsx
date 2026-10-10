import React, { useState } from 'react';
import { 
  Play, 
  Search, 
  Bell, 
  ChevronDown, 
  Star, 
  Heart, 
  Flame, 
  Zap, 
  Shield, 
  TrendingUp, 
  Film, 
  Tv, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  SkipForward, 
  X, 
  Check, 
  Plus,
  Info,
  SlidersHorizontal,
  Compass,
  Bookmark
} from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  category: string;
  rating: number;
  match: number;
  duration: string;
  year: number;
  description: string;
  banner: string;
  poster: string;
  tags: string[];
}

const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Quantum Paradox",
    category: "Sci-Fi",
    rating: 4.9,
    match: 98,
    duration: "2h 28m",
    year: 2024,
    description: "When a brilliant physicist inadvertently punctures the fabric of spacetime, she must navigate through parallel realities to prevent total annihilation.",
    banner: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=1600",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600",
    tags: ["Mind-Bending", "Action", "Time Travel"]
  },
  {
    id: 2,
    title: "Cyber Neon Tokyo",
    category: "Action",
    rating: 4.7,
    match: 95,
    duration: "1h 54m",
    year: 2024,
    description: "In the neon-drenched underworld of 2104 Tokyo, an augmented bounty hunter uncovers a corporate conspiracy that threatens human consciousness.",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1600",
    poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    tags: ["Cyberpunk", "Thriller", "Dystopian"]
  },
  {
    id: 3,
    title: "The Silent Peak",
    category: "Documentary",
    rating: 4.8,
    match: 92,
    duration: "1h 35m",
    year: 2023,
    description: "An awe-inspiring cinematic journey alongside elite mountaineers attempting the first winter ascent of K2 without supplemental oxygen.",
    banner: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600",
    poster: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=600",
    tags: ["Nature", "Survival", "Inspiring"]
  },
  {
    id: 4,
    title: "Midnight Symphony",
    category: "Drama",
    rating: 4.6,
    match: 89,
    duration: "2h 05m",
    year: 2023,
    description: "An aging maestro struggles to compose his final symphony while reconciling with estranged family members in the heart of Vienna.",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1600",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
    tags: ["Emotional", "Music", "Heartwarming"]
  },
  {
    id: 5,
    title: "Shadow Syndicate",
    category: "Action",
    rating: 4.9,
    match: 97,
    duration: "2h 15m",
    year: 2024,
    description: "Betrayed by their own agency, a clandestine group of operatives executes an elaborate global heist to expose corrupted state secrets.",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600",
    poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    tags: ["High Stakes", "Espionage", "Fast-Paced"]
  },
  {
    id: 6,
    title: "Beyond the Nebula",
    category: "Sci-Fi",
    rating: 4.8,
    match: 94,
    duration: "2h 40m",
    year: 2024,
    description: "The crew of humanity&apos;s first faster-than-light vessel stumbles upon an ancient alien megastructure guarding the secrets of creation.",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
    poster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=600",
    tags: ["Space Exploration", "Epic", "Mystery"]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'movies' | 'series' | 'watchlist'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [watchlist, setWatchlist] = useState<number[]>([1, 4]);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [heroIndex, setHeroIndex] = useState<number>(0);

  const categories = ['All', 'Sci-Fi', 'Action', 'Documentary', 'Drama'];

  const filteredMovies = MOVIES.filter(movie => {
    const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'watchlist') {
      return watchlist.includes(movie.id) && matchesSearch;
    }
    return matchesCategory && matchesSearch;
  });

  const toggleWatchlist = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const currentHero = MOVIES[heroIndex];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#08090d]/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              STREAMPULSE
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'home' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('movies')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'movies' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              Movies
            </button>
            <button 
              onClick={() => setActiveTab('series')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'series' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              Series & TV
            </button>
            <button 
              onClick={() => setActiveTab('watchlist')}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all ${activeTab === 'watchlist' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Watchlist</span>
              {watchlist.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-indigo-600 text-white rounded-full">
                  {watchlist.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search titles, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button className="relative p-2 rounded-full bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
          </button>

          <div className="flex items-center space-x-3 pl-2 border-l border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/50"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'home' && searchQuery === '' && (
        <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src={currentHero.banner} 
              alt={currentHero.title}
              className="w-full h-full object-cover filter brightness-75 scale-105 animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090d] via-[#08090d]/60 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-3xl px-8 md:px-16 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5" />
                <span>#{heroIndex + 1} Spotlight Today</span>
              </span>
              <span className="text-emerald-400 font-bold text-sm">{currentHero.match}% Match</span>
              <span className="text-slate-300 text-sm">{currentHero.year}</span>
              <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-slate-300 border border-white/10">{currentHero.duration}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
              {currentHero.title}
            </h1>

            <p className="text-slate-300 text-base md:text-lg line-clamp-3 max-w-2xl leading-relaxed">
              {currentHero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => { setActiveMovie(currentHero); setIsPlaying(true); }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold flex items-center space-x-3 shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Play Now</span>
              </button>

              <button 
                onClick={() => setActiveMovie(currentHero)}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center space-x-2 backdrop-blur-md border border-white/10 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </button>

              <button 
                onClick={(e) => toggleWatchlist(currentHero.id, e)}
                className={`p-3.5 rounded-xl backdrop-blur-md border transition-all duration-200 hover:scale-105 ${watchlist.includes(currentHero.id) ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300' : 'bg-white/10 border-white/10 text-white hover:bg-white/20'}`}
              >
                {watchlist.includes(currentHero.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>

            {/* Hero Carousel Navigation Dots */}
            <div className="flex items-center space-x-2 pt-4">
              {MOVIES.slice(0, 4).map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setHeroIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${heroIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalog & Filter Section */}
      <main className="max-w-7xl mx-auto px-6 mt-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
              {activeTab === 'watchlist' ? (
                <>
                  <Bookmark className="w-6 h-6 text-indigo-400" />
                  <span>My Watchlist</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-6 h-6 text-indigo-400" />
                  <span>Trending & Popular</span>
                </>
              )}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {activeTab === 'watchlist' ? 'Saved titles for later viewing' : 'Handpicked cinematic masterpieces for you'}
            </p>
          </div>

          {activeTab !== 'watchlist' && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400">
              <Film className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-white">No titles found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              We couldn&apos;t find any matches for your current search or filter criteria. Try adjusting your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredMovies.map(movie => (
              <div 
                key={movie.id}
                onClick={() => setActiveMovie(movie)}
                className="group relative bg-slate-900/60 rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={movie.banner} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-emerald-400 border border-white/10">
                      {movie.match}% Match
                    </span>
                    <button 
                      onClick={(e) => toggleWatchlist(movie.id, e)}
                      className={`p-2 rounded-full backdrop-blur-md border transition-all ${watchlist.includes(movie.id) ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-black/60 border-white/10 text-slate-300 hover:text-white'}`}
                    >
                      {watchlist.includes(movie.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20 backdrop-blur-md text-white">
                      {movie.category}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{movie.duration}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {movie.title}
                      </h3>
                      <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{movie.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {movie.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1">
                      {movie.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveMovie(movie); setIsPlaying(true); }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Movie Detail & Player Modal */}
      {activeMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <button 
              onClick={() => { setActiveMovie(null); setIsPlaying(false); }}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isPlaying ? (
              <div className="relative aspect-video bg-black flex flex-col items-center justify-center">
                <div className="absolute inset-0 z-0">
                  <img src={activeMovie.banner} alt={activeMovie.title} className="w-full h-full object-cover opacity-50 blur-sm" />
                </div>
                <div className="relative z-10 text-center space-y-4 p-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-indigo-600/80 flex items-center justify-center animate-pulse shadow-xl shadow-indigo-600/50">
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Streaming &quot;{activeMovie.title}&quot;</h3>
                  <p className="text-slate-400 text-sm">Enjoy your cinematic experience in 4K Ultra HD Dolby Vision.</p>
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all"
                  >
                    Back to Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/9]">
                <img src={activeMovie.banner} alt={activeMovie.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      {activeMovie.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">{activeMovie.title}</h2>
                  </div>
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center space-x-3 shadow-xl shadow-indigo-600/40 transition-transform hover:scale-105 active:scale-95"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>Play Movie</span>
                  </button>
                </div>
              </div>
            )}

            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{activeMovie.rating} / 5.0</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-sm">{activeMovie.match}% Match</span>
                  <span className="text-slate-400 text-sm">{activeMovie.year}</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-slate-300">{activeMovie.duration}</span>
                </div>

                <button 
                  onClick={(e) => toggleWatchlist(activeMovie.id, e)}
                  className={`px-4 py-2 rounded-xl border text-sm font-semibold flex items-center space-x-2 transition-all ${watchlist.includes(activeMovie.id) ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300' : 'bg-white/10 border-white/10 text-white hover:bg-white/20'}`}
                >
                  {watchlist.includes(activeMovie.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{watchlist.includes(activeMovie.id) ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </button>
              </div>

              <p className="text-slate-300 text-base leading-relaxed">
                {activeMovie.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tags & Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {activeMovie.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-slate-300">
                      {tag}
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