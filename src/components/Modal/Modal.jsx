// import styles from './Modal.module.css';
// export const Modal = ({ handleModalClose, onEscModalClose, images }) => {
//   return (
//     <div
//       className={styles.Overlay}
//       onClick={handleModalClose}
//       onKeyDown={onEscModalClose}
//       tabIndex="0"
//     >
//       <div className={styles.Modal}>
//         {images.map(img => (
//           <img src={img.largeImageURL} alt="" />
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { Component } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  // state = {
  //   selectedImageId: null,
  // };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.body.style.overflow = 'auto';
  }

  onKeyDown = e => {
    this.props.onEscModalClose(e);
  };

  render() {
    const { handleModalClose, images, selectedImageId } = this.props;
    const selectedImage = images.find(img => img.id === selectedImageId);

    return createPortal(
      <div className={styles.Overlay} onClick={handleModalClose}>
        <div className={styles.Modal}>
          {selectedImage && <img src={selectedImage.largeImageURL} alt="" />}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
