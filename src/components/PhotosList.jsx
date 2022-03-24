import { useContext, useMemo } from 'react';
import classNames from 'classnames';

import { PhotosContext } from '../context/PhotosContext';
import PhotosListItem from './PhotosListItem';
import styles from './PhotosList.module.scss';

import { ReactComponent as NextSvg } from '../images/arrow-next.svg';
import { ReactComponent as PrevSvg } from '../images/arrow-prev.svg';

const PhotosList = () => {
  const {
    isLoadingState,
    prevPhotos,
    nextPhotos,
    urlsOfPhotosCurrentlyShown,
    activePageState,
    totalPages,
  } = useContext(PhotosContext);

  const nextButtonDisabled = useMemo(
    () => totalPages === activePageState + 1,
    [totalPages, activePageState]
  );
  const prevButtonDisabled = useMemo(
    () => activePageState === 0,
    [activePageState]
  );

  if (isLoadingState) {
    return <div className={styles.isLoadingState}>It's loading!</div>;
  }

  return (
    <div className={styles.PhotosList}>
      <div className={styles.PhotosList__list}>
        {urlsOfPhotosCurrentlyShown.map((url) => (
          <PhotosListItem key={url} url={url} />
        ))}
        {!isLoadingState && (
          <div>
            <button
              disabled={prevButtonDisabled}
              className={classNames(styles.buttonPrev, styles.button)}
              onClick={prevPhotos}
            >
              <PrevSvg />
            </button>
            <button
              disabled={nextButtonDisabled}
              className={classNames(styles.buttonNext, styles.button)}
              onClick={nextPhotos}
            >
              <NextSvg />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default PhotosList;
