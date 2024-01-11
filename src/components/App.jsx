import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { loadPhotos } from 'helpers/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';
import styles from './App.module.css';

class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoadMore: false,
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
        const { results, total } = await loadPhotos(search, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...results],
          isLoadMore: page < Math.ceil(total / 12),
        }));
      } catch (error) {
        toast.error('Ooops, something went wrong 😭');
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
    const { images, isLoading, isLoadMore, largeImgUrl } = this.state;

    return (
      <div className={styles.Wrapper}>
        <ToastContainer />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} openModal={this.handleClickImg} />
        {isLoading && <Loader />}
        {isLoadMore && <Button loadMoreImages={this.loadMoreImages} />}
        {largeImgUrl && (
          <Modal closeModal={this.handleClickImg} largeImgUrl={largeImgUrl} />
        )}
      </div>
    );
  }
}

export default App;
