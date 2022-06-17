import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({
  img,
  largeImageURL,
  tags,
  onClick,
  onHandleModalImg,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.image}
        src={img}
        alt={tags}
        onClick={() => {
          onHandleModalImg({ largeImageURL, tags });
          onClick();
        }}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onHandleModalImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
