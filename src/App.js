import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Toaster, toast } from "react-hot-toast";
import { animateScroll as scroll } from "react-scroll";
import errorStyle from "./helpers/general_styles/ErrorText.module.css";
import css from "./helpers/general_styles/GalleryBox.module.css";
import img from "./helpers/general_styles/LargeImages.module.css";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";
import GetImagesFromApi from "./helpers/GetImagesFromAPI";
import mapImagesFromAPI from "./helpers/mapImagesFromApi";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import ModalForm from "./components/Modal";

class App extends Component {
  state = {
    searchName: "",
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    largeImageURL: "",
    openedModal: false,
  };
  async componentDidUpdate(_, prevState) {
    let { searchName } = this.state;

    if (prevState.searchName !== searchName && searchName) {
      this.setState({ isLoading: true, images: [] });
      try {
        const imagesArr = await GetImagesFromApi(searchName);
        if (imagesArr.hits.length > 0) {
          this.setState({
            images: mapImagesFromAPI(imagesArr.hits),
          });
        } else {
          toast(`There is no results with ${searchName.toUpperCase()}`);
          return;
        }
      } catch (error) {
        if (error.response || error.request) {
          this.setState({ error });
        }
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  scrollToBottom = () => {
    scroll.scrollToBottom();
  };
  handleFormData = (data) => {
    this.setState({ searchName: data.formInput });
  };

  onLoadMoreClick = async () => {
    let { page, searchName, images } = this.state;
    this.setState({
      page: (page += 1),
    });

    try {
      const moreImages = await GetImagesFromApi(searchName, page);
      this.setState({
        images: [...images, ...mapImagesFromAPI(moreImages.hits)],
      });
      this.scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };

  getClickedImage = (largeImageURL) => {
    this.setState({ largeImageURL, openedModal: true });
  };

  toggleModal = () => {
    this.setState(({ openedModal }) => ({ openedModal: !openedModal }));
  };

  render() {
    const { isLoading, images, error, openedModal, largeImageURL } = this.state;

    return (
      <>
        {error && (
          <p className={errorStyle.ErrorText}>Ups, something went wrong =(</p>
        )}
        {!error && <Searchbar onFormSubmit={this.handleFormData} />}
        <div className={css.Box}>
          {!error && !isLoading && (
            <ImageGallery images={images} onImageClick={this.getClickedImage} />
          )}
          {!error && !isLoading && images.length > 0 && (
            <Button onLoadBtnClick={this.onLoadMoreClick} />
          )}
          {isLoading && <Loader onLoad={isLoading} />}
        </div>
        {openedModal && (
          <ModalForm onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" className={img.LargeImages} />
          </ModalForm>
        )}

        <Toaster />
      </>
    );
  }
}

export default App;
