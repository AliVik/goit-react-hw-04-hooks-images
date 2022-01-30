import { nanoid } from 'nanoid';

export default function mapImagesFromAPI(array) {
  return array.map(hit => {
    const myId = nanoid();
    return {
      id: myId,
      webformatURL: hit.previewURL,
      largeImageURL: hit.largeImageURL,
    };
  });
}
