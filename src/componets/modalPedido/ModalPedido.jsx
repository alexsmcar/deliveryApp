import React, { use, useContext } from "react";
import style from "./ModalPedido.module.css";
import OkIcon from "../../compentes-icons/OkIcon";
import { CarrinhoContext } from "../carrinhoDeCompras/CarrinhoContext";
import { useNavigate } from "react-router-dom";

function ModalPedido() {
  const dadosUser = useContext(CarrinhoContext);
  const navigate = useNavigate();
  function handleClick() {
    dadosUser.setCarrinho([]);
    dadosUser.setEndereco({});
    navigate("/");
  }

  function handleModalClick({target, currentTarget}) {
    if (target === currentTarget) {
        handleClick()
    }
  }

  return (
    <div className={style.container} onClick={handleModalClick}>
      <div className={style.modal}>
        <div className={style.mensagem}>
          <span className={style.svgContainer}>
            <OkIcon size={"80px"} fill={"var(--verde)"} />
          </span>
          <h2 className={style.modalSubTitulo}>Sucesso</h2>
          <p className={style.modalTexto}>Pedido efetuado com sucesso!</p>
          <button onClick={handleClick} className={style.btn}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPedido;
