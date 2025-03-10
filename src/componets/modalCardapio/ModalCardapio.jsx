import React, { useEffect, useState } from "react";
import style from "./ModalCardapio.module.css";
import Seta from "../../compentes-icons/seta";
import Adicionais from "../Adicionais";

function ModalCardapio({ item, setModal, formatValue }) {
  function handleClick({ target, currentTarget }) {
    if (target === currentTarget) setModal(false);
  }

  return (
    <div className={style.container} onClick={handleClick}>
      <div className={style.pedido}>
        <div className={style.detalhes}>
          <button onClick={() => setModal(false)}>
            <Seta fill="#FFFFFF" classe={style.svg} />
          </button>
          <p>Detalhes</p>
        </div>
        <div className={style.infoItem}>
          <div className={style.imgContainer}>
            <img
              className={style.img}
              src={item.img}
              alt={item.descricao}
            ></img>
          </div>
          <div className={style.descricaoContainer}>
            <h1>{item.nome}</h1>
            <p className={style.preco}>{formatValue(item.preco)}</p>
            <p className={style.descricao}>{item.descricao}</p>
          </div>
        </div>
        <Adicionais
          adicionais={item.adicionais}
          item={item}
          formatValue={formatValue}
        />
      </div>
    </div>
  );
}

export default ModalCardapio;
