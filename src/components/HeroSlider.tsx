import { useEffect, useState } from 'react';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie, getImageUrl } from '../services/tmdb';

interface HeroSliderProps {
  movies: Movie[];
  onMovieClick: (id: number) => void;
}

export default function HeroSlider({ movies, onMovieClick }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [movies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  if (!movies.length) return null;

  const currentMovie = movies[currentIndex];
  const title = currentMovie.title || currentMovie.name || '';

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </div>
      ))}

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 line-clamp-3">
              {currentMovie.overview}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => onMovieClick(currentMovie.id)}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <Play className="w-5 h-5 fill-current" />
                Play
              </button>
              <button
                onClick={() => onMovieClick(currentMovie.id)}
                className="flex items-center gap-2 bg-gray-600/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                <Info className="w-5 h-5" />
                More Info
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
