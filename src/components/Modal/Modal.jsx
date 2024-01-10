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

class Modal extends Component {
  // state = {
  //   selectedImageId: null,
  // };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    this.props.onEscModalClose(e);
  };

  render() {
    const { handleModalClose, images, selectedImageId } = this.props;
    const selectedImage = images.find(img => img.id === selectedImageId);

    return (
      <div className={styles.Overlay} onClick={handleModalClose} tabIndex="0">
        <div className={styles.Modal}>
          {selectedImage && <img src={selectedImage.largeImageURL} alt="" />}
        </div>
      </div>
    );
  }
}

export default Modal;
