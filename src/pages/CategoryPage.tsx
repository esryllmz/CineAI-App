import { useEffect, useState } from 'react';
import { tmdbApi, Movie, GENRES } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import FilterSidebar from '../components/FilterSidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  onMovieClick: (id: number, mediaType: 'movie' | 'tv') => void;
}

export default function CategoryPage({ category, onMovieClick }: CategoryPageProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{ year?: number; minRating?: number }>({});

  const genreId = GENRES[category as keyof typeof GENRES];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await tmdbApi.discoverMovies({
          genre: genreId,
          page,
          ...filters,
        });
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreId, page, filters]);

  const handleFilterChange = (newFilters: { year?: number; minRating?: number }) => {
    setFilters(newFilters);
    setPage(1);
  };

  const categoryNames: Record<string, string> = {
    action: 'Aksiyon',
    comedy: 'Komedi',
    horror: 'Korku',
    romance: 'Romantik',
    'sci-fi': 'Bilim Kurgu',
    documentary: 'Belgesel',
    animation: 'Animasyon',
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          {categoryNames[category] || category.toUpperCase()} Filmleri
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-white text-center py-12">Yükleniyor...</div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={() => onMovieClick(movie.id, 'movie')}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Önceki
                  </button>

                  <span className="text-white">
                    Sayfa {page} / {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                  >
                    Sonraki
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
