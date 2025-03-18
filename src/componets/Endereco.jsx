import React, { useEffect, useState } from "react";
import InputPedido from "./InputPedido";

function Endereco({ cep, rua, numero, bairro, complemento, cidade }) {
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (cep.validate) {
      setIsDisabled(true);
    }
  }, []);
  const fetchCep = async (cepProcurado) => {
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepProcurado}/json/`
      );
      const json = await response.json();
      if (json.erro) throw new Error("CEP não encontrado.");
      rua.setValue(json.logradouro);
      bairro.setValue(json.bairro);
      cidade.setValue(json.localidade);
      setIsDisabled(true);
    } catch (error) {
      cep.setError(error.message);
    }
  };

  function handleCep({ target }) {
    if (cep.validate()) {
      const cepClean = cep.value.replace("-", "");
      cep.setValue(target.value);
      fetchCep(cepClean);
    }
  }

  function handleCepChange(event) {
    cep.onChange(event);
    if (rua.value && bairro.value) {
      rua.setValue("");
      bairro.setValue("");
      cidade.setValue("");
      setIsDisabled(false);
    }
  }
  return (
    <>
      <InputPedido
        id="cep"
        label="CEP"
        placeholder="00000-000"
        error={cep.error}
        value={cep.value}
        isRequired={cep.isRequired}
        onChange={handleCepChange}
        onBlur={handleCep}
      />
      <InputPedido id="rua" label="Rua" disabled={isDisabled} {...rua} />
      <InputPedido id="numero" label="Numero" {...numero} />
      <InputPedido
        id="bairro"
        label="Bairro"
        disabled={isDisabled}
        {...bairro}
      />
      <InputPedido id="complemento" label="Complemento" {...complemento} />
      <InputPedido
        id="cidade"
        label="Cidade"
        disabled={isDisabled}
        {...cidade}
      />
    </>
  );
}

export default Endereco;
