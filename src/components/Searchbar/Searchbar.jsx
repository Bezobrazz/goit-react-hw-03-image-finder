import React, { Component } from 'react';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  onSearchChange = e => {
    this.setState({ query: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    this.props.onSubmit(this.state.query);
  };
  render() {
    return (
      <div className={styles.Searchbar}>
        <form onSubmit={this.onSubmit} className={styles.SearchForm}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.onSearchChange}
            className={styles.SearchFormInput}
            placeholder="Search images..."
          />
          <button className={styles.SearchFormButton}>Search</button>
        </form>
      </div>
    );
  }
}
