import React, { useContext, useEffect, useState } from "react";
import style from "./FinalizarPedido.module.css";
import Select from "./Select";
import Navegacao from "./navegacao";
import { CarrinhoContext } from "./carrinhoDeCompras/CarrinhoContext";
import { formatValue } from "../helpers/Helpers";
import { useNavigate } from "react-router-dom";
import ModalPedido from "./modalPedido/ModalPedido";
import Head from "../helpers/Head"

function Pagamento() {
  const [pagamento, setPagamento] = useState("");
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const endereco = useContext(CarrinhoContext);
  const navigate = useNavigate();
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

  function redirect() {
    if (endereco.carrinho.length < 1) {
      navigate("/");
    }
  }

  function getUserData(object) {
    let itens = [];
    for (let key in object) {
      itens = [
        ...itens,
        {
          nome: key,
          value: object[key],
        },
      ];
    }
    return itens;
  }

  useEffect(() => {
    redirect();
  }, [endereco.carrinho]);

  useEffect(() => {
    setTotal(() => {
      return endereco.carrinho.reduce((prev, { valor, quantidade }) => {
        return prev + valor * quantidade;
      }, 0);
    });
  }, [endereco.carrinho]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!pagamento) {
      setError("Campo não preenchido");
    } else {
      setModal(true);
    }
  }

  return (
    <main className="conteudoPrincipal">
      <Head text="Pagamento"/>
      <form onSubmit={handleSubmit}>
        <div className={`${style.container} ${style.containerPagamento}`}>
          <span className={style.finalizarPedido}>Finalizar Pagamento</span>
          <div className={style.infoContainer}>
            <div className={style.dadosClienteContainer}>
              <h2 className={style.subTitulo}>Dados do Cliente:</h2>
              <div className={style.dataContainer}>
                {getUserData(endereco.endereco).map((data) => {
                  return <p key={data.nome}>{`${data.nome}: ${data.value}`}</p>;
                })}
              </div>
            </div>
            <div className={style.dadosClienteContainer}>
              <h2 className={style.subTitulo}>Itens do Carrinho:</h2>
              <div
                className={`${style.dataContainer} ${style.itensCarrinhoContainer}`}
              >
                {endereco.carrinho.map((item) => {
                  return (
                    <div key={item.id}>
                      <div className={style.carrinhoContainer}>
                        <p className={style.nomeItem}>{item.nomeItem}</p>
                        <p>Qtd: {item.quantidade}</p>
                      </div>
                      {item.adicionais.length > 0 ? (
                        <div>
                          <p>Adicionais</p>
                          <div className={style.adicionaisContainer}>
                            {item.adicionais.map((adicional) => {
                              return (
                                <p>{`${adicional.quantidade}x ${adicional.adicional}`}</p>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}

                      {item.observacao && <p>Obs: {item.observacao}</p>}
                      <p className={style.preco}>
                        {formatValue(item.valor * item.quantidade)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <Select
              id={"pagamento"}
              label={"Método de Pagamento"}
              options={optionsPag}
              setValue={setPagamento}
              value={pagamento}
              error={error}
              setError={setError}
            />
          </div>
        </div>
        <div className={style.pagamentoContainer}>
          <div className={style.pagamento}>
            <p>Total</p>
            <p>{formatValue(total)}</p>
          </div>
        </div>
        <Navegacao texto={"Finalizar Pedido"} rota={"/entrega"} />
      </form>
      {modal && <ModalPedido />}
    </main>
  );
}

export default Pagamento;
