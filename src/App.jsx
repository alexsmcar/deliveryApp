import React from "react";
import "./App.css";
import "./Cores.css";
import Header from "./componets/Header";
import ConteudoMain from "./componets/ConteudoMain";
import { CarrinhoStorage } from "./componets/carrinhoDeCompras/CarrinhoContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carrinho from "./componets/carrinhoDeCompras/Carrinho";
import Footer from "./componets/Footer";
import FinalizarPedido from "./componets/FinalizarPedido";
import Pagamento from "./componets/Pagamento";

function App() {
  return (
    <BrowserRouter>
      <CarrinhoStorage>
        <Header />
        <Routes>
          <Route path="/" element={<ConteudoMain />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="entrega" element={<FinalizarPedido />} />
          <Route path="pagamento" element={<Pagamento />} />
        </Routes>
        <Footer />
      </CarrinhoStorage>
    </BrowserRouter>
  );
}

export default App;
