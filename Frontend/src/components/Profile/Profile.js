import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/useFormWithValidation';

export default function Profile(props) {
  // Get current user info from context
  const currentUser = React.useContext(CurrentUserContext);

  const {
    onLogoutClick,
    onUpdateUserClick,
    error,
    setError,
    isEditable,
    setIsEditable,
    successMessage,
    setSuccessMessage,
  } = props;

  // Get navigate function
  const navigate = useNavigate();

  // Create form validation object
  const formValidation = useFormWithValidation(false);

  // State for form values
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
  });

  // State for form validity
  const [formValidity, setFormValidity] = React.useState({
    name: true,
    email: true,
  });

  // State to track if form data matches current user data
  const [isCurrentUserData, setIsCurrentUserData] = React.useState(true);

  // Function to clear form inputs
  function clearInputs() {
    setFormValue({
      name: currentUser.name,
      email: currentUser.email,
    });
    setFormValidity({
      name: true,
      email: true,
    });
  }

  // Function to clear form error
  function clearError() {
    setError('');
  }

  // Function to clear success message
  function clearSuccessMessage() {
    setSuccessMessage('');
  }

  // Clear form data and error messages on component mount
  useEffect(() => {
    clearInputs();
    clearError();
    clearSuccessMessage();
  }, []);

  // Set current user info as form values when currentUser changes
  useEffect(() => {
    setFormValue({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUserClick(formValue);

    clearInputs();
    formValidation.resetForm();
  }

  // Input change handler
  function handleChange(e) {
    clearError();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    formValidation.handleChange(e);
    setFormValidity({ ...formValidity, [e.target.name]: e.target.checkValidity() });
  }

  // Edit button click handler
  function onEditClick() {
    clearSuccessMessage();
    setIsEditable(true);
  }

  // Logout button click handler
  function handleLogoutClick() {
    onLogoutClick();
    setIsEditable(false);
    navigate('/');
  }

  // Check if form data matches current user data
  useEffect(() => {
    if (formValue.name === currentUser.name && formValue.email === currentUser.email) {
      setIsCurrentUserData(true);
    } else {
      setIsCurrentUserData(false);
    }
  }, [formValue]);

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
              pattern="\S+@\S+\.\S+"
              required
              onChange={handleChange}
              onBlur={handleChange}
              value={formValue.email}
              disabled={!isEditable}
            />
          </label>
        </div>

        <div className="profile__button-wrapper">
          <span className="profile__success-message">{successMessage}</span>
          <span className="profile__error">{formValidation.errors.name || formValidation.errors.email || error}</span>
          <button className={`profile__button ${isEditable ? 'profile__button_hidden' : ''}`} type="button" onClick={onEditClick}>Редактировать</button>
          <button className={`profile__button profile__button_type_logout ${isEditable ? 'profile__button_hidden' : ''}`} type="button" onClick={handleLogoutClick}>Выйти из аккаунта</button>
          <button className={`profile__button profile__button_type_submit ${isEditable ? '' : 'profile__button_hidden'} ${!formValidation.isValid || isCurrentUserData ? 'profile__button_disabled' : ''}`} type="submit" disabled={!formValidation.isValid || isCurrentUserData}>Сохранить</button>
        </div>
      </form>
    </main>
  );
}
