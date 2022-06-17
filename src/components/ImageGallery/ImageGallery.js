import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ pictures, onClick, onHandleModalImg }) {
  return (
    <ul className={s.ImageGallery}>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          img={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={onClick}
          onHandleModalImg={onHandleModalImg}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
  onHandleModalImg: PropTypes.func.isRequired,
};

export default ImageGallery;
