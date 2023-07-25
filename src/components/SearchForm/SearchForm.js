import React from 'react';
import "./SearchForm.css";

function SearchForm({ onFilter, isChecked, checkboxChange, handleInputChange, inputValue }) {

  const [inputError, setInputError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue) {
      setInputError('');
    } else if (!inputValue) {
      setInputError('Нужно ввести ключевое слово');
      return;
    }

    onFilter(inputValue, isChecked);
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="search__container">
        <div className="search__container-input">
          <input onChange={handleInputChange} value={inputValue || ''} className="search__input" placeholder="Фильм" type="text" autoComplete="off" />
          <span className={'search__span search__span_active'}>{inputError}</span>
        </div>
        <button type="submit" className="search__button"></button>

      </div>

      <div className="search__toggle">
        <label className="search__tumbler">
          <input className="search__checkbox" type="checkbox" onChange={checkboxChange} checked={isChecked} />
          <span className="search__slider" />
        </label>
        <p className="search__films">Короткометражки</p>
      </div>

    </form>
  );
}

export default SearchForm;