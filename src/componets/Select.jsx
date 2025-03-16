import React from "react";
import style from "./InputPedido.module.css";

function Select({ id, label, options, setValue, ...props }) {
  return (
    <div className={style.selectContainer}>
      <label className={style.label} htmlFor={id}>{label}</label>
      <select className={style.select}
        id={id}
        name={id}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      >
        <option disabled value="">
          Selecione
        </option>
        {options.map(({value, nome}) => (<option key={value} value={value}>{nome}</option>))}
      </select>
    </div>
  );
}

export default Select;
