import React, { useContext, useEffect, useState } from "react";
import style from "./Carrinho.module.css";
import { CarrinhoContext } from "./CarrinhoContext";
import { formatValue } from "../../helpers/Helpers";
import { Link } from "react-router-dom";
import AlterarQtd from "./AlterarQtd";
import AddIcon from "../../compentes-icons/AddIcon";
import LixeiraIcon from "../../compentes-icons/LixeiraIcon";

function Carrinho() {
  const carrinhoDeCompras = useContext(CarrinhoContext);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setSubTotal(() => {
      return carrinhoDeCompras.carrinho.reduce(
        (prev, { valor, quantidade }) => prev + valor * quantidade,
        0
      );
    });
  }, [carrinhoDeCompras.carrinho]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <main className="conteudoPrincipal">
      <div>
        <div className={style.carrinhoContainer}>
          {carrinhoDeCompras.carrinho.length > 0 ? (
            carrinhoDeCompras.carrinho.map((item) => {
              return (
                <div key={item.id} className={style.itensDoCarrinho}>
                  <div className={style.infoItens}>
                    <div>
                      <img
                        className={style.img}
                        src={item.imgItem}
                        alt={item.nomeItem}
                      />
                    </div>
                    <div>
                      <h2 className={style.nomeItem}>
                        <span className={style.quantidade}>
                          {item.quantidade}x
                        </span>
                        {item.nomeItem}
                      </h2>
                      <p className={style.valor}>{formatValue(item.valor)}</p>
                      {item.adicionais.length > 0 ? (
                        <div className={style.adicionalContainer}>
                          <p className={style.adicionalTitulo}>Adicionais</p>
                          {item.adicionais.map((adicional) => {
                            return (
                              <p
                                key={adicional.adicional}
                                className={style.adicional}
                              >
                                <span className={style.quantidade}>
                                  {adicional.quantidade}x
                                </span>
                                {adicional.adicional}
                              </p>
                            );
                          })}
                        </div>
                      ) : null}
                      {item.observacao ? (
                        <p className={style.obs}>obs: {item.observacao}</p>
                      ) : null}
                    </div>
                  </div>
                  <AlterarQtd item={item} />
                </div>
              );
            })
          ) : (
            <p className={style.carrinhoVazio}>
              {":( nenhum item no carrinho"}
            </p>
          )}
        </div>{" "}
        <div className={style.subTotal}>
          <p>Sub-total</p>
          <p>{formatValue(subTotal)}</p>
        </div>
      </div>
      <ul className={style.acoes}>
        <li className={style.fecharPedido}>
          {carrinhoDeCompras.carrinho.length > 0 ? (
            <Link
              to={"/finalizar-pedido"}
              className={`${style.btns} ${style.btnAvancar}`}
            >
              Fechar Pedido
            </Link>
          ) : (
            <Link to={"/"} className={`${style.btns} ${style.btnAvancar}`}>
              Ver Cardápio
            </Link>
          )}
        </li>
        <li>
          {
            <Link to={"/"} className={`${style.btns} ${style.btnsHover}`}>
              <AddIcon size={"16px"} fill={"#000000"} />
              Continuar Comprando
            </Link>
          }
        </li>
        <li>
          <button
            onClick={() => carrinhoDeCompras.setCarrinho([])}
            className={`${style.btns} ${style.btnsHover}`}
          >
            <LixeiraIcon size={"16px"} fill={"#000000"} />
            Limpar Carrinho
          </button>
        </li>
      </ul>
    </main>
  );
}

export default Carrinho;
