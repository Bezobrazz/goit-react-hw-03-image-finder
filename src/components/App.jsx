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
    largeImgUrl: '',
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
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

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSubmit = query => {
    this.setState({ search: query, page: 1, images: [] });
  };

  handleClickImg = url => {
    this.setState({ largeImgUrl: url });
  };

  render() {
    const { images, isLoading, largeImgUrl } = this.state;

    return (
      <div className={styles.Wrapper}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} openModal={this.handleClickImg} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button loadMoreImages={this.loadMoreImages} />}
        {largeImgUrl && (
          <Modal closeModal={this.handleClickImg} largeImgUrl={largeImgUrl} />
        )}
      </div>
    );
  }
}

export default App;
