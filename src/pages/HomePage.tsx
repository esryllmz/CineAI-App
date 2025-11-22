import { useEffect, useState } from 'react';
import { tmdbApi, Movie } from '../services/tmdb';
import HeroSlider from '../components/HeroSlider';
import MovieCard from '../components/MovieCard';
import { ChevronRight } from 'lucide-react';

interface HomePageProps {
  onMovieClick: (id: number, mediaType: 'movie' | 'tv') => void;
}

export default function HomePage({ onMovieClick }: HomePageProps) {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, movies, tvShows] = await Promise.all([
          tmdbApi.getTrending('movie', 'week'),
          tmdbApi.getPopular('movie', 1),
          tmdbApi.getPopular('tv', 1),
        ]);

        setTrendingMovies(trending.results.slice(0, 5));
        setPopularMovies(movies.results);
        setPopularTVShows(tvShows.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <HeroSlider movies={trendingMovies} onMovieClick={(id) => onMovieClick(id, 'movie')} />

      <div className="container mx-auto px-4 py-12 space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              Popüler Filmler
              <ChevronRight className="w-6 h-6 text-red-600" />
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => onMovieClick(movie.id, 'movie')}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              Popüler Diziler
              <ChevronRight className="w-6 h-6 text-red-600" />
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularTVShows.map((show) => (
              <MovieCard
                key={show.id}
                movie={show}
                onClick={() => onMovieClick(show.id, 'tv')}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
