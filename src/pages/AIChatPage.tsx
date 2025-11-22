import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../services/tmdb';

interface AIChatPageProps {
  onMovieClick: (id: number, mediaType: 'movie' | 'tv') => void;
}

export default function AIChatPage({ onMovieClick }: AIChatPageProps) {
  const [message, setMessage] = useState('');
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([]);

  const examplePrompts = [
    'Son 5 yılda çıkmış, IMDB 7 üzeri psikolojik gerilim öner',
    'Komedi filmleri öner, aile ile izlenebilecek',
    'Bilim kurgu dizileri, uzay temalı',
    'Klasik romantik filmler, 90\'lardan',
  ];

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setChatHistory((prev) => [...prev, { type: 'user', text: userMessage }]);
    setLoading(true);

    try {
      setChatHistory((prev) => [
        ...prev,
        {
          type: 'ai',
          text: 'AI öneri servisi demo modda çalışıyor. n8n webhook URL\'nizi yapılandırdıktan sonra gerçek AI önerileri alabilirsiniz. Şimdilik popüler filmlerden örnekler gösteriyorum...',
        },
      ]);

      setRecommendations([]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { type: 'ai', text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-red-600 to-purple-600 p-3 rounded-lg">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">AI Film Önerileri</h1>
            <p className="text-gray-400">Yapay zeka destekli kişisel öneri sistemi</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-white font-semibold mb-2">Nasıl Çalışır?</h2>
              <p className="text-gray-400 text-sm mb-4">
                AI asistanıma ne tür bir film veya dizi izlemek istediğinizi anlatın. Ruh
                halinize, tercihlerinize ve kriterlere göre size özel öneriler sunacağım.
              </p>
              <div className="space-y-2">
                <p className="text-gray-500 text-xs font-medium">Örnek sorular:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {examplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(prompt)}
                      className="text-left bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {chatHistory.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex gap-3 ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {chat.type === 'ai' && (
                  <div className="bg-red-600 p-2 rounded-full h-fit">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-4 rounded-lg ${
                    chat.type === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {chat.text}
                </div>
                {chat.type === 'user' && (
                  <div className="bg-gray-700 p-2 rounded-full h-fit">
                    <span className="text-white text-sm">👤</span>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-red-600 p-2 rounded-full h-fit">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 text-gray-300 p-4 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-900 rounded-lg p-4 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ne tür bir film/dizi arıyorsunuz?"
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !message.trim()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Gönder
            </button>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Önerilen İçerikler</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {recommendations.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => onMovieClick(movie.id, 'movie')}
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-900 rounded-lg p-6 mt-8">
          <h3 className="text-white font-semibold mb-3">n8n Entegrasyonu</h3>
          <p className="text-gray-400 text-sm mb-4">
            AI önerilerini aktif hale getirmek için n8n webhook URL'nizi .env dosyasındaki
            VITE_N8N_WEBHOOK_URL değişkenine ekleyin.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <code className="text-green-400 text-xs">
              VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/movie-recommender
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
