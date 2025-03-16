import React, { useContext, useEffect, useState } from "react";
import style from "./Footer.module.css";
import InicioIcon from "../compentes-icons/InicioIcon";
import CarrinhoIcon from "../compentes-icons/CarrinhoIcon";
import { NavLink } from "react-router-dom";
import { CarrinhoContext } from "../componets/carrinhoDeCompras/CarrinhoContext";

function Footer() {
  const carrinhosDeCompras = useContext(CarrinhoContext);
  const [qtdCarrinho, setQtdCarrinho] = useState();

  function handleNav({ isActive }) {
    if (isActive) {
      return `${style.btn} ${style.active}`;
    } else {
      return style.btn;
    }
  }

  useEffect(() => {
    setQtdCarrinho(() => {
      return carrinhosDeCompras.carrinho.reduce((prev, { quantidade }) => {
        return prev + quantidade;
      }, 0);
    });
  }, [carrinhosDeCompras.carrinho]);
  return (
    <footer className={style.footerContainer}>
      <div className={style.footer}>
        <NavLink className={handleNav} to={"/"} end>
          <InicioIcon size={"22px"} />
          <span className={style.text}>Inicio</span>
        </NavLink>
        <NavLink className={handleNav} to={"/carrinho"} end>
          {carrinhosDeCompras.carrinho.length > 0 ? (
            <span className={style.itensCarrinho}>{qtdCarrinho}</span>
          ) : null}
          <CarrinhoIcon size={"22px"} />
          <span className={style.text}>Carrinho</span>
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
