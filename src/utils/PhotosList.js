async function getPhotosUrlsListFromPicsum() {
  const url = 'https://picsum.photos/v2/list';

  const response = await fetch(url);
  return response.json();
}

function getSlugFromPhotosUrlsList(photosList) {
  const unsplashDomain = 'unsplash.com';

  const slugUrls = photosList.map((photosUrl) => {
    const splittedUrl = photosUrl.url.split('/').filter((v) => v);
    const unsplashDomainFromUrl = splittedUrl[1];
    if (unsplashDomainFromUrl === unsplashDomain) {
      return splittedUrl[3];
    }
  });
  return slugUrls.filter((slug) => slug);
}
export async function createPhotosListFromUnsplash() {
  const unsplashSourceUrl = 'http://source.unsplash.com/';

  const photosList = await getPhotosUrlsListFromPicsum();

  const slugUrls = getSlugFromPhotosUrlsList(photosList);

  const photosUrls = slugUrls.map((slug) => {
    return unsplashSourceUrl + slug;
  });

  return photosUrls;
}
