import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import styles from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '41222612-5bd8d04c7d8e61a5d7de078bd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    selectedImageId: null,
  },
});

class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
    isModalOpen: false,
  };

  handleSearch = (searchValue, resetPage = false) => {
    this.setState({
      search: searchValue,
      page: resetPage ? 1 : this.state.page,
      images: [],
    });
  };

  filterUniqueImages = newImages => {
    return newImages.filter(
      newImage =>
        !this.state.images.some(
          existingImage => existingImage.id === newImage.id
        )
    );
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), this.loadImages);
  };

  loadImages = async () => {
    const { search, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await pixabayApi.get(`/?q=${search}&page=${page}`);
      const uniqueImages = this.filterUniqueImages(response.data.hits);

      this.setState(prevState => ({
        images: [...prevState.images, ...uniqueImages],
      }));
    } catch (error) {
      console.error('Error fetching more images from Pixabay:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSearchChange = searchValue => {
    this.handleSearch(searchValue, true);
  };

  onSubmit = e => {
    e.preventDefault();
    this.handleSearch(this.state.search, true);
    this.loadImages();
  };

  handleModalOpen = (e, selectedImageId) => {
    console.log(e.target);
    this.setState({ isModalOpen: true, selectedImageId });
  };
  handelModalClose = e => {
    e.target === e.currentTarget && this.setState({ isModalOpen: false });
  };
  onEscModalClose = e => {
    if (e.key === 'Escape' && this.state.isModalOpen) {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const { images, search, isLoading, isModalOpen, selectedImageId } =
      this.state;

    return (
      <div className={styles.Wrapper}>
        <Searchbar
          onSubmit={this.onSubmit}
          search={search}
          onSearchChange={this.onSearchChange}
        />
        <ImageGallery images={images} handleModalOpen={this.handleModalOpen} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button loadMoreImages={this.loadMoreImages} />}
        {isModalOpen && (
          <Modal
            handelModalClose={this.handelModalClose}
            onEscModalClose={this.onEscModalClose}
            images={images}
            selectedImageId={selectedImageId}
          />
        )}
      </div>
    );
  }
}

export default App;
