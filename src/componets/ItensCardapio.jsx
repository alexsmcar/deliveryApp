import React, {useState} from "react";
import style from "./ItensCardapio.module.css";
import ModalCardapio from "./modalCardapio/ModalCardapio";

function ItensCardapio({ itens, status }) {
  const [modal, setModal] = useState(false);
  const [cardapio, setCardapio] = useState("");
  const body = document.body;
  if(modal) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }

  const format = new Intl.NumberFormat("pt-BR",{
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  })

  function formatValue(value) {
    return format.format(value)
  }

  function handleClick(id) {
    setModal(true);
    setCardapio(itens[id])
  }


  return (
    <div className={`${style.container} ${status ? style.active : ""}`}>
      {itens.map((el, index) => {
        return <div key={el.id} className={style.cardapioContainer} onClick={()=>handleClick(index)}>
          <div className={style.descricao}>
            <h3>{el.nome}</h3>
            <p>{el.descricao}</p>
            <span>{formatValue(el.preco)}</span>
          </div>
          <div>
            <img className={style.img} src={el.img} alt={el.nome}></img>
          </div>
        </div>
      })}
      {modal && <ModalCardapio item={cardapio} setModal={setModal} formatValue={formatValue} />}
    </div>
  );
}

export default ItensCardapio;
