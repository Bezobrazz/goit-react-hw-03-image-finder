import React from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit, search, onSearchChange }) => {
  return (
    <div className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={onSubmit}>
        <input
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className={styles.SearchFormInput}
          placeholder="Search images..."
        />
        <button className={styles.SearchFormButton}>Search</button>
      </form>
    </div>
  );
};

export default Searchbar;
