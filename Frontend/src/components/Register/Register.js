import React from 'react';

import FullPageForm from '../FullPageForm/FullPageForm';
import FormInput from '../FormInput/FormInput';
import useFormWithValidation from '../../utils/useFormWithValidation';

export default function Register(props) {
  // Get login handler
  const { onRegisterClick, error, setError } = props;

  // Turn on form validation
  const formValidation = useFormWithValidation(false);

  // Create states for form
  const [formValue, setFormValue] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [formValidity, setFormValidity] = React.useState({
    name: true,
    email: true,
    password: true,
  });

  // Clear inputs
  function ClearInputs() {
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
  function handleSubmit(e) {
    e.preventDefault();

    onRegisterClick(formValue);

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
    <main className="register">
      <FullPageForm name="register" title="Добро пожаловать!" buttonText="Зарегистрироваться" questionText="Уже зарегистрированы?" linkText="Войти" linkPath="/signin" onSubmit={handleSubmit} isValid={formValidation.isValid} error={error}>
        <FormInput name="name" label="Имя" type="text" autoComplete="given-name" value={formValue.name} onChange={handleChange} errorText={formValidation.errors.name} isRequired minLength={2} maxLength={30} />
        <FormInput name="email" label="E-mail" type="email" autoComplete="email" value={formValue.email} onChange={handleChange} errorText={formValidation.errors.email} isRequired />
        <FormInput name="password" label="Пароль" type="password" autoComplete="new-password" value={formValue.password} onChange={handleChange} errorText={formValidation.errors.password} isRequired />
      </FullPageForm>
    </main>
  );
}
