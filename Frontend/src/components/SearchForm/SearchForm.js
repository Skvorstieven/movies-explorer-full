import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm(props) {
  const {
    selectShortMovies,
    setSelectShortMovies,
    onSearchSubmit,
    searchValue,
    setSearchValue,
  } = props;

  function handleSubmit(e) {
    e.preventDefault();

    onSearchSubmit(searchValue);
  }

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input className="search-form__input" type="search" placeholder="Фильм" name="search" value={searchValue} onChange={handleChange} required />
        <button className="search-form__button" type="submit">Поиск</button>
      </form>
      <FilterCheckbox isChecked={selectShortMovies} setIsChecked={setSelectShortMovies} text="Короткометражки" name="short-movies-filter" />
    </div>
  );
}
