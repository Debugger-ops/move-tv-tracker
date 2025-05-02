"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieCard.module.css';

const MovieCard = ({ item }) => {
  // Determine if it's a movie or TV show
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const imagePath = item.poster_path 
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : '/images/placeholder.png';
  
  return (
    <div className={styles.card}>
      <Link href={`/${mediaType}/${item.id}`}>
        <div className={styles.imageContainer}>
          <img
            src={imagePath}
            alt={title}
            className={styles.image}
          />
          <div className={styles.rating}>
            {item.vote_average ? (item.vote_average.toFixed(1)) : 'NA'}
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          {releaseDate && (
            <p className={styles.date}>
              {new Date(releaseDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;