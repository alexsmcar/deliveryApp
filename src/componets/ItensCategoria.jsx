import React, {useState} from "react";
import style from "./ItensCategoria.module.css";
import ItensCardapio from "./ItensCardapio";



function ItensCategoria({ data, pesquisa }) {
  const [status, setStatus] = useState({});
  function handleClick(id) {
    setStatus((prev)=> {
      return {
        ...prev,
        [id]: !prev[id],
      }
    })
  }

  return (
    <div className={style.container}>
      {data.map(({ id, categoria, itens }) => {
        return (
          <div key={id} className={style.categoriaContainer}>
            <button className={style.categoria} onClick={() => handleClick(id)} aria-expanded={pesquisa ? true: status[id] || false}>
              <h2 className={style.nomeCategoria}>{categoria}</h2>
            </button>
            <ItensCardapio itens={itens} status={pesquisa ? true: status[id] || false} />
          </div>
        );
      })}
    </div>
  );
}

export default ItensCategoria;
