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
    isValid,
    pattern,
    disabled,
  } = props;
  return (
    <label className="form-input">
      <span className="form-input__label-text">{label}</span>
      <input
        className={isValid ? 'form-input__input' : 'form-input__input form-input__input_error'}
        type={type}
        autoComplete={autoComplete}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onChange}
        required={isRequired}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        disabled={disabled}
      />
      <span className="form-input__error-message">{errorText}</span>
    </label>
  );
}
