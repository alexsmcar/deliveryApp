import React, {useEffect, useState} from 'react'
import style from "./InfoFucionamento.module.css"

function InfoFuncionamento() {
    const [time, setTime] = useState(false);

    useEffect(()=> {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        if (hour < 18) {
            setTime(true)
        }
    },[])

  return (
    <div className={style.Container}>
        <div className={style.infoContainer}>
            <p className={style.info}>Aberto das 18:00 até 00:00</p>
            <p className={style.dot}></p>
            <p className={style.info}>Sem pedido minimo</p>
        </div>
        {time && (
            <div className={style.mensagem}>
                <p>Loja fechada no momento</p>
            </div>
        )}
    </div>
  )
}

export default InfoFuncionamento
