import React from "react";
import style from "./InputPedido.module.css";

function InputPedido({ id, label, value, error, validate, onChange, onBlur, setValue, setError, isRequired,  ...props }) {
  
  return (
    <div>
      <label className={style.label} htmlFor={id}>{label}<span className={style.requiredSpan}>{isRequired() ? "*" : ""}</span></label>
      <input className={style.input}
        id={id}
        name={id}
        type="text"
        autoComplete="off"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {error && (<p className={style.mensagemErro}>{error}</p>)}
    </div>
  );
}

export default InputPedido;
