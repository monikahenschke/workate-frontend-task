import styles from './PhotosListItem.module.scss';

const PhotosListItem = ({ url }) => {
  return (
    <div className={styles.PhotosListItem}>
      <img alt="Unsplash" src={url} />
    </div>
  );
};

export default PhotosListItem;
