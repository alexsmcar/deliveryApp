import React, { useContext } from "react";
import style from "./BtnAdicionar.module.css";
import { CarrinhoContext } from "./carrinhoDeCompras/CarrinhoContext";

function BtnAdicionar({ formatValue, valor, nomeItem, img, ...props }) {
  const carrinhoItens = useContext(CarrinhoContext);

  function adicionarAoCarrinho() {
    carrinhoItens.SetCarrinho((prev) => {
      return [
        ...prev,
        {
          imgItem: img,
          nomeItem,
          quantidade: 1,
          observacao: props.obs ? props.obs : "",
          adicionais:
            props.totalAdicionais?.length > 0 ? props.totalAdicionais : [],
        },
      ];
    });
  }

  console.log(carrinhoItens.carrinho);
  
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
