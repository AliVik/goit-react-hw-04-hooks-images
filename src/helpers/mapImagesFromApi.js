export default function mapImagesFromAPI(array) {
  return array.map((hit) => {
    return {
      id: hit.id,
      webformatURL: hit.previewURL,
      largeImageURL: hit.largeImageURL,
    };
  });
}
