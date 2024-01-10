import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import styles from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { loadPhotos } from 'helpers/Api';

class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
    isModalOpen: false,
    selectedImageId: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      // this.loadImages();
      const { search, page } = this.state;
      this.setState({ isLoading: true });

      try {
        const { results, total_pages, total } = await loadPhotos(search, page);
        // console.log(data);
        // const { results, total_pages, total } = data;
        console.log(results);

        this.setState(prevState => ({
          images: [...prevState.images, ...results],
        }));
      } catch (error) {
        console.error('Error fetching more images from Unsplash:', error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = (searchValue, resetPage = false) => {
    this.setState({
      search: searchValue,
      page: resetPage ? 1 : this.state.page,
      images: [],
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  loadImages = async () => {
    const { search, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const { data } = await loadPhotos(search, page);
      console.log(data);
      const { results, total_pages, total } = data;
      console.log(results);

      this.setState(prevState => ({
        images: [...prevState.images, ...results],
      }));
    } catch (error) {
      console.error('Error fetching more images from Unsplash:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = query => {
    this.setState({ search: query });
  };

  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
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
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} handleModalOpen={this.handleModalOpen} />
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
