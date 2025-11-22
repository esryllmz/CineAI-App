import { useEffect, useState } from 'react';
import { tmdbApi, MovieDetails, Movie, getImageUrl, getTrailerUrl } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Star, Clock, Calendar, ArrowLeft } from 'lucide-react';

interface DetailPageProps {
  movieId: number;
  mediaType: 'movie' | 'tv';
  onMovieClick: (id: number, mediaType: 'movie' | 'tv') => void;
  onBack: () => void;
}

export default function DetailPage({ movieId, mediaType, onMovieClick, onBack }: DetailPageProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [details, similarMovies] = await Promise.all([
          tmdbApi.getDetails(movieId, mediaType),
          tmdbApi.getSimilar(movieId, mediaType),
        ]);
        setMovie(details);
        setSimilar(similarMovies.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId, mediaType]);

  if (loading || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

  const title = movie.title || movie.name || '';
  const releaseDate = movie.release_date || movie.first_air_date || '';
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const trailerUrl = getTrailerUrl(movie.videos);

  return (
    <div className="min-h-screen bg-black">
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path || movie.poster_path, 'original')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 bg-black/80 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Geri
        </button>

        <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
          <div className="flex gap-8 items-end max-w-7xl">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={title}
              className="w-64 rounded-lg shadow-2xl hidden md:block"
            />
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-yellow-500 px-3 py-1 rounded-lg">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                </div>
                {year && (
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5" />
                    <span>{year}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5" />
                    <span>{movie.runtime} dakika</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-lg text-gray-300 max-w-3xl">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {movie.credits && movie.credits.cast.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Oyuncular</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.credits.cast.slice(0, 6).map((actor) => (
                <div key={actor.id} className="text-center">
                  {actor.profile_path ? (
                    <img
                      src={getImageUrl(actor.profile_path)}
                      alt={actor.name}
                      className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                  )}
                  <p className="text-white font-medium">{actor.name}</p>
                  <p className="text-gray-400 text-sm">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {trailerUrl && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Fragman</h2>
            <div className="aspect-video max-w-4xl">
              <iframe
                src={trailerUrl}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title="Trailer"
              />
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Benzer İçerikler</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {similar.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                  onClick={() => onMovieClick(item.id, mediaType)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
