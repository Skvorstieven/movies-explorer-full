import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm(props) {
  // Destructure props
  const {
    selectShortMovies,
    setSelectShortMovies,
    onSearchSubmit,
    searchValue,
    setSearchValue,
    disabled = false,
  } = props;

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Call the onSearchSubmit function with searchValue and selectShortMovies as arguments
    onSearchSubmit(searchValue, selectShortMovies);
  }

  // Function to handle input value change
  function handleChange(e) {
    // Update the searchValue state when the input value changes
    setSearchValue(e.target.value);
  }

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} disabled={disabled}>
        <input
          className="search-form__input"
          type="search"
          placeholder="Фильм"
          name="search"
          value={searchValue}
          onChange={handleChange}
          required
        />
        <button className="search-form__button" type="submit">
          Поиск
        </button>
      </form>
      <FilterCheckbox
        isChecked={selectShortMovies}
        setIsChecked={setSelectShortMovies}
        text="Короткометражки"
        name="short-movies-filter"
      />
    </div>
  );
}
