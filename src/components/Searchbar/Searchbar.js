import { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [request, setRequest] = useState('');

  const handleRequest = event => {
    setRequest(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(request);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleRequest}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
