import React, { useEffect, useState } from "react";
import InputPedido from "./InputPedido";

function Endereco({
  setCep,
  cep,
  setRua,
  rua,
  setNumero,
  numero,
  setBairro,
  bairro,
  setComplemento,
  complemento,
}) {
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchCep = async (cepClean) => {
    try {
      setError("");
      const response = await fetch(
        `https://viacep.com.br/ws/${cepClean}/json/`
      );
      const json = await response.json();
      setRua(json.logradouro);
      setBairro(json.bairro);
      setIsDisabled(true);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const regexCep = /^\d{5}-?\d{3}$/;
    if (regexCep.test(cep)) {
      const cepClean = cep.replace("-", "");
      console.log(cepClean);
      fetchCep(cepClean);
    } else if (!regexCep.test(cep) && rua && bairro) {
      setIsDisabled(false);
      setRua("");
      setBairro("");
    }
  }, [cep]);
  return (
    <>
      <InputPedido id="cep" label="CEP" setValue={setCep} value={cep} placeholder="00000-000" />
      <InputPedido
        id="rua"
        label="Rua"
        setValue={setRua}
        value={rua}
        disabled={isDisabled}
      />
      <InputPedido
        id="numero"
        label="Numero"
        setValue={setNumero}
        value={numero}
      />
      <InputPedido
        id="bairro"
        label="Bairro"
        setValue={setBairro}
        value={bairro}
        disabled={isDisabled}
      />
      <InputPedido
        id="complemento"
        label="Complemento"
        setValue={setComplemento}
        value={complemento}
      />
    </>
  );
}

export default Endereco;
