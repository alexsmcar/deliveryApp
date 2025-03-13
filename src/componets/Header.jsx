import React from "react";
import Logo from "../assets/logo.jpg";
import Menu from "./Menu";
import style from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={style.headerContainer}>
      <div className={style.header}>
        <div className={style.logoContainer}>
          <Link to={"/"}>
            <img src={Logo} alt="logo" />
          </Link>
          <p>Hamburgueria</p>
        </div>
        <Menu />
      </div>
    </header>
  );
}

export default Header;
