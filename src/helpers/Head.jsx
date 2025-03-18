import React, { useEffect } from "react";

const Head = ({ text }) => {
  useEffect(() => {
    document.title = text + " | Hamburgueria";
  },[text]);
  return <></>
};

export default Head;
