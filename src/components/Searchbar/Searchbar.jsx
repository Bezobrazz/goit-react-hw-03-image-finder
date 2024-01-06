import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            name="search"
            type="text"
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />
        </form>
      </header>
    );
  }
}
