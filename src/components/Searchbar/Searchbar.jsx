import { useState } from 'react';
import { RiSearchEyeLine } from 'react-icons/ri';
import { Toaster, toast } from 'react-hot-toast';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onFormSubmit }) {
  const [formInput, setFormInput] = useState('');

  const onInputChange = evt => {
    setFormInput(evt.target.value);
  };
  const onSearchFormSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    onFormSubmit(formInput);
    setFormInput('');
    if (formInput === '') {
      toast.error('You haven`t written anything yet');
    }
    form.reset();
  };
  return (
    <header className={css.Header}>
      <form onSubmit={onSearchFormSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchButton}>
          <RiSearchEyeLine
            style={{ width: '100%', height: '100%', color: '#fff' }}
          />
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
          className={css.SearchInput}
        />
      </form>
      <Toaster />
    </header>
  );
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func,
  onClick: PropTypes.func,
};
