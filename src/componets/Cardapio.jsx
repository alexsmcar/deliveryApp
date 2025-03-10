import React, { useState, useEffect } from "react";
import style from "./Cardapio.module.css";
import ItensCategoria from "./ItensCategoria";

function Cardapio() {
  const [pesquisa, setPesquisa] = useState("");
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [cardapio, SetCardapio] = useState([]);

  const request = async () => {
    const response = await fetch("./cardapio.json");
    const json = await response.json();
    setData(json);
    SetCardapio(json)
  };

  useEffect(() => {
    request();
  }, []); 

  useEffect(() => {
    if (pesquisa.length > 0) {
      const listaCardapio = data
        .map((cat) => {
          const elements = cat.itens.filter((el) => {
            if (el.nome.toLowerCase().includes(pesquisa.toLowerCase())) {
              return el;
            }
          });
          if (elements.length > 0) {
            return {...cat, itens: elements};
          } else {
            return null;
          }
        })
        .filter((lista) => lista);
      SetCardapio(listaCardapio);
    } else {
      SetCardapio(data);
    }
  }, [pesquisa]);


  return (
    <section className={style.container}>
      <form
        className={`${style.form} ${form && style.active}`}
        value={pesquisa}
        onBlur={() => setForm(false)}
        onFocus={() => setForm(true)}
      >
        <input
          className={style.pesquisa}
          onChange={({ target }) => setPesquisa(target.value)}
          type="text"
          autoComplete="off"
          placeholder="Digite para buscar no cardápio..."
        />
        <button></button>
      </form>
      {data && <ItensCategoria data={cardapio} pesquisa={pesquisa} />}
    </section>
  );
}

export default Cardapio;
