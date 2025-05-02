'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../../../components/Header/Header';
import styles from '../../../styles/MediaDetail.module.css';

// In a real app, import this
// import { fetchMediaDetails } from '../../../utils/api';

// Sample movie data
const sampleMovie = {
  id: 550,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
  runtime: 139,
  overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
  genres: [
    { id: 18, name: "Drama" },
    { id: 53, name: "Thriller" }
  ]
};

export default function MovieDetail({ params }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch real data
    // const getMovieDetails = async () => {
    //   try {
    //     const data = await fetchMediaDetails('movie', params.id);
    //     setMovie(data);
    //   } catch (error) {
    //     console.error("Failed to fetch movie details:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // getMovieDetails();

    // For demo
    setTimeout(() => {
      setMovie(sampleMovie);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!movie) {
    return <div className={styles.error}>Movie not found</div>;
  }
  
  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className="container">
          <div className={styles.backdrop} style={{
            backgroundImage: movie.backdrop_path 
              ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
              : 'none',
          }}>
            <div className={styles.backdropOverlay} />
          </div>
          
          <div className={styles.content}>
            <div className={styles.poster}>
              <Image 
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/images/placeholder.png'
                }
                alt={movie.title}
                width={300}
                height={450}
                className={styles.posterImage}
              />
            </div>
            
            <div className={styles.details}>
              <h1 className={styles.title}>
                {movie.title} 
                {movie.release_date && (
                  <span className={styles.year}>
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                )}
              </h1>
              
              <div className={styles.meta}>
                {movie.release_date && (
                  <span className={styles.date}>
                    Release: {new Date(movie.release_date).toLocaleDateString()}
                  </span>
                )}
                {movie.runtime && (
                  <span className={styles.runtime}>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
                {movie.vote_average > 0 && (
                  <span className={styles.rating}>
                    Rating: {movie.vote_average.toFixed(1)}/10
                  </span>
                )}
              </div>
              
              {movie.genres && movie.genres.length > 0 && (
                <div className={styles.genres}>
                  {movie.genres.map(genre => (
                    <span key={genre.id} className={styles.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              
              {movie.overview && (
                <>
                  <h2>Overview</h2>
                  <p className={styles.overview}>{movie.overview}</p>
                </>
              )}
              
              <div className={styles.actions}>
                <button className={styles.actionButton}>
                  Add to Watchlist
                </button>
                <button className={styles.actionButton}>
                  Mark as Watched
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
