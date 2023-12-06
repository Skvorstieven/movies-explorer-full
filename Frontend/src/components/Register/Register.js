import React from 'react';

import FullPageForm from '../FullPageForm/FullPageForm';
import FormInput from '../FormInput/FormInput';
import useFormWithValidation from '../../utils/useFormWithValidation';

export default function Register(props) {
  // Get the registration handler and error state from props
  const { onRegisterClick, error, setError } = props;

  // State for input field disable/enable
  const [inputDisabled, setInputDisabled] = React.useState(false);

  // Create a form validation object using the useFormWithValidation hook
  const formValidation = useFormWithValidation(false);

  // State for form input values
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  // State for form input validity
  const [formValidity, setFormValidity] = React.useState({
    name: true,
    email: true,
    password: true,
  });

  // Function to clear form inputs
  function clearInputs() {
    setFormValue({
      name: '',
      email: '',
      password: '',
    });
    setFormValidity({
      name: true,
      email: true,
      password: true,
    });
  }

  // Function to clear form error
  function clearError() {
    setError('');
  }

  // Clear form inputs and error on component mount
  React.useEffect(() => {
    clearInputs();
    clearError();
  }, []);

  // Submit handler for the registration form
  function handleSubmit(e) {
    e.preventDefault();
    setInputDisabled(true);

    // Call the registration handler with form values
    onRegisterClick(formValue)
      .then(() => {
        clearInputs();
        setInputDisabled(false);
        formValidation.resetForm();
      });
  }

  // Input change handler for form inputs
  function handleChange(e) {
    clearError();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    formValidation.handleChange(e);
    setFormValidity({ ...formValidity, [e.target.name]: e.target.checkValidity() });
  }

  return (
    <main className="register">
      <FullPageForm
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        questionText="Уже зарегистрированы?"
        linkText="Войти"
        linkPath="/signin"
        onSubmit={handleSubmit}
        isValid={formValidation.isValid}
        error={error}
        disabled={inputDisabled}
      >
        <FormInput
          name="name"
          label="Имя"
          type="text"
          autoComplete="given-name"
          value={formValue.name}
          onChange={handleChange}
          errorText={formValidation.errors.name}
          isValid={formValidation.isValid}
          isRequired
          minLength={2}
          maxLength={30}
          disabled={inputDisabled}
        />
        <FormInput
          name="email"
          label="E-mail"
          type="email"
          autoComplete="email"
          pattern="\S+@\S+\.\S+"
          value={formValue.email}
          onChange={handleChange}
          errorText={formValidation.errors.email}
          isValid={formValidation.isValid}
          isRequired
          disabled={inputDisabled}
        />
        <FormInput
          name="password"
          label="Пароль"
          type="password"
          autoComplete="new-password"
          value={formValue.password}
          onChange={handleChange}
          errorText={formValidation.errors.password}
          isValid={formValidation.isValid}
          isRequired
          disabled={inputDisabled}
        />
      </FullPageForm>
    </main>
  );
}
