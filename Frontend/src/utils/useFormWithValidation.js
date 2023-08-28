import React, { useCallback } from 'react';

export default function useFormWithValidation(isInitiallyValid) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(isInitiallyValid);

  // Handle input changes and validate them
  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    // Update the form values
    setValues({ ...values, [name]: value });

    // Use the browser's built-in validationMessage to get input-specific error messages
    setErrors({ ...errors, [name]: target.validationMessage });

    // Check overall form validity
    setIsValid(target.closest('form').checkValidity());
  };

  // Reset form values, errors, and validity
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = isInitiallyValid) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, isInitiallyValid],
  );

  return {
    values, // An object containing the current input values
    handleChange, // A function to handle input changes and validation
    errors, // An object containing validation errors for each input
    isValid, // A boolean indicating whether the whole form is valid
    resetForm, // A function to reset form values, errors, and validity
  };
}
