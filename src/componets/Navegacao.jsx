import React from "react";
import style from "./navegacao.module.css"
import { Link} from "react-router-dom";

function Navegacao({rota, texto}) {
  return (
    <div className={style.nav}>
      <Link className={style.btn} to={rota}>
        Voltar
      </Link>
      <button className={`${style.btn} ${style.avancar}`}>
        {texto}
      </button>
    </div>
  );
}

export default Navegacao;
