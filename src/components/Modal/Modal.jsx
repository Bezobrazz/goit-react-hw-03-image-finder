import React, { Component } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.body.style.overflow = 'auto';
  }

  onKeyDown = e => {
    this.onEscModalClose(e);
  };

  onEscModalClose = e => {
    e.key === 'Escape' && this.props.closeModal('');
  };
  handleModalClose = e => {
    e.target === e.currentTarget && this.props.closeModal('');
  };

  render() {
    const { largeImgUrl } = this.props;

    return createPortal(
      <div className={styles.Overlay} onClick={this.handleModalClose}>
        <div className={styles.Modal}>
          <img className={styles.ModalImg} src={largeImgUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
