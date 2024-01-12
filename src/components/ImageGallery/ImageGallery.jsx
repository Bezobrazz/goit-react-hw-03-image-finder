import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.Gallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={nanoid()}
            image={image}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );
};
