'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '../../../components/Header/Header';
import styles from '../../../styles/MediaDetail.module.css';

// Sample TV show data
const sampleShow = {
  id: 1399,
  name: "Game of Thrones",
  poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
  backdrop_path: "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
  first_air_date: "2011-04-17",
  vote_average: 8.3,
  number_of_seasons: 8,
  overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  genres: [
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 18, name: "Drama" },
    { id: 10759, name: "Action & Adventure" }
  ]
};

export default function TVDetail() {
  const params = useParams();
  const id = params?.id;
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Simulated fetch (replace with real fetch if needed)
    setTimeout(() => {
      setShow(sampleShow);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (!id || isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!show) {
    return <div className={styles.error}>TV show not found</div>;
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <div
            className={styles.backdrop}
            style={{
              backgroundImage: show.backdrop_path
                ? `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`
                : 'none',
            }}
          >
            <div className={styles.backdropOverlay} />
          </div>

          <div className={styles.content}>
            <div className={styles.poster}>
              <Image
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                    : '/images/placeholder.png'
                }
                alt={show.name}
                width={300}
                height={450}
                className={styles.posterImage}
              />
            </div>

            <div className={styles.details}>
              <h1 className={styles.title}>
                {show.name}
                {show.first_air_date && (
                  <span className={styles.year}>
                    ({new Date(show.first_air_date).getFullYear()})
                  </span>
                )}
              </h1>

              <div className={styles.meta}>
                {show.first_air_date && (
                  <span className={styles.date}>
                    First aired: {new Date(show.first_air_date).toLocaleDateString()}
                  </span>
                )}
                {show.number_of_seasons && (
                  <span className={styles.seasons}>
                    {show.number_of_seasons}{' '}
                    {show.number_of_seasons === 1 ? 'Season' : 'Seasons'}
                  </span>
                )}
                {show.vote_average > 0 && (
                  <span className={styles.rating}>
                    Rating: {show.vote_average.toFixed(1)}/10
                  </span>
                )}
              </div>

              {show.genres && show.genres.length > 0 && (
                <div className={styles.genres}>
                  {show.genres.map((genre) => (
                    <span key={genre.id} className={styles.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {show.overview && (
                <>
                  <h2>Overview</h2>
                  <p className={styles.overview}>{show.overview}</p>
                </>
              )}

              <div className={styles.actions}>
                <button className={styles.actionButton}>Add to Watchlist</button>
                <button className={styles.actionButton}>Track Progress</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
