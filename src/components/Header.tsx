import { Search, Film, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
}

export default function Header({ currentPage, onNavigate, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const categories = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'action', label: 'Aksiyon' },
    { id: 'comedy', label: 'Komedi' },
    { id: 'horror', label: 'Korku' },
    { id: 'romance', label: 'Romantik' },
    { id: 'sci-fi', label: 'Bilim Kurgu' },
    { id: 'ai-chat', label: 'AI Önerileri' },
    { id: 'about', label: 'Hakkımda' },
  ];

  return (
    <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Film className="w-8 h-8 text-red-600 group-hover:text-red-500 transition-colors" />
            <span className="text-2xl font-bold text-white hidden sm:block">CineAI</span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate(cat.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === cat.id
                    ? 'text-white border-b-2 border-red-600 pb-1'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Film veya dizi ara..."
                className="bg-gray-900 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-64"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </form>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <nav className="flex flex-col gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onNavigate(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm font-medium transition-colors ${
                    currentPage === cat.id ? 'text-red-600' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Film veya dizi ara..."
                  className="bg-gray-900 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-full"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
