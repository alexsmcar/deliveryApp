import React, { useState } from "react";
import style from "./FinalizarPedido.module.css";
import InputPedido from "./InputPedido";
import Select from "./Select";
import Endereco from "./Endereco";
import { NavLink, Link, useNavigate } from "react-router-dom";

function FinalizarPedido() {
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [entrega, setEntrega] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/pagamento");
  }

  const optionsDelivery = [
    {
      nome: "Entrega",
      value: "entrega",
    },
    {
      nome: "Retirada",
      value: "retirada",
    },
  ];
  return (
    <main className="conteudoPrincipal">
      <form onSubmit={handleSubmit}>
        <div className={style.container}>
          <span className={style.finalizarPedido}>Finalizar Pedido</span>
          <div className={style.infoContainer}>
            <InputPedido
              id={"nome"}
              label={"Nome"}
              value={nome}
              setValue={setNome}
            />
            <InputPedido
              id={"telefone"}
              label={"Whatsapp"}
              value={whats}
              setValue={setWhats}
              placeholder={"(_ _) _ _ _ _ _ - _ _ _ _"}
            />
            <Select
              id={"pagamento"}
              label={"Como deseja receber seu pedido?"}
              setValue={setEntrega}
              options={optionsDelivery}
              value={entrega}
            />
            {entrega === "entrega" && (
              <Endereco
                setCep={setCep}
                cep={cep}
                rua={rua}
                setRua={setRua}
                numero={numero}
                setNumero={setNumero}
                bairro={bairro}
                setBairro={setBairro}
                complemento={complemento}
                setComplemento={setComplemento}
              />
            )}
          </div>
        </div>
        <div className={style.nav}>
          <Link className={style.btn} to={"/carrinho"}>
            Voltar
          </Link>
          <button className={`${style.btn} ${style.avancar}`}>
            Ir Para o Pagamento
          </button>
        </div>
      </form>
    </main>
  );
}

export default FinalizarPedido;
