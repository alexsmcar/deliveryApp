import React, { useContext } from "react";
import style from "./BtnAdicionar.module.css";
import { CarrinhoContext } from "./carrinhoDeCompras/CarrinhoContext";
import { useNavigate } from "react-router-dom";

function BtnAdicionar({ formatValue, valor, nomeItem, img, ...props }) {
  const carrinhoItens = useContext(CarrinhoContext);

  const navigate = useNavigate();

  function adicionarAoCarrinho() {
    carrinhoItens.setCarrinho((prev) => {
      return [
        ...prev,
        {
          id: prev.length < 1 ? 1 : prev[prev.length - 1].id + 1,
          imgItem: img,
          nomeItem,
          quantidade: 1,
          valor,
          observacao: props.obs ? props.obs : "",
          adicionais:
            props.totalAdicionais?.length > 0 ? props.totalAdicionais : [],
        },
      ];
    });
    document.body.style.overflow = "";
    navigate("/carrinho")
  }
  
  return (
    <div className={style.addCarrinhoContainer}>
      <button onClick={adicionarAoCarrinho} className={style.btnAdicionar}>
        <span>Adicionar</span>
        <span>{formatValue(valor)}</span>
      </button>
    </div>
  );
}

export default BtnAdicionar;
