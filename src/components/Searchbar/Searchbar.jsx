import React from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit, search, onSearchChange }) => {
  return (
    <form onSubmit={onSubmit} className={styles.searchbar}>
      <input
        type="text"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className={styles['search-input']}
        placeholder="Search images..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Searchbar;
