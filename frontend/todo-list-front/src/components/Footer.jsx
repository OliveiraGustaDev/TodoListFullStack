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
              text: "Espero conseguir uma das vagas em aberto, mas se não for dessa vez me aguarde ainda melhor para a próxima. Obrigado pela oportunidade de participar dessa Incrível Seleção de Talentos.",
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
