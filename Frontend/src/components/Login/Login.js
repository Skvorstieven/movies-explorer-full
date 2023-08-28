import React from 'react';

import FullPageForm from '../FullPageForm/FullPageForm';
import FormInput from '../FormInput/FormInput';
import useFormWithValidation from '../../utils/useFormWithValidation';

export default function Login(props) {
  // Get submit handler and error from props
  const { onLoginClick, error, setError } = props;

  // State to control form input field disable/enable
  const [inputDisabled, setInputDisabled] = React.useState(false);

  // Initialize form validation hook
  const formValidation = useFormWithValidation(false);

  // State for form field values
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  // State for form field validity
  const [formValidity, setFormValidity] = React.useState({
    email: true,
    password: true,
  });

  // Function to clear form inputs
  function clearInputs() {
    setFormValue({
      email: '',
      password: '',
    });
    setFormValidity({
      email: true,
      password: true,
    });
  }

  // Function to clear error
  function clearError() {
    setError('');
  }

  // Clear form inputs and error when the component mounts
  React.useEffect(() => {
    clearInputs();
    clearError();
  }, []);

  // Submit handler
  async function handleSubmit(e) {
    e.preventDefault();

    // Call the login handler with the form values
    onLoginClick(formValue)
      .then(() => {
        clearInputs();
        setInputDisabled(false);
        formValidation.resetForm();
      });
  }

  // Input change handler
  function handleChange(e) {
    clearError();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    formValidation.handleChange(e);
    setFormValidity({ ...formValidity, [e.target.name]: e.target.checkValidity() });
  }

  return (
    <main className="login">
      <FullPageForm
        name="login"
        title="Рады видеть!"
        buttonText="Войти"
        questionText="Ещё не зарегистрированы?"
        linkText="Регистрация"
        linkPath="/signup"
        onSubmit={handleSubmit}
        isValid={formValidation.isValid}
        error={error}
        disabled={inputDisabled}
      >
        <FormInput
          name="email"
          label="E-mail"
          type="email"
          pattern="\S+@\S+\.\S+"
          autoComplete="email"
          value={formValue.email}
          onChange={handleChange}
          errorText={formValidation.errors.email}
          isValid={formValidity.email}
          isRequired
          disabled={inputDisabled}
        />
        <FormInput
          name="password"
          label="Пароль"
          type="password"
          autoComplete="current-password"
          value={formValue.password}
          onChange={handleChange}
          errorText={formValidation.errors.password}
          isValid={formValidity.password}
          isRequired
          disabled={inputDisabled}
        />
      </FullPageForm>
    </main>
  );
}
