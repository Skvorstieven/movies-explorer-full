import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div className="search-form">
      <form className="search-form__form">
        <input className="search-form__input" type="search" placeholder="Фильм" required />
        <button className="search-form__button" type="submit">Поиск</button>
      </form>
      <FilterCheckbox isChecked={isChecked} setIsChecked={setIsChecked} text="Короткометражки" name="short-movies-filter" />
    </div>
  );
}
