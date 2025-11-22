import { Star } from 'lucide-react';
import { Movie, getImageUrl } from '../services/tmdb';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const title = movie.title || movie.name || '';
  const releaseDate = movie.release_date || movie.first_air_date || '';
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {movie.poster_path ? (
          <img
            src={getImageUrl(movie.poster_path)}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-600 text-4xl">🎬</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm line-clamp-3">{movie.overview}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">{year}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
