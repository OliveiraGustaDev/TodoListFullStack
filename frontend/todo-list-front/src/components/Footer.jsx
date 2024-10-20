import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; 2024 - Desenvolvido por
        <span
          onClick={() => {
            Swal.fire({
              icon: "success",
              title: "Ao Setor de T.I do Depósito das Lojas Cem!",
              text: "Espero ter atendido as espectativas do projeto. Obrigado pela oportunidade de participar dessa Incrível Seleção de Talentos.",
            });
            return;
          }}
        >
          Gustavo Oliveira
        </span>
      </p>
    </footer>
  );
};

export default Footer;
