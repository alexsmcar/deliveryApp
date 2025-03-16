import React, { useState } from "react";
import style from "./FinalizarPedido.module.css";
import Select from "./Select";

function Pagamento() {
  const [pagamento, setPagamento] = useState("");
  const optionsPag = [
    {
      nome: "Dinheiro",
      value: "dinherio",
    },
    {
      nome: "Pix",
      value: "pix",
    },
    {
      nome: "Cartão de Crédito",
      value: "credito",
    },
    {
      nome: "Cartão de Dédito",
      value: "debito",
    },
  ];
  return (
    <main className="conteudoPrincipal">
      <form onSubmit={(event) => event.preventDefault()}>
        <div className={style.container}>
          <span className={style.finalizarPedido}>Finalizar Pagamento</span>
          <div className={style.infoContainer}>
            <Select
              id={"pagamento"}
              label={"Método de Pagamento"}
              options={optionsPag}
              setValue={setPagamento}
              value={pagamento}
            />
          </div>
        </div>
      </form>
    </main>
  );
}

export default Pagamento;
