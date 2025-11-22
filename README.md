# CineAI - AI-Powered Movie & Series Recommendation App

Modern web uygulaması olarak geliştirilmiş, TMDB API ve AI entegrasyonu ile kişiselleştirilmiş film/dizi önerileri sunan platform.
Ekran Kaydı:[Ekran.zip](https://github.com/user-attachments/files/23691548/Ekran.zip)


## Özellikler

### Ana Sayfa
- Hero Slider ile trend filmler
- Popüler filmler ve diziler listesi
- Responsive grid tasarım

### Kategori Sayfaları
- Aksiyon, Komedi, Korku, Romantik, Bilim Kurgu, Belgesel, Animasyon
- Gelişmiş filtreleme (Yıl, Minimum Puan)
- Sayfalama desteği

### Arama
- Film ve dizi arama
- Tab bazlı sonuç gösterimi
- Gerçek zamanlı sonuçlar

### Detay Sayfası
- Film/dizi detayları
- Oyuncu kadrosu
- Fragman (YouTube embed)
- Benzer içerik önerileri

### AI Chat Önerileri
- n8n webhook entegrasyonu
- Yapay zeka destekli film önerileri
- Örnek prompt'lar
- Kişiselleştirilmiş sonuçlar

### Hakkımda
- Geliştirici profili (Esra Yılmaz)
- Teknik yetenekler
- Projeler
- İletişim bilgileri

## Teknolojiler

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **API:** TMDB (The Movie Database)
- **AI Integration:** n8n Workflow
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Build Tool:** Vite

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Üretim için build
npm run build
```

## Yapılandırma

`.env` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url_here
```

### TMDB API Key Alma

1. [TMDB](https://www.themoviedb.org/) hesabı oluşturun
2. Ayarlar > API > API Key (v3 auth) bölümünden key'inizi alın
3. `.env` dosyasına ekleyin

### n8n Webhook Kurulumu

AI önerileri için n8n workflow'u yapılandırmanız gerekir:

1. n8n instance'ınızı kurun
2. Aşağıdaki workflow'u import edin:

```json
{
  "nodes": [
    {
      "id": "1",
      "name": "Webhook In",
      "type": "n8n-nodes-base.webhook",
      "position": [240, 300],
      "parameters": {
        "path": "movie-recommender",
        "method": "POST",
        "responseMode": "onReceived"
      }
    },
    {
      "id": "2",
      "name": "AI Extract Filters",
      "type": "n8n-nodes-base.openai",
      "position": [500, 300],
      "parameters": {
        "operation": "chat",
        "model": "gpt-4o-mini",
        "messages": [
          {
            "role": "system",
            "content": "Kullanıcı film önerisi istiyor. Mesajdan yıl, tür, puan, ülke veya özel filtreleri çıkar ve JSON formatında dön."
          },
          {
            "role": "user",
            "content": "={{$json.message}}"
          }
        ]
      }
    },
    {
      "id": "3",
      "name": "TMDB API Call",
      "type": "n8n-nodes-base.httpRequest",
      "position": [780, 300],
      "parameters": {
        "method": "GET",
        "url": "={{ 'https://api.themoviedb.org/3/discover/movie?api_key=API_KEY&sort_by=popularity.desc&with_genres=' + $json.tur + '&primary_release_year=' + $json.yil + '&vote_average.gte=' + $json.puan }}",
        "json": true
      }
    },
    {
      "id": "4",
      "name": "Webhook Response",
      "type": "n8n-nodes-base.webhook",
      "position": [1050, 300],
      "parameters": {
        "responseMode": "onReceived",
        "responseData": "={{$json.results}}"
      }
    }
  ],
  "connections": {
    "Webhook In": { "main": [[{ "node": "AI Extract Filters" }]] },
    "AI Extract Filters": { "main": [[{ "node": "TMDB API Call" }]] },
    "TMDB API Call": { "main": [[{ "node": "Webhook Response" }]] }
  }
}
```

3. Webhook URL'nizi `.env` dosyasına ekleyin

## Proje Yapısı

```
src/
├── components/
│   ├── Header.tsx              # Ana navigation
│   ├── HeroSlider.tsx          # Hero slider bileşeni
│   ├── MovieCard.tsx           # Film kartı
│   └── FilterSidebar.tsx       # Filtreleme sidebar'ı
├── pages/
│   ├── HomePage.tsx            # Ana sayfa
│   ├── CategoryPage.tsx        # Kategori sayfası
│   ├── SearchPage.tsx          # Arama sayfası
│   ├── DetailPage.tsx          # Detay sayfası
│   ├── AIChatPage.tsx          # AI chat sayfası
│   └── AboutPage.tsx           # Hakkımda sayfası
├── services/
│   ├── tmdb.ts                 # TMDB API servisi
│   └── ai.ts                   # AI servisi
├── App.tsx                     # Ana uygulama bileşeni
└── main.tsx                    # Giriş noktası
```

## API Kullanımı

### TMDB API Endpoints

```typescript
// Trend içerikler
tmdbApi.getTrending('movie', 'week')

// Popüler içerikler
tmdbApi.getPopular('movie', 1)

// Kategori bazlı keşif
tmdbApi.discoverMovies({ genre: 28, year: 2023, minRating: 7 })

// Arama
tmdbApi.search('inception', 'movie')

// Detaylar
tmdbApi.getDetails(550, 'movie')

// Benzer içerikler
tmdbApi.getSimilar(550, 'movie')
```

## Tasarım Özellikleri

- **Koyu Tema:** Netflix-inspired dark theme
- **Responsive:** Mobile-first tasarım
- **Animasyonlar:** Hover effects ve transitions
- **Modern UI:** Clean ve sophisticated görünüm
- **Accessibility:** Keyboard navigation desteği

## Geliştirici

**Esra Yılmaz**
- Full Stack Developer
- 5+ yıllık deneyim
- Frontend: React, Angular, TypeScript
- Backend: .NET Core, SignalR
- Gerçek zamanlı uygulamalar uzmanı

## Lisans

Bu proje öğrenme amaçlı geliştirilmiştir.
