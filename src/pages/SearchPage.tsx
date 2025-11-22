import { useEffect, useState } from 'react';
import { tmdbApi, Movie } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Search } from 'lucide-react';

interface SearchPageProps {
  query: string;
  onMovieClick: (id: number, mediaType: 'movie' | 'tv') => void;
}

export default function SearchPage({ query, onMovieClick }: SearchPageProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'movie' | 'tv'>('movie');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const [movieResults, tvResults] = await Promise.all([
          tmdbApi.search(query, 'movie'),
          tmdbApi.search(query, 'tv'),
        ]);
        setMovies(movieResults.results);
        setTVShows(tvResults.results);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const displayItems = activeTab === 'movie' ? movies : tvShows;

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Search className="w-8 h-8 text-red-600" />
          <h1 className="text-4xl font-bold text-white">
            Arama sonuçları: <span className="text-red-600">"{query}"</span>
          </h1>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('movie')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'movie'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Filmler ({movies.length})
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'tv'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Diziler ({tvShows.length})
          </button>
        </div>

        {loading ? (
          <div className="text-white text-center py-12">Aranıyor...</div>
        ) : displayItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">Sonuç bulunamadı</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayItems.map((item) => (
              <MovieCard
                key={item.id}
                movie={item}
                onClick={() => onMovieClick(item.id, activeTab)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
