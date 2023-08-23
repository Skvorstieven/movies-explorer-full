import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

export default function FullPageForm(props) {
  const {
    name,
    title,
    buttonText,
    questionText,
    linkText,
    linkPath,
    onSubmit,
    isValid,
    error,
    children,
  } = props;

  return (
    <div className="full-page-form">
      <Logo />
      <h2 className="full-page-form__title">{title}</h2>
      <form className="full-page-form__form" name={name} onSubmit={onSubmit} noValidate>
        {children}
        <div className="full-page-form__button-wrapper">
          <span className="full-page-form__error">{error}</span>
          <button className={isValid ? 'full-page-form__button' : 'full-page-form__button full-page-form__button_disabled'} type="submit" disabled={!isValid}>{buttonText}</button>
          <div className="full-page-form__bottom-text-wrapper">
            <span className="full-page-form__question-text">{questionText}</span>
            <Link className="full-page-form__link" to={linkPath}>{linkText}</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
