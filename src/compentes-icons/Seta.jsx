import React from "react";

function Seta({ classe, fill }) {
  return (
    <svg
      className={classe}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill={fill}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
      />
    </svg>
  );
}

export default Seta;
