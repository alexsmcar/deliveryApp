import React, { useState, useContext, useEffect } from "react";
import Adicionar from "../../compentes-icons/Adicionar";
import Remover from "../../compentes-icons/Remover";
import style from "./AlterarQtd.module.css";
import { CarrinhoContext } from "./CarrinhoContext";

function AlterarQtd({ item }) {
  const [qtdProdutos, setQtdProdutos] = useState(item.quantidade);
  const carrinhoDeCompras = useContext(CarrinhoContext);
  function handleAumentar() {
    setQtdProdutos((prevQtd) => prevQtd + 1) 
  }

 useEffect(() => {
  carrinhoDeCompras.setCarrinho((prev) => {
    if (qtdProdutos)
      return prev.map((element) =>
        element.id === item.id
          ? { ...element, quantidade: qtdProdutos }
          : element
      );
    else return prev.filter((prevItem) => prevItem.id !== item.id);
  });
  
 }, [qtdProdutos])

  function handleDiminuir() {
    setQtdProdutos((prevQtd) => prevQtd > 1 ? prevQtd - 1 : 0 )
  }

  return (
    <div className={style.alterarQtd}>
      <button onClick={handleDiminuir}>
        <Remover size={"20px"} fill={"var(--cinzaEscuro1)"} />
      </button>
      <span>{qtdProdutos}</span>
      <button onClick={handleAumentar}>
        <Adicionar size={"20px"} fill={"var(--vermelho)"} />
      </button>
    </div>
  );
}

export default AlterarQtd;
