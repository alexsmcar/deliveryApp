import React, { useState } from "react";
import style from "./InputPedido.module.css";

function Select({ id, label, options, setValue, error,setError, ...props }) {
  function handleChange({target}) {
    setValue(target.value)
    setError(null)
  }
  return (
    <div className={style.selectContainer}>
      <label className={style.label} htmlFor={id}>{label}<span className={style.requiredSpan}>*</span></label>
      <select className={style.select}
        id={id}
        name={id}
        onChange={handleChange}
        {...props}
      >
        <option disabled value="">
          Selecione
        </option>
        {options.map(({value, nome}) => (<option key={value} value={value}>{nome}</option>))}
      </select>
      {error && (<p className={style.mensagemErro}>{error}</p>)}
    </div>
  );
}

export default Select;
