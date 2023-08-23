import React from 'react';

export default function FormInput(props) {
  const {
    name,
    label,
    type,
    autoComplete,
    value,
    onChange,
    errorText,
    isRequired,
    minLength,
    maxLength,
  } = props;
  return (
    <label className="form-input">
      <span className="form-input__label-text">{label}</span>
      <input
        className={errorText ? 'form-input__input form-input__input_error' : 'form-input__input'}
        type={type}
        autoComplete={autoComplete}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onChange}
        required={isRequired}
        minLength={minLength}
        maxLength={maxLength}
      />
      <span className="form-input__error-message">{errorText}</span>
    </label>
  );
}
