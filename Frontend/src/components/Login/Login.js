import React from 'react';

import FullPageForm from '../FullPageForm/FullPageForm';
import FormInput from '../FormInput/FormInput';
import useFormWithValidation from '../../utils/useFormWithValidation';

export default function Login(props) {
  // Get submit handler
  const { onLoginClick, error, setError } = props;

  // Turn on form validation
  const formValidation = useFormWithValidation(false);

  // Create states for form
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  const [formValidity, setFormValidity] = React.useState({
    email: true,
    password: true,
  });

  // Clear inputs
  function ClearInputs() {
    setFormValue({
      email: '',
      password: '',
    });
    setFormValidity({
      email: true,
      password: true,
    });
  }

  // Clear error
  function ClearError() {
    setError('');
  }

  // Clear form
  React.useEffect(() => {
    ClearInputs();
    ClearError();
  }, []);

  // Submit handler
  async function handleSubmit(e) {
    e.preventDefault();

    onLoginClick(formValue);

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

  return (
    <main className="login">
      <FullPageForm name="login" title="Рады видеть!" buttonText="Войти" questionText="Ещё не зарегистрированы?" linkText="Регистрация" linkPath="/signup" onSubmit={handleSubmit} isValid={formValidation.isValid} error={error}>
        <FormInput name="email" label="E-mail" type="email" pattern="\S+@\S+\.\S+" autoComplete="email" value={formValue.email} onChange={handleChange} errorText={formValidation.errors.email} isValid={formValidity.email} isRequired />
        <FormInput name="password" label="Пароль" type="password" autoComplete="current-password" value={formValue.password} onChange={handleChange} errorText={formValidation.errors.password} isValid={formValidity.password} isRequired />
      </FullPageForm>
    </main>
  );
}
