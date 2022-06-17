import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export function App() {
  const [request, setRequest] = useState('');
  const [pictures, setPictures] = useState([]);
  const [totalPictures, setTotalPictures] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleModalImg = ({ largeImageURL, tags }) => {
    setModalImg(largeImageURL);
    setModalAlt(tags);
  };

  const handleRequestValue = requestValue => {
    setRequest(requestValue.trim());
    setPage(1);
    setPictures([]);
  };

  useEffect(() => {
    if (request === '') {
      return;
    }

    const getApi = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${request}&page=${page}&key=26520489-9dedc914612f42cfe7de51211&image_type=photo&orientation=horizontal&per_page=12`
        );
        return response.data;
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    };

    setStatus('pending');
    getApi().then(response => {
      if (response && !response.hits.length) {
        setStatus('idle');
        return toast.error('There is no images found. Please try again!');
      }
      response.hits.forEach(picture => {
        setPictures(prevState => [...prevState, picture]);
        setTotalPictures(response.total);
        setStatus('resolve');
      });
    });
  }, [page, request]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleRequestValue} />
      {pictures.length !== 0 && (
        <ImageGallery
          pictures={pictures}
          onClick={toggleModal}
          onHandleModalImg={handleModalImg}
        />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImg} alt={modalAlt} />
        </Modal>
      )}
      {status === 'pending' && <Loader />}
      {status !== 'pending' &&
        pictures.length !== 0 &&
        totalPictures !== pictures.length && <Button loadMore={loadMore} />}
      <ToastContainer autoClose={3000} />
      {status === 'rejected' &&
        toast.error(`Whoops, something went wrong: ${error.message}`)}
    </>
  );
}
