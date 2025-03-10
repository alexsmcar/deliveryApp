import React, { useState, useEffect } from "react";
import style from "./Adicionais.module.css";
import Pesquisa from "../compentes-icons/Pesquisa";
import Adicionar from "../compentes-icons/Adicionar";
import Remover from "../compentes-icons/Remover";
import BtnAdicionar from "./BtnAdicionar";

function Adicionais({ item, formatValue }) {
  const [value, setValue] = useState("");
  const [valor, setValor] = useState(item.preco);
  const [adicionais, setAdicionais] = useState([]);
  const [obs, setObs] = useState("");
  const [qtd, setQtd] = useState({});

  function diminuir(id, preco) {
    setQtd((prev) => {
      return {
        ...prev,
        [id]: prev[id] > 0 ? prev[id] - 1 : 0,
      };
    });
    setValor((prev) => {
      return qtd[id] > 0 ? prev - preco : prev;
    });
  }

  function aumentar(id, preco) {
    setQtd((prev) => {
      return {
        ...prev,
        [id]: prev[id] + 1,
      };
    });
    setValor((prev) => {
      return prev + preco;
    });
  }

  useEffect(() => {
    if (value) {
      const add = item.adicionais.filter((prev) => {
        if (prev.nome.toLowerCase().includes(value.toLowerCase())) {
          return prev;
        }
      });
      setAdicionais(add);
    } else {
      setAdicionais(item.adicionais);
    }
  }, [value]);

  useEffect(() => {
    const value = item.adicionais.reduce((prev, item) => {
      return {
        ...prev,
        [item.id]: 0,
      };
    }, {});
    setQtd(value);
  }, []);

  let totalAdicionais = [];
  for (let chave in qtd) {
    if (qtd[chave] > 0) {
      const nomeAdicional = item.adicionais.find((add) => add.id === +chave);
      totalAdicionais.push({
        adicional: nomeAdicional.nome,
        quantidade: qtd[chave],
      });
    }
  }

  if (item.adicionais.length < 1)
    return (
      <BtnAdicionar
        valor={valor}
        formatValue={formatValue}
        nomeItem={item.nome}
        img={item.img}
        totalAdicionais={[]}
      />
    );
  return (
    <div>
      <div className={style.containerAdicional}>
        <h2>Deseja algum adicional?</h2>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            value={value}
            onChange={({ target }) => setValue(target.value)}
            autoComplete="off"
            autoCorrect="off"
            placeholder="Buscar adicional..."
          />
          <Pesquisa size={"18px"} fill={"var(--vermelho)"} />
        </div>
      </div>
      <div className={style.adicionaisContainer}>
        {adicionais.map((adicional) => (
          <div key={adicional.id} className={style.adicionais}>
            <div className={style.addInfo}>
              <h3 className={style.nome}>{adicional.nome}</h3>
              <p className={style.preco}>{`(+ ${formatValue(
                adicional.preco
              )})`}</p>
            </div>
            <div className={style.addItem}>
              <button onClick={() => diminuir(adicional.id, adicional.preco)}>
                <Remover size={"20px"} fill={"var(--cinzaEscuro1)"} />
              </button>
              <button>{qtd[adicional.id]}</button>
              <button onClick={() => aumentar(adicional.id, adicional.preco)}>
                <Adicionar size={"20px"} fill={"var(--vermelho)"} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={style.obsContainer}>
        <h2>Alguma observação?</h2>
        <textarea
          placeholder="Ex: sem cebola, tomate, etc..."
          rows="4"
          className={style.obs}
          onChange={({ target }) => setObs(target.value)}
        >
          {obs}
        </textarea>
      </div>
      <BtnAdicionar
        valor={valor}
        formatValue={formatValue}
        nomeItem={item.nome}
        img={item.img}
        obs={obs}
        totalAdicionais={totalAdicionais}
      />
    </div>
  );
}

export default Adicionais;
