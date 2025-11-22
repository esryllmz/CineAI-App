import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const GENRES = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  'sci-fi': 878,
  thriller: 53,
  war: 10752,
  western: 37,
};

export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  first_air_date?: string;
  genre_ids: number[];
  popularity: number;
  media_type?: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }>;
  };
  videos?: {
    results: Array<{
      key: string;
      site: string;
      type: string;
    }>;
  };
}

export const tmdbApi = {
  getTrending: async (mediaType: 'movie' | 'tv' = 'movie', timeWindow: 'day' | 'week' = 'week') => {
    const response = await axios.get(`${BASE_URL}/trending/${mediaType}/${timeWindow}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  },

  getPopular: async (mediaType: 'movie' | 'tv' = 'movie', page = 1) => {
    const response = await axios.get(`${BASE_URL}/${mediaType}/popular`, {
      params: { api_key: API_KEY, page },
    });
    return response.data;
  },

  discoverMovies: async (filters: {
    genre?: number;
    year?: number;
    minRating?: number;
    page?: number;
  }) => {
    const params: Record<string, string | number> = {
      api_key: API_KEY,
      sort_by: 'popularity.desc',
      page: filters.page || 1,
    };

    if (filters.genre) params.with_genres = filters.genre;
    if (filters.year) params.primary_release_year = filters.year;
    if (filters.minRating) params['vote_average.gte'] = filters.minRating;

    const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
    return response.data;
  },

  discoverTVShows: async (filters: {
    genre?: number;
    year?: number;
    minRating?: number;
    page?: number;
  }) => {
    const params: Record<string, string | number> = {
      api_key: API_KEY,
      sort_by: 'popularity.desc',
      page: filters.page || 1,
    };

    if (filters.genre) params.with_genres = filters.genre;
    if (filters.year) params.first_air_date_year = filters.year;
    if (filters.minRating) params['vote_average.gte'] = filters.minRating;

    const response = await axios.get(`${BASE_URL}/discover/tv`, { params });
    return response.data;
  },

  search: async (query: string, mediaType: 'movie' | 'tv' = 'movie', page = 1) => {
    const response = await axios.get(`${BASE_URL}/search/${mediaType}`, {
      params: { api_key: API_KEY, query, page },
    });
    return response.data;
  },

  getDetails: async (id: number, mediaType: 'movie' | 'tv' = 'movie') => {
    const response = await axios.get(`${BASE_URL}/${mediaType}/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'credits,videos,similar',
      },
    });
    return response.data;
  },

  getSimilar: async (id: number, mediaType: 'movie' | 'tv' = 'movie') => {
    const response = await axios.get(`${BASE_URL}/${mediaType}/${id}/similar`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  },
};

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  if (!path) return '';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getTrailerUrl = (videos?: MovieDetails['videos']) => {
  if (!videos?.results) return null;
  const trailer = videos.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
};
