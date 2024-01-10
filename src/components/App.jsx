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
    orientation: 'landscape',
    safesearch: true,
    per_page: 12,
  },
});

class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
    isModalOpen: false,
    selectedImageId: null,
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

  handleModalOpen = selectedImageId => {
    this.setState({ isModalOpen: true, selectedImageId });
  };
  handleModalClose = e => {
    e.target === e.currentTarget &&
      this.setState({ isModalOpen: false, selectedImageId: null });
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
        <ImageGallery
          images={images}
          // selectedImage={selectedImageId}
          handleModalOpen={this.handleModalOpen}
        />
        {isLoading && <Loader />}
        {images.length > 0 && <Button loadMoreImages={this.loadMoreImages} />}
        {isModalOpen && (
          <Modal
            handleModalClose={this.handleModalClose}
            onEscModalClose={this.onEscModalClose}
            images={images}
            selectedImage={selectedImageId}
          />
        )}
      </div>
    );
  }
}

export default App;
