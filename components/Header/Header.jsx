"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            MovieTracker
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/movie">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/tv">
                TV Shows
              </Link>
            </li>
            <li>
              <Link href="/watchlist">
                Watchlist
              </Link>
            </li>
          </ul>
        </nav>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies & TV..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
