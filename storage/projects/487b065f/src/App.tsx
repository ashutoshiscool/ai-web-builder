import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  Search, 
  Bell, 
  ChevronDown, 
  Check, 
  Plus, 
  ThumbsUp, 
  Volume2, 
  VolumeX, 
  X, 
  ArrowLeft, 
  Sun,
  Moon,
  ShieldCheck,
  RotateCcw,
  SkipForward,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

// --- Types ---
interface Movie {
  id: string;
  title: string;
  description: string;
  backdropUrl: string;
  posterUrl: string;
  match: number;
  maturity: string;
  duration?: string;
  seasons?: number;
  genres: string[];
  cast: string[];
  isOriginal?: boolean;
  isTrending?: boolean;
}

interface Profile {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  plan?: string;
}

// --- Mock Data ---
const PROFILES: Profile[] = [
  { id: '1', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80', email: 'alex.dev@checkpoint.io', plan: 'Premium 4K Ultra HD' },
  { id: '2', name: 'Kids', avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=300&auto=format&fit=crop&q=80', email: 'kids.mode@checkpoint.io', plan: 'Standard' },
  { id: '3', name: 'Guest', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', email: 'guest@checkpoint.io', plan: 'Basic' },
];

const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    backdropUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80',
    match: 98,
    maturity: '16+',
    seasons: 4,
    genres: ['Sci-Fi', 'Horror', 'Drama'],
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
    isOriginal: true,
    isTrending: true,
  },
  {
    id: '2',
    title: 'Cyberpunk: Edgerunners',
    description: 'In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become an edgerunner: a mercenary outlaw.',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    match: 95,
    maturity: '18+',
    seasons: 1,
    genres: ['Anime', 'Sci-Fi', 'Action'],
    cast: ['KENN', 'Aoi Yuki', 'Hiroki Touchi'],
    isOriginal: true,
    isTrending: true,
  },
  {
    id: '3',
    title: 'Extraction II',
    description: 'Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission: saving the imprisoned family of a ruthless gangster.',
    backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    match: 92,
    maturity: '18+',
    duration: '2h 3m',
    genres: ['Action', 'Thriller'],
    cast: ['Chris Hemsworth', 'Golshifteh Farahani', 'Adam Bessa'],
    isTrending: true,
  },
  {
    id: '4',
    title: "The Queen's Gambit",
    description: 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.',
    backdropUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80',
    match: 97,
    maturity: '15+',
    seasons: 1,
    genres: ['Drama', 'Miniseries'],
    cast: ['Anya Taylor-Joy', 'Bill Camp', 'Marielle Heller'],
    isOriginal: true,
  },
  {
    id: '5',
    title: 'Interstellar Odyssey',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    match: 94,
    maturity: '13+',
    duration: '2h 49m',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
  },
  {
    id: '6',
    title: 'Dark Horizon',
    description: 'Deep beneath the oceanic trench, a team of marine biologists uncovers an ancient civilization that was never meant to be disturbed.',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    match: 89,
    maturity: '16+',
    duration: '1h 58m',
    genres: ['Thriller', 'Mystery', 'Sci-Fi'],
    cast: ['Tom Hardy', 'Emily Blunt', 'Mark Strong'],
    isOriginal: true,
  },
  {
    id: '7',
    title: 'The Witcher',
    description: 'Geralt of Rivia, a mutated monster hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
    backdropUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1600&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&auto=format&fit=crop&q=80',
    match: 91,
    maturity: '18+',
    seasons: 3,
    genres: ['Fantasy', 'Action', 'Adventure'],
    cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'],
    isOriginal: true,
    isTrending: true,
  }
];

export default function App() {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(PROFILES[0]);
  const [activeTab, setActiveTab] = useState<'home' | 'tv' | 'movies' | 'new' | 'list' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [myList, setMyList] = useState<string[]>(['1', '3']);
  const [isMuted, setIsMuted] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Handle Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMyList = (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (myList.includes(movieId)) {
      setMyList(myList.filter(id => id !== movieId));
    } else {
      setMyList([...myList, movieId]);
    }
  };

  // If no profile selected, render Profile Switcher
  if (!currentProfile) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#141414] text-white' : 'bg-zinc-100 text-zinc-900'} flex flex-col items-center justify-center p-6 select-none font-sans transition-colors duration-300`}>
        <div className="absolute top-6 right-6 flex items-center space-x-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/10 text-red-500 border border-red-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CHECKPOINT V2.5</span>
          </span>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full border ${isDarkMode ? 'border-zinc-700 bg-zinc-800 text-yellow-400' : 'border-zinc-300 bg-white text-zinc-700'} transition`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <h1 className="text-red-600 font-bold text-4xl md:text-5xl tracking-widest mb-2 uppercase">NETFLIX</h1>
        <h2 className="text-3xl md:text-4xl font-medium mb-8 text-center">Who's watching?</h2>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {PROFILES.map((profile) => (
            <div 
              key={profile.id}
              onClick={() => setCurrentProfile(profile)}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition duration-200 shadow-xl">
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-200" />
              </div>
              <span className="mt-3 text-zinc-400 group-hover:text-white text-lg transition duration-200 font-medium">
                {profile.name}
              </span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`border ${isDarkMode ? 'border-zinc-600 text-zinc-400 hover:border-white hover:text-white' : 'border-zinc-400 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900'} px-6 py-2 tracking-widest text-sm transition uppercase rounded`}
        >
          Manage Profiles
        </button>
      </div>
    );
  }

  // Filter movies based on active tab and search query
  const filteredMovies = MOVIES.filter(movie => {
    if (searchQuery) {
      return movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             movie.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (activeTab === 'tv') return movie.seasons !== undefined;
    if (activeTab === 'movies') return movie.seasons === undefined;
    if (activeTab === 'new') return movie.isTrending;
    if (activeTab === 'list') return myList.includes(movie.id);
    return true;
  });

  const featuredMovie = MOVIES[0];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#141414] text-white' : 'bg-zinc-50 text-zinc-900'} font-sans selection:bg-red-600 selection:text-white relative pb-20 transition-colors duration-300`}>
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? (isDarkMode ? 'bg-[#141414]/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-md') : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'}`}>
        <div className="flex items-center space-x-6">
          <span 
            onClick={() => { setActiveTab('home'); setSearchQuery(''); }}
            className="text-red-600 font-black text-2xl md:text-3xl tracking-tighter cursor-pointer"
          >
            NETFLIX
          </span>
          <ul className={`hidden md:flex items-center space-x-5 text-sm ${isScrolled || isDarkMode ? 'text-zinc-300' : 'text-zinc-200'} font-medium`}>
            <li 
              onClick={() => { setActiveTab('home'); setSearchQuery(''); }}
              className={`cursor-pointer transition hover:text-white ${activeTab === 'home' && !searchQuery ? 'text-white font-bold' : ''}`}
            >
              Home
            </li>
            <li 
              onClick={() => { setActiveTab('tv'); setSearchQuery(''); }}
              className={`cursor-pointer transition hover:text-white ${activeTab === 'tv' && !searchQuery ? 'text-white font-bold' : ''}`}
            >
              TV Shows
            </li>
            <li 
              onClick={() => { setActiveTab('movies'); setSearchQuery(''); }}
              className={`cursor-pointer transition hover:text-white ${activeTab === 'movies' && !searchQuery ? 'text-white font-bold' : ''}`}
            >
              Movies
            </li>
            <li 
              onClick={() => { setActiveTab('new'); setSearchQuery(''); }}
              className={`cursor-pointer transition hover:text-white ${activeTab === 'new' && !searchQuery ? 'text-white font-bold' : ''}`}
            >
              New & Popular
            </li>
            <li 
              onClick={() => { setActiveTab('list'); setSearchQuery(''); }}
              className={`cursor-pointer transition hover:text-white ${activeTab === 'list' && !searchQuery ? 'text-white font-bold' : ''}`}
            >
              My List
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {/* Checkpoint Badge */}
          <span className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/10 text-red-500 border border-red-500/20 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CHECKPOINT V2.5</span>
          </span>

          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full border ${isDarkMode ? 'border-zinc-700 bg-zinc-800 text-yellow-400' : 'border-zinc-300 bg-white text-zinc-700'} transition shadow-sm`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Search Bar */}
          <div className={`flex items-center bg-black/40 border rounded px-2 py-1 transition-all duration-300 ${isSearchOpen || searchQuery ? 'border-white w-52 md:w-64' : 'border-transparent w-9'}`}>
            <Search 
              className="w-5 h-5 text-white cursor-pointer flex-shrink-0" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <input 
              type="text" 
              placeholder="Titles, people, genres" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm ml-2 outline-none w-full text-white placeholder-zinc-400"
            />
            {searchQuery && (
              <X className="w-4 h-4 text-zinc-400 cursor-pointer" onClick={() => setSearchQuery('')} />
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <Bell 
              className="w-5 h-5 cursor-pointer text-zinc-300 hover:text-white transition" 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            />
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-[#181818] border border-zinc-800 rounded shadow-2xl py-2 z-50 text-white">
                <div className="px-4 py-2 border-b border-zinc-800 font-semibold text-sm">Notifications</div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="flex items-center space-x-3 px-4 py-3 hover:bg-zinc-800/50 cursor-pointer transition">
                    <img src={MOVIES[0].posterUrl} className="w-12 h-16 object-cover rounded" alt="Notification" />
                    <div>
                      <p className="text-xs font-semibold">New Episode Available</p>
                      <p className="text-[11px] text-zinc-400">Stranger Things Season 4 is now trending.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 px-4 py-3 hover:bg-zinc-800/50 cursor-pointer transition">
                    <img src={MOVIES[1].posterUrl} className="w-12 h-16 object-cover rounded" alt="Notification" />
                    <div>
                      <p className="text-xs font-semibold">Added to your List</p>
                      <p className="text-[11px] text-zinc-400">Cyberpunk: Edgerunners is ready to watch.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" onMouseLeave={() => setProfileMenuOpen(false)}>
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onMouseEnter={() => setProfileMenuOpen(true)}
            >
              <img src={currentProfile.avatar} alt="Avatar" className="w-8 h-8 rounded object-cover" />
              <ChevronDown className={`w-4 h-4 text-zinc-300 transition duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
            </div>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-black/95 border border-zinc-800 rounded shadow-2xl py-2 z-50 text-sm text-white">
                {PROFILES.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => setCurrentProfile(p)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-zinc-800/60 cursor-pointer transition"
                  >
                    <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded object-cover" />
                    <span className="hover:underline">{p.name}</span>
                  </div>
                ))}
                <div className="border-t border-zinc-800 my-2"></div>
                <div 
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-zinc-800/60 cursor-pointer transition text-zinc-200"
                >
                  <Settings className="w-4 h-4" />
                  <span>Account & Profile</span>
                </div>
                <div 
                  onClick={() => setCurrentProfile(null)}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-zinc-800/60 cursor-pointer transition text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out of Netflix</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- CONTENT AREA --- */}
      <div className="pt-24 md:pt-28 px-4 md:px-12 space-y-10">
        {activeTab === 'profile' ? (
          /* USER PROFILE & ACCOUNT PAGE */
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Account & Profile</h1>
                <p className="text-zinc-400 text-sm mt-1">Manage your active profile settings, billing, and streaming preferences.</p>
              </div>
              <button 
                onClick={() => setActiveTab('home')}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded text-sm font-semibold transition"
              >
                Back to Browse
              </button>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-[#181818] border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 shadow-xl">
              <img src={currentProfile.avatar} alt={currentProfile.name} className="w-28 h-28 rounded-lg object-cover shadow-md border-2 border-zinc-700" />
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <h2 className="text-2xl font-bold">{currentProfile.name}'s Profile</h2>
                  <span className="inline-block mt-2 md:mt-0 bg-red-600/20 text-red-500 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold">
                    {currentProfile.plan || 'Premium 4K Ultra HD'}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm">Email: <span className="text-zinc-200">{currentProfile.email || 'alex.dev@checkpoint.io'}</span></p>
                <p className="text-zinc-400 text-sm">Maturity Rating: <span className="text-emerald-400 font-semibold">All Maturity Levels (18+)</span></p>
                <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition shadow">
                    Change Password
                  </button>
                  <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded text-sm font-semibold transition">
                    Download Activity Log
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Settings Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#181818] border border-zinc-800 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-red-500" />
                  <span>Playback Settings</span>
                </h3>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center justify-between py-2 border-b border-zinc-800/60">
                    <span>Autoplay next episode</span>
                    <input type="checkbox" defaultChecked className="accent-red-600 w-4 h-4 cursor-pointer" />
                  </li>
                  <li className="flex items-center justify-between py-2 border-b border-zinc-800/60">
                    <span>Autoplay previews while browsing</span>
                    <input type="checkbox" defaultChecked className="accent-red-600 w-4 h-4 cursor-pointer" />
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <span>Data usage per screen</span>
                    <span className="text-xs bg-zinc-800 px-2.5 py-1 rounded text-zinc-300 font-mono">Automatic (4K)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#181818] border border-zinc-800 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-red-500" />
                  <span>Help & Security</span>
                </h3>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="hover:text-white cursor-pointer py-1.5 transition flex items-center justify-between">
                    <span>Manage streaming devices</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </li>
                  <li className="hover:text-white cursor-pointer py-1.5 transition flex items-center justify-between">
                    <span>Sign out of all devices</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </li>
                  <li className="hover:text-white cursor-pointer py-1.5 transition flex items-center justify-between">
                    <span>Privacy and data settings</span>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : searchQuery ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Explore titles related to: <span className="text-red-500">"{searchQuery}"</span>
            </h2>
            {filteredMovies.length === 0 ? (
              <p className="text-zinc-400 py-12">No movies or TV shows found matching your query.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMovies.map(movie => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onSelect={(m) => setSelectedMovie(m)}
                    onPlay={(m) => setPlayingMovie(m)}
                    isSaved={myList.includes(movie.id)}
                    onToggleList={toggleMyList}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'list' ? (
          <div className="space-y-4 min-h-[60vh]">
            <h2 className="text-2xl font-bold">My List</h2>
            {filteredMovies.length === 0 ? (
              <p className="text-zinc-400 py-12">You haven't added any titles to your list yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMovies.map(movie => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onSelect={(m) => setSelectedMovie(m)}
                    onPlay={(m) => setPlayingMovie(m)}
                    isSaved={myList.includes(movie.id)}
                    onToggleList={toggleMyList}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* HERO BANNER */}
            <div className="relative h-[70vh] md:h-[80vh] w-full rounded-xl overflow-hidden shadow-2xl select-none mb-12">
              <div className="absolute inset-0">
                <img 
                  src={featuredMovie.backdropUrl} 
                  alt={featuredMovie.title} 
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-black/50 to-transparent w-full md:w-2/3"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/60"></div>
              </div>

              <div className="absolute bottom-[15%] left-6 md:left-12 max-w-xl space-y-4 z-10">
                <div className="flex items-center space-x-2">
                  <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest">N SERIES</span>
                  <span className="text-zinc-300 font-bold tracking-widest text-xs uppercase">Featured Today</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg text-white">
                  {featuredMovie.title}
                </h1>

                <p className="text-zinc-200 text-sm md:text-base line-clamp-3 drop-shadow">
                  {featuredMovie.description}
                </p>

                <div className="flex items-center space-x-4 pt-2">
                  <button 
                    onClick={() => setPlayingMovie(featuredMovie)}
                    className="flex items-center bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded font-bold hover:bg-zinc-200 transition space-x-2 shadow-lg cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-black" />
                    <span>Play</span>
                  </button>

                  <button 
                    onClick={() => setSelectedMovie(featuredMovie)}
                    className="flex items-center bg-zinc-600/70 text-white px-6 md:px-8 py-2.5 md:py-3 rounded font-bold hover:bg-zinc-600/50 transition space-x-2 backdrop-blur-md cursor-pointer"
                  >
                    <Info className="w-5 h-5" />
                    <span>More Info</span>
                  </button>
                </div>
              </div>

              <div className="absolute bottom-[20%] right-8 hidden md:flex items-center space-x-3 z-10">
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="p-2.5 rounded-full border border-zinc-500 bg-black/40 hover:bg-black/60 text-white backdrop-blur transition cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="border-l-2 border-zinc-400 pl-3 py-1 bg-black/40 backdrop-blur px-4 rounded-r text-sm font-semibold text-white">
                  {featuredMovie.maturity}
                </div>
              </div>
            </div>

            {/* ROWS */}
            <MovieRow 
              title="Trending Now" 
              movies={MOVIES.filter(m => m.isTrending)} 
              onSelect={setSelectedMovie} 
              onPlay={setPlayingMovie}
              myList={myList}
              toggleMyList={toggleMyList}
            />
            
            <MovieRow 
              title="Netflix Originals" 
              movies={MOVIES.filter(m => m.isOriginal)} 
              onSelect={setSelectedMovie} 
              onPlay={setPlayingMovie}
              myList={myList}
              toggleMyList={toggleMyList}
            />

            <MovieRow 
              title="Sci-Fi & Thrillers" 
              movies={MOVIES.filter(m => m.genres.includes('Sci-Fi') || m.genres.includes('Thriller'))} 
              onSelect={setSelectedMovie} 
              onPlay={setPlayingMovie}
              myList={myList}
              toggleMyList={toggleMyList}
            />

            <MovieRow 
              title="Action Packed" 
              movies={MOVIES.filter(m => m.genres.includes('Action') || m.genres.includes('Adventure'))} 
              onSelect={setSelectedMovie} 
              onPlay={setPlayingMovie}
              myList={myList}
              toggleMyList={toggleMyList}
            />
          </>
        )}
      </div>

      {/* --- MOVIE DETAIL MODAL --- */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#181818] text-white w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl relative border border-zinc-800 animate-in fade-in zoom-in duration-200 my-8">
            <button 
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 z-20 bg-[#181818]/80 hover:bg-zinc-800 p-2 rounded-full text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Hero Banner */}
            <div className="relative h-72 md:h-96 w-full">
              <img src={selectedMovie.backdropUrl} alt={selectedMovie.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40"></div>
              
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md">{selectedMovie.title}</h2>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => { setPlayingMovie(selectedMovie); setSelectedMovie(null); }}
                    className="flex items-center bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-zinc-200 transition space-x-2 shadow cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-black" />
                    <span>Play</span>
                  </button>
                  <button 
                    onClick={(e) => toggleMyList(selectedMovie.id, e)}
                    className="p-2.5 rounded-full border border-zinc-600 bg-black/40 hover:border-white text-white transition cursor-pointer"
                  >
                    {myList.includes(selectedMovie.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                  <button className="p-2.5 rounded-full border border-zinc-600 bg-black/40 hover:border-white text-white transition cursor-pointer">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center space-x-3 text-sm font-semibold">
                  <span className="text-emerald-400 font-bold">{selectedMovie.match}% Match</span>
                  <span className="border border-zinc-600 px-1.5 py-0.5 text-xs rounded text-zinc-300">{selectedMovie.maturity}</span>
                  <span>{selectedMovie.seasons ? `${selectedMovie.seasons} Season${selectedMovie.seasons > 1 ? 's' : ''}` : selectedMovie.duration}</span>
                  <span className="border border-zinc-600 px-1 py-0.2 text-[10px] rounded text-zinc-400">HD</span>
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">{selectedMovie.description}</p>
              </div>

              <div className="space-y-3 text-xs md:text-sm text-zinc-400">
                <div>
                  <span className="text-zinc-500">Cast: </span>
                  <span className="text-zinc-200">{selectedMovie.cast.join(', ')}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Genres: </span>
                  <span className="text-zinc-200">{selectedMovie.genres.join(', ')}</span>
                </div>
                <div>
                  <span className="text-zinc-500">This show is: </span>
                  <span className="text-zinc-200">Suspenseful, Exciting, Sci-Fi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- VIDEO PLAYER SIMULATOR MODAL --- */}
      {playingMovie && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none animate-in fade-in duration-300">
          {/* Top Video Header */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-20">
            <button 
              onClick={() => setPlayingMovie(null)}
              className="flex items-center space-x-2 bg-black/50 hover:bg-black/80 text-white px-4 py-2 rounded transition border border-zinc-700 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold text-sm">Back</span>
            </button>
            <span className="text-lg font-bold tracking-wide text-white">{playingMovie.title}</span>
            <div className="w-16"></div>
          </div>

          {/* Central Simulated Video Content */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <img src={playingMovie.backdropUrl} alt={playingMovie.title} className="absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-90" />
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="z-10 text-center space-y-4 px-4">
              <div className="inline-flex items-center space-x-3 bg-red-600/90 text-white px-6 py-3 rounded-full font-bold shadow-2xl animate-pulse">
                <Play className="w-6 h-6 fill-white" />
                <span className="text-lg tracking-wider">PLAYING STREAM...</span>
              </div>
              <p className="text-zinc-300 text-sm">Simulating Netflix 4K HDR playback experience.</p>
            </div>
          </div>

          {/* Bottom Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent space-y-3 z-20">
            <div className="w-full bg-zinc-700 h-1.5 rounded-full cursor-pointer relative overflow-hidden group">
              <div className="bg-red-600 h-full w-1/3 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition"></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-zinc-300">
              <div className="flex items-center space-x-4">
                <button className="hover:text-white transition cursor-pointer"><Play className="w-6 h-6 fill-current" /></button>
                <button className="hover:text-white transition cursor-pointer"><RotateCcw className="w-5 h-5" /></button>
                <button className="hover:text-white transition cursor-pointer"><SkipForward className="w-5 h-5" /></button>
                <button className="hover:text-white transition cursor-pointer" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <span className="text-xs font-mono">14:20 / {playingMovie.duration || '45:00'}</span>
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-xs border border-zinc-600 px-2 py-1 rounded hover:border-white transition cursor-pointer">Audio & Subtitles</button>
                <button className="text-xs border border-zinc-600 px-2 py-1 rounded hover:border-white transition cursor-pointer">Episodes</button>
                <button className="hover:text-white transition cursor-pointer"><Maximize2 className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="mt-24 border-t border-zinc-800 py-12 px-6 md:px-12 text-zinc-500 text-xs max-w-6xl mx-auto space-y-6">
        <div className="flex space-x-6 text-zinc-400">
          <span className="cursor-pointer hover:underline">Audio Description</span>
          <span className="cursor-pointer hover:underline">Help Center</span>
          <span className="cursor-pointer hover:underline">Gift Cards</span>
          <span className="cursor-pointer hover:underline">Media Center</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <span className="cursor-pointer hover:underline">Investor Relations</span>
          <span className="cursor-pointer hover:underline">Jobs</span>
          <span className="cursor-pointer hover:underline">Terms of Use</span>
          <span className="cursor-pointer hover:underline">Privacy</span>
          <span className="cursor-pointer hover:underline">Legal Notices</span>
          <span className="cursor-pointer hover:underline">Cookie Preferences</span>
          <span className="cursor-pointer hover:underline">Corporate Information</span>
          <span className="cursor-pointer hover:underline">Contact Us</span>
        </div>
        <div className="pt-4 text-zinc-600">
          © 1997-2025 Netflix Clone, Inc. (Checkpoint Test App v2.5)
        </div>
      </footer>

    </div>
  );
}

// --- SUB-COMPONENTS ---

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  myList: string[];
  toggleMyList: (id: string, e: React.MouseEvent) => void;
}

function MovieRow({ title, movies, onSelect, onPlay, myList, toggleMyList }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const offset = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      rowRef.current.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3 group/row relative">
      <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">{title}</h2>
      
      <div className="relative group">
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white p-2 rounded-r opacity-0 group-hover/row:opacity-100 transition duration-300 h-28 md:h-36 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div 
          ref={rowRef}
          className="flex items-center space-x-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-2 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onSelect={onSelect} 
              onPlay={onPlay}
              isSaved={myList.includes(movie.id)}
              onToggleList={toggleMyList}
            />
          ))}
        </div>

        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white p-2 rounded-l opacity-0 group-hover/row:opacity-100 transition duration-300 h-28 md:h-36 flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  isSaved: boolean;
  onToggleList: (id: string, e: React.MouseEvent) => void;
}

function MovieCard({ movie, onSelect, onPlay, isSaved, onToggleList }: MovieCardProps) {
  return (
    <div 
      onClick={() => onSelect(movie)}
      className="flex-none w-48 md:w-60 h-28 md:h-36 rounded-md overflow-hidden relative group cursor-pointer shadow-lg transition duration-300 hover:scale-105 hover:z-20 bg-zinc-800"
    >
      <img src={movie.backdropUrl} alt={movie.title} className="w-full h-full object-cover" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-between p-3">
        <div className="flex items-center justify-end space-x-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition shadow cursor-pointer"
            title="Play"
          >
            <Play className="w-4 h-4 fill-black ml-0.5" />
          </button>
          <button 
            onClick={(e) => onToggleList(movie.id, e)}
            className="w-8 h-8 rounded-full bg-black/60 border border-zinc-500 text-white flex items-center justify-center hover:border-white transition shadow cursor-pointer"
            title={isSaved ? 'Remove from My List' : 'Add to My List'}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm line-clamp-1">{movie.title}</h3>
          <div className="flex items-center space-x-2 text-[11px] font-semibold text-zinc-300 mt-1">
            <span className="text-emerald-400">{movie.match}% Match</span>
            <span className="border border-zinc-600 px-1 text-[10px] rounded">{movie.maturity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
