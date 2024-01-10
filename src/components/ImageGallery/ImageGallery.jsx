import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ images, handleModalOpen }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(image => {
        console.log('Image ID:', image.id); // Додано рядок для виведення id в консоль
        return (
          <ImageGalleryItem
            key={nanoid()}
            image={image}
            handleModalOpen={handleModalOpen}
          />
        );
      })}
    </ul>
  );
};
