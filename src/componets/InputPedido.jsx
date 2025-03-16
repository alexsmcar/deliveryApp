import React from "react";
import style from "./InputPedido.module.css";

function InputPedido({ id, label, setValue,  ...props }) {
  return (
    <div>
      <label className={style.label} htmlFor={id}>{label}</label>
      <input className={style.input}
        id={id}
        name={id}
        type="text"
        autoComplete="off"
        {...props}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
}

export default InputPedido;
