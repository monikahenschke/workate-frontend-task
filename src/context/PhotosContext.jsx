import { createContext, useEffect, useState, useCallback } from 'react';
import { createPhotosListFromUnsplash } from '../utils/PhotosList';

export const PhotosContext = createContext();

export const PhotosContextProvider = ({ children }) => {
  const [, setError] = useState();
  const [photosListState, setPhotosListState] = useState([]);
  const [isLoadingState, setLoadingState] = useState(true);
  const [activePageState, setActivePageState] = useState(0);
  const [urlsOfPhotosCurrentlyShown, setUrlsOfPhotosCurrentlyShown] = useState(
    []
  );
  const numberOfPhotosToShow = 3;
  const totalPages = calculateNumberOfPages(photosListState); //TODO: useMemo

  useEffect(() => {
    setLoadingState(true);

    async function fetchData() {
      try {
        const photosList = await createPhotosListFromUnsplash();
        setPhotosListState(photosList);
        setLoadingState(false);
      } catch (error) {
        setError(() => {
          throw error;
        });
      }
    }

    fetchData();
  }, []);

  const setPhotosUrlsForActivePage = useCallback(() => {
    const numberOfFirstPhotoOnPage = activePageState * numberOfPhotosToShow;
    const numberOfLastPhotoOnPage =
      numberOfFirstPhotoOnPage + numberOfPhotosToShow;

    const urls = photosListState.slice(
      numberOfFirstPhotoOnPage,
      numberOfLastPhotoOnPage
    );
    setUrlsOfPhotosCurrentlyShown(urls);
  }, [activePageState, photosListState]);

  useEffect(() => {
    setPhotosUrlsForActivePage();
  }, [setPhotosUrlsForActivePage]);

  function calculateNumberOfPages(photosList) {
    if (photosList.length > 0) {
      const totalPages = Math.ceil(photosList.length / numberOfPhotosToShow);
      return totalPages;
    }
  }
  function nextPhotos() {
    setActivePageState(activePageState + 1);
  }

  function prevPhotos() {
    setActivePageState(activePageState - 1);
  }

  return (
    <PhotosContext.Provider
      value={{
        isLoadingState,
        prevPhotos,
        nextPhotos,
        urlsOfPhotosCurrentlyShown,
        activePageState,
        totalPages,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};
