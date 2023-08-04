import { useEffect, useMemo, useState } from "react";

const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setformValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckdValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      formCheckdValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setformValidation(formCheckdValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    setFormState,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};

export default useForm;
