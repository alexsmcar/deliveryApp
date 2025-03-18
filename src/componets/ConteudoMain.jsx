import React from 'react'
import InfoFuncionamento from './InfoFuncionamento'
import Cardapio from './Cardapio'
import Head from "../helpers/Head"

function ConteudoMain() {
  return (
    <main className='conteudoPrincipal'>
      <Head text="Cardapio"/>
        <InfoFuncionamento />
        <Cardapio />
    </main>

  )
}

export default ConteudoMain
