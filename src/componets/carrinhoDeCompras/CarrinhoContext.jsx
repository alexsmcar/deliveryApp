import React, { createContext, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoStorage = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [endereco, setEndereco] = useState({});
  
  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho, endereco, setEndereco }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
