import React, { useState, useContext } from "react";
import Adicionar from "../../compentes-icons/Adicionar";
import Remover from "../../compentes-icons/Remover";
import style from "./AlterarQtd.module.css";
import { CarrinhoContext } from "./CarrinhoContext";

function AlterarQtd({ item }) {
  const [qtdProdutos, setQtdProdutos] = useState(item.quantidade);
  const carrinhoDeCompras = useContext(CarrinhoContext);
  function handleAumentar(event) {
    setQtdProdutos((prevQtd) => {
      const newValor = ++prevQtd;
      carrinhoDeCompras.setCarrinho((prev) => {
        return prev.map((element) =>
          element.id === item.id
            ? { ...element, quantidade: newValor }
            : element
        );
      });
      return newValor;
    });
  }

  function handleDiminuir() {
    setQtdProdutos((prevQtd) => {
      const newValor = prevQtd > 1 ? --prevQtd : 0;
      carrinhoDeCompras.setCarrinho((prev) => {
        if (newValor)
          return prev.map((element) =>
            element.id === item.id
              ? { ...element, quantidade: newValor }
              : element
          );
        else return prev.filter((prevItem) => prevItem.id !== item.id);
      });
      return newValor;
    });
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
