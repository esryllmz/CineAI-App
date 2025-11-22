import axios from 'axios';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export interface AIRecommendationRequest {
  message: string;
}

export interface AIRecommendationResponse {
  results: Array<{
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
  }>;
}

export const aiService = {
  getRecommendations: async (message: string): Promise<AIRecommendationResponse> => {
    try {
      const response = await axios.post(N8N_WEBHOOK_URL, {
        message,
      });
      return response.data;
    } catch (error) {
      console.error('AI recommendation error:', error);
      throw new Error('AI servisi şu anda kullanılamıyor');
    }
  },
};
