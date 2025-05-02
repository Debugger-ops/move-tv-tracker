'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import styles from '../../styles/Search.module.css';

// In a real app, import this
// import { searchMedia } from '../../utils/api';

// Sample search results data
const sampleSearchResults = {
  page: 1,
  total_pages: 5,
  total_results: 100,
  results: [
    {
      id: 550,
      title: "Fight Club",
      poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      release_date: "1999-10-15",
      vote_average: 8.4,
      media_type: "movie"
    },
    {
      id: 1396,
      name: "Breaking Bad",
      poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      first_air_date: "2008-01-20",
      vote_average: 8.7,
      media_type: "tv"
    }
  ]
};

export default function Search() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [results, setResults] = useState(sampleSearchResults);
  const [query, setQuery] = useState(queryParam);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(sampleSearchResults.total_pages);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (queryParam && queryParam !== query) {
      // In a real app, fetch real data from API
      // const fetchResults = async () => {
      //   setIsLoading(true);
      //   const data = await searchMedia(queryParam, 1);
      //   setResults(data);
      //   setQuery(queryParam);
      //   setPage(1);
      //   setTotalPages(data.total_pages || 1);
      //   setIsLoading(false);
      // };
      // fetchResults();
      
      // For demo
      setQuery(queryParam);
    }
  }, [queryParam, query]);

  const loadMoreResults = async () => {
    if (page < totalPages) {
      setIsLoading(true);
      
      // In a real app, fetch more data
      // const nextPage = page + 1;
      // const data = await searchMedia(query, nextPage);
      // setResults({
      //   ...data,
      //   results: [...results.results, ...data.results],
      // });
      // setPage(nextPage);
      
      // For demo
      setTimeout(() => {
        setPage(page + 1);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Search Results for "{query}"</h1>
          
          {results?.results?.length > 0 ? (
            <>
              <div className="grid">
                {results.results.map(item => (
                  <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
                ))}
              </div>
              
              {page < totalPages && (
                <div className={styles.loadMoreContainer}>
                  <button 
                    className={styles.loadMoreButton}
                    onClick={loadMoreResults}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noResults}>
              <p>No results found for "{query}"</p>
              <p>Try different keywords or check your spelling</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
