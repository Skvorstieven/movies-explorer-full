import React from 'react';
import { useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/useFormWithValidation';

export default function Profile(props) {
  // Get current user info
  const currentUser = React.useContext(CurrentUserContext);

  // Get navigate
  const navigate = useNavigate();

  // Get logout handler
  const {
    onLogoutClick,
    onUpdateUserClick,
    error,
    setError,
    isEditable,
    setIsEditable,
  } = props;

  // Turn on form validation
  const formValidation = useFormWithValidation(false);

  // Create states for form
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
  });

  const [formValidity, setFormValidity] = React.useState({
    name: true,
    email: true,
  });

  // Clear inputs
  function ClearInputs() {
    setFormValue({
      name: currentUser.name,
      email: currentUser.email,
    });
    setFormValidity({
      name: true,
      email: true,
    });
  }

  // Clear error
  function ClearError() {
    setError('');
  }

  // Clear form on mount
  React.useEffect(() => {
    ClearInputs();
    ClearError();
  }, []);

  // Set current user info as form values
  React.useEffect(() => {
    setFormValue({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUserClick(formValue);

    ClearInputs();

    formValidation.resetForm();
  }

  // Input change handler
  function handleChange(e) {
    ClearError();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    formValidation.handleChange(e);
    setFormValidity({ ...formValidity, [e.target.name]: e.target.checkValidity() });
  }

  // Edit button click handler
  function onEditClick() {
    setIsEditable(true);
  }

  // Logout button click handler
  function handleLogoutClick() {
    onLogoutClick();
    setIsEditable(false);
    navigate('/');
  }

  return (
    <main className="profile">
      <h2 className="profile__title">
        Привет,
        {' '}
        {currentUser.name}
        !
      </h2>

      <form className="profile__form" onSubmit={handleSubmit} noValidate>

        <div className="profile__input-wrapper">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              className="profile__input"
              type="text"
              placeholder="Имя"
              name="name"
              autoComplete="given-name"
              minLength="2"
              maxLength="30"
              required
              onChange={handleChange}
              onBlur={handleChange}
              value={formValue.name}
              disabled={!isEditable}
            />
          </label>

          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              className="profile__input"
              type="email"
              placeholder="E-mail"
              name="email"
              autoComplete="email"
              required
              onChange={handleChange}
              onBlur={handleChange}
              value={formValue.email}
              disabled={!isEditable}
            />
          </label>
        </div>
        <div className="profile__button-wrapper">
          <button className={`profile__button ${isEditable ? 'profile__button_hidden' : ''}`} type="button" onClick={onEditClick}>Редактировать</button>
          <button className={`profile__button profile__button_type_logout ${isEditable ? 'profile__button_hidden' : ''}`} type="button" onClick={handleLogoutClick}>Выйти из аккаунта</button>
          <span className="profile__error">{formValidation.errors.name || formValidation.errors.email || error}</span>
          <button className={`profile__button profile__button_type_submit ${isEditable ? '' : 'profile__button_hidden'}`} type="submit">Сохранить</button>
        </div>
      </form>
    </main>
  );
}
