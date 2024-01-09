// import styles from './Modal.module.css';
// export const Modal = ({ handelModalClose, onEscModalClose, images }) => {
//   return (
//     <div
//       className={styles.Overlay}
//       onClick={handelModalClose}
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
  state = {
    selectedImageId: null,
  };

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
    const { handelModalClose, images, selectedImageId } = this.props;
    const selectedImage = images.find(img => img.id === selectedImageId);

    return (
      <div className={styles.Overlay} onClick={handelModalClose} tabIndex="0">
        <div className={styles.Modal}>
          {selectedImage && <img src={selectedImage.largeImageURL} alt="" />}
        </div>
      </div>
    );
  }
}

export default Modal;
