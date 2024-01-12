import styles from './Button.module.css';

export const Button = ({ loadMoreImages }) => {
  return (
    <button className={styles.LoadMoreBtn} onClick={loadMoreImages}>
      Load more
    </button>
  );
};
