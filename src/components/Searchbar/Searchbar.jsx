import React, { Component } from 'react';

export default class Searchbar extends Component {
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.props.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            name="search"
            type="text"
            placeholder="Search images and photos"
            value={this.props.search}
            onChange={e => this.props.onSearchChange(e.target.value)}
          />
        </form>
      </header>
    );
  }
}
