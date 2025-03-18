import React, { use, useContext, useEffect, useState } from "react";
import style from "./FinalizarPedido.module.css";
import InputPedido from "./InputPedido";
import Select from "./Select";
import Endereco from "./Endereco";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import Navegacao from "./navegacao";
import { CarrinhoContext } from "./carrinhoDeCompras/CarrinhoContext";
import Head from "../helpers/Head"

function FinalizarPedido() {
  const [entrega, setEntrega] = useState("");
  const [error, setError] = useState(null);
  const nome = useForm("nome");
  const whats = useForm("whats");
  const cep = useForm("cep");
  const rua = useForm("rua");
  const numero = useForm("numero");
  const bairro = useForm("bairro");
  const cidade = useForm("cidade");
  const complemento = useForm();

  const navigate = useNavigate();
  const endereco = useContext(CarrinhoContext);

  function handleSubmit(event) {
    event.preventDefault();
    const array = [nome, whats, cep, numero, rua, bairro, cidade];
    const isCompleted = array.every((prev) => {
      return prev.validate();
    });
    if (isCompleted && entrega === "entrega") {
      endereco.setEndereco(() => {
        return {
          nome: nome.value,
          whats: whats.value,
          entrega,
          cep: cep.value,
          rua: rua.value,
          numero: numero.value,
          bairro: bairro.value,
          cidade: cidade.value,
        };
      });
      navigate("/pagamento");
    } else if (entrega === "retirada" && nome.validate && whats.validate) {
      endereco.setEndereco(() => {
        return {
          nome: nome.value,
          whats: whats.value,
          entrega,
        };
      });
      navigate("/pagamento");
    } else if(!entrega) {
      setError("campo não preenchido")
    }
  }

  useEffect(() => {
    if (Object.keys(endereco.endereco).length > 0) {
      nome.setValue(endereco.endereco.nome);
      whats.setValue(endereco.endereco.whats);
      setEntrega(endereco.endereco.entrega);
      if (endereco.endereco.entrega === "entrega") {
        cep.setValue(endereco.endereco.cep);
        rua.setValue(endereco.endereco.rua);
        bairro.setValue(endereco.endereco.bairro);
        cidade.setValue(endereco.endereco.cidade);
        numero.setValue(endereco.endereco.numero);
        complemento.setValue(endereco.endereco.complemento);
      }
    }
  }, []);

  useEffect(() => {
    if (endereco.carrinho.length < 1) {
      navigate("/");
    }
  }, [endereco.carrinho]);
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
      <Head text="Entrega"/>
      <form onSubmit={handleSubmit}>
        <div className={style.container}>
          <span className={style.finalizarPedido}>Informações de Entrega</span>
          <div className={style.infoContainer}>
            <InputPedido id={"nome"} label={"Nome"} {...nome} />
            <InputPedido
              id={"telefone"}
              label={"Whatsapp"}
              placeholder={"(_ _) _ _ _ _ _ - _ _ _ _"}
              {...whats}
            />
            <Select
              id={"pagamento"}
              label={"Como deseja receber seu pedido?"}
              setValue={setEntrega}
              options={optionsDelivery}
              value={entrega}
              error={error}
              setError={setError}
            />
            {entrega === "entrega" && (
              <Endereco
                cep={cep}
                rua={rua}
                numero={numero}
                bairro={bairro}
                complemento={complemento}
                cidade={cidade}
              />
            )}
          </div>
        </div>
        <Navegacao texto={"Ir Para o Pagamento"} rota={"/carrinho"} />
      </form>
    </main>
  );
}

export default FinalizarPedido;
