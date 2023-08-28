import React from 'react';

export default function FilterCheckbox(props) {
  const {
    isChecked,
    setIsChecked,
    text,
    name,
  } = props;

  // Change checkbox state
  function onChange() {
    setIsChecked(!isChecked);
  }

  return (
    <div className="filter-checkbox">
      <input className="filter-checkbox__input" type="checkbox" name={name} checked={isChecked} onChange={onChange} />
      <span className="filter-checkbox__text">{text}</span>
    </div>
  );
}
