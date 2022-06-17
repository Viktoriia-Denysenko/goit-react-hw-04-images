import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    request: '',
    pictures: [],
    totalPictures: null,
    status: 'idle',
    page: 1,
    error: null,
    showModal: false,
    modalImg: null,
    modalAlt: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModalImg = ({ largeImageURL, tags }) => {
    this.setState({ modalImg: largeImageURL, modalAlt: tags });
  };

  handleRequestValue = requestValue => {
    this.setState({ request: requestValue.trim(), page: 1, pictures: [] });
  };

  async getApi() {
    const { page, request } = this.state;
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${request}&page=${page}&key=26520489-9dedc914612f42cfe7de51211&image_type=photo&orientation=horizontal&per_page=12`
      );
      return response.data;
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { request, page } = this.state;
    const prevRequest = prevState.request;
    const prevPage = prevState.page;

    if (prevRequest !== request || prevPage !== page) {
      this.setState({ status: 'pending' });
      this.getApi().then(response => {
        if (response && !response.hits.length) {
          return toast.error('There is no images found. Please try again!');
        }
        if (response) {
          response.hits.forEach(picture => {
            return this.setState(prevState => {
              return {
                pictures: [...prevState.pictures, picture],
                totalPictures: response.total,
                status: 'resolve',
              };
            });
          });
        }
      });
    }

    if (this.state.request === '') {
      return;
    }
  }

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const {
      showModal,
      pictures,
      error,
      modalImg,
      modalAlt,
      status,
      totalPictures,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleRequestValue} />
        {pictures.length !== 0 && (
          <ImageGallery
            pictures={pictures}
            onClick={this.toggleModal}
            onHandleModalImg={this.handleModalImg}
          />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )}
        {status === 'pending' && <Loader />}
        {status !== 'pending' &&
          pictures.length !== 0 &&
          totalPictures !== pictures.length && (
            <Button loadMore={this.loadMore} />
          )}
        <ToastContainer autoClose={3000} />
        {status === 'rejected' &&
          toast.error(`Whoops, something went wrong: ${error.message}`)}
      </>
    );
  }
}
