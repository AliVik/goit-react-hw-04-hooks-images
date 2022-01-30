import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { animateScroll as scroll } from 'react-scroll';
import errorStyle from './helpers/general_styles/ErrorText.module.css';
import css from './helpers/general_styles/GalleryBox.module.css';
import img from './helpers/general_styles/LargeImages.module.css';
import Searchbar from './components/Searchbar';
import Loader from './components/Loader';
import GetImagesFromApi from './helpers/GetImagesFromAPI';
import mapImagesFromAPI from './helpers/mapImagesFromApi';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import ModalForm from './components/Modal';

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [openedModal, setOpenedModal] = useState(false);

  useEffect(() => {
    if (!searchName) {
      return;
    }

    const handleImagesFromAPI = async () => {
      try {
        setIsLoading(true);
        const imagesArr = await GetImagesFromApi(searchName, page);
        if (imagesArr.hits.length > 0) {
          setImages(prevImages => [
            ...prevImages,
            ...mapImagesFromAPI(imagesArr.hits),
          ]);
        } else {
          toast(`There is no results with ${searchName.toUpperCase()}`);
          return;
        }
      } catch (error) {
        if (error.response || error.request) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
        scrollToBottom();
      }
    };
    handleImagesFromAPI();
  }, [searchName, page]);

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };
  const handleFormData = data => {
    setSearchName(data);
    setImages([]);
  };

  const onLoadMoreClick = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const getClickedImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setOpenedModal(true);
  };
  const toggleModal = () => {
    setOpenedModal(!openedModal);
  };
  return (
    <>
      {error && (
        <p className={errorStyle.ErrorText}>Ups, something went wrong =(</p>
      )}
      {!error && <Searchbar onFormSubmit={handleFormData} />}
      <div className={css.Box}>
        {!error && (
          <ImageGallery images={images} onImageClick={getClickedImage} />
        )}
        {!error && !isLoading && images.length > 0 && (
          <Button onLoadBtnClick={onLoadMoreClick} isDynamic={true} />
        )}
        {isLoading && <Loader onLoad={isLoading} />}
      </div>
      {openedModal && (
        <ModalForm onClose={toggleModal}>
          <img src={largeImageURL} alt="" className={img.LargeImages} />
        </ModalForm>
      )}

      <Toaster />
    </>
  );
}
