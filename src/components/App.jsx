import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '41222612-5bd8d04c7d8e61a5d7de078bd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
});

export default class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
  };

  onSearchChange = searchValue => {
    this.setState({ search: searchValue, page: 1, images: [] });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), this.loadImages);
  };

  loadImages = async () => {
    try {
      const response = await pixabayApi.get(
        '/?q=' + this.state.search + '&page=' + this.state.page
      );

      const uniqueImages = response.data.hits.filter(newImage => {
        return !this.state.images.some(
          existingImage => existingImage.id === newImage.id
        );
      });

      this.setState(prevState => ({
        images: [...prevState.images, ...uniqueImages],
      }));
    } catch (error) {
      console.error('Error fetching more images from Pixabay:', error);
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ page: 1, images: [] }); // Очищаємо стан перед новим пошуком
    this.loadImages();
  };

  render() {
    const { images } = this.state;

    return (
      <div>
        <Searchbar
          onSubmit={this.onSubmit}
          search={this.state.search}
          onSearchChange={this.onSearchChange}
        />
        <ul className="gallery">
          {images.map(image => (
            <li key={image.id} className="gallery-item">
              <img src={image.webformatURL} alt={image.tag} />
            </li>
          ))}
        </ul>

        {images.length > 0 && (
          <button onClick={this.loadMoreImages}>Load more</button>
        )}
      </div>
    );
  }
}
