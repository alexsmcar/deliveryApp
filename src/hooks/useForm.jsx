import React, { useState } from "react";

const types = {
  cep: {
    regex: /^\d{5}-?\d{3}$/,
    message: "CEP inválido",
  },
  whats: {
    regex: /^\(?(\d{2})\)?\s?(\d{5})-?(\d{4})$/,
    message: "Whatsapp inválido",
  },
};
const useForm = (type) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  function validate() {
    if (!type) return true;
    if (value.length === 0) {
      setError("Campo não poder ser vazio");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
    //   setError(null);
      return true;
    }
  }

  function isRequired() {
    if (!type) return false
    else return true
  }
  function onChange({ target }) {
    if (error) setError(null);
    setValue(target.value);
  }

  function onBlur() {
    validate(value);
  }

  return {
    value,
    error,
    validate,
    setValue,
    onChange,
    setError,
    onBlur,
    isRequired
  };
};

export default useForm;
