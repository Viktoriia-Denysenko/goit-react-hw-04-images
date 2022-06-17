import React from 'react';
import s from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ loadMore }) {
  return (
    <button onClick={loadMore} type="submit" className={s.Button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
