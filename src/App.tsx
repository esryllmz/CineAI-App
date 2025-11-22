import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import AIChatPage from './pages/AIChatPage';
import AboutPage from './pages/AboutPage';

type Page =
  | { type: 'home' }
  | { type: 'category'; category: string }
  | { type: 'search'; query: string }
  | { type: 'detail'; movieId: number; mediaType: 'movie' | 'tv' }
  | { type: 'ai-chat' }
  | { type: 'about' };

function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });
  const [pageHistory, setPageHistory] = useState<Page[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: Page) => {
    setPageHistory((prev) => [...prev, currentPage]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (pageHistory.length > 0) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setPageHistory((prev) => prev.slice(0, -1));
      setCurrentPage(previousPage);
    } else {
      setCurrentPage({ type: 'home' });
    }
  };

  const handleNavigate = (pageId: string) => {
    if (pageId === 'home') {
      setCurrentPage({ type: 'home' });
      setPageHistory([]);
    } else if (pageId === 'ai-chat') {
      navigateTo({ type: 'ai-chat' });
    } else if (pageId === 'about') {
      navigateTo({ type: 'about' });
    } else {
      navigateTo({ type: 'category', category: pageId });
    }
  };

  const handleSearch = (query: string) => {
    navigateTo({ type: 'search', query });
  };

  const handleMovieClick = (id: number, mediaType: 'movie' | 'tv') => {
    navigateTo({ type: 'detail', movieId: id, mediaType });
  };

  const getCurrentPageId = () => {
    if (currentPage.type === 'home') return 'home';
    if (currentPage.type === 'category') return currentPage.category;
    if (currentPage.type === 'search') return 'search';
    if (currentPage.type === 'detail') return 'detail';
    if (currentPage.type === 'ai-chat') return 'ai-chat';
    if (currentPage.type === 'about') return 'about';
    return 'home';
  };

  return (
    <div className="min-h-screen bg-black">
      <Header
        currentPage={getCurrentPageId()}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      />

      {currentPage.type === 'home' && <HomePage onMovieClick={handleMovieClick} />}

      {currentPage.type === 'category' && (
        <CategoryPage category={currentPage.category} onMovieClick={handleMovieClick} />
      )}

      {currentPage.type === 'search' && (
        <SearchPage query={currentPage.query} onMovieClick={handleMovieClick} />
      )}

      {currentPage.type === 'detail' && (
        <DetailPage
          movieId={currentPage.movieId}
          mediaType={currentPage.mediaType}
          onMovieClick={handleMovieClick}
          onBack={goBack}
        />
      )}

      {currentPage.type === 'ai-chat' && <AIChatPage onMovieClick={handleMovieClick} />}

      {currentPage.type === 'about' && <AboutPage />}
    </div>
  );
}

export default App;
