'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from '../../styles/Watchlist.module.css';

// Mock data - in a real app this would come from a database or local storage
const mockWatchlist = [
  {
    id: 550,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    release_date: "1999-10-15",
    vote_average: 8.4,
    media_type: "movie"
  },
  {
    id: 1399,
    name: "Game of Thrones",
    poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    first_air_date: "2011-04-17",
    vote_average: 8.3,
    media_type: "tv"
  },
  {
    id: 24428,
    title: "The Avengers",
    poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    release_date: "2012-04-25",
    vote_average: 7.7,
    media_type: "movie"
  }
];

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    setWatchlist(mockWatchlist);
  }, []);
  
  const filteredWatchlist = watchlist.filter(item => {
    if (activeTab === 'all') return true;
    return item.media_type === activeTab;
  });
  
  const removeFromWatchlist = (id, mediaType) => {
    setWatchlist(watchlist.filter(item => !(item.id === id && item.media_type === mediaType)));
  };

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>My Watchlist</h1>
          
          <div className={styles.tabContainer}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'movie' ? styles.active : ''}`}
                onClick={() => setActiveTab('movie')}
              >
                Movies
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'tv' ? styles.active : ''}`}
                onClick={() => setActiveTab('tv')}
              >
                TV Shows
              </button>
            </div>
          </div>
          
          {filteredWatchlist.length > 0 ? (
            <div className="grid">
              {filteredWatchlist.map(item => (
                <div key={`${item.id}-${item.media_type}`} className={styles.cardWrapper}>
                  <MovieCard item={item} />
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromWatchlist(item.id, item.media_type)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Your watchlist is empty</p>
              <p>Add movies and TV shows to keep track of what you want to watch</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
