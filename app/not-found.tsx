"use client"

import Image from "next/image";
import styled, { ThemeProvider } from "styled-components";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../_constants";
import NotFoundImage from "../public/not_found_blog.svg";
import Link from "next/link";
import { light } from "@/styles/theme";
import Header from "@/components/Header";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import GlobalStyles from "@/styles/GlobalStyles";

export default function NotFound() {
  return (
    <ThemeProvider theme={light}>
      <Header />
      <Content>
        <Wrapper>
          <Image
            src={NotFoundImage}
            width={200}
            height={200}
            objectFit={"contain"}
            alt={"não encontrado"}
          />
          <h1>Página não encontrada</h1>
          <Link href={"/"} passHref>
            <BackToHome>Voltar para a Home</BackToHome>
          </Link>
        </Wrapper>
      </Content>
      <Footer />
      <GlobalStyles />
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 24px;

  min-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
`;

const BackToHome = styled.button`
  color: #FFFFFF; /* Cor do texto branco para melhor contraste */
  background-color: #007BFF; /* Um tom de azul para o fundo do botão */
  padding: 10px 20px; /* Adiciona espaço dentro do botão ao redor do texto */
  font-size: 16px; /* Aumenta o tamanho da fonte para melhor legibilidade */
  border: none; /* Remove a borda padrão */
  border-radius: 5px; /* Arredonda os cantos do botão */
  cursor: pointer; /* Muda o cursor para o ponteiro no hover para melhor indicação ao usuário */
  transition: background-color 0.3s ease-in-out; /* Suaviza a transição de cor de fundo */
  
  &:hover {
    background-color: #0056b3; /* Escurece a cor do botão no hover para feedback */
    text-decoration: none; /* Adiciona sublinhado ao texto no hover */
  }

  &:focus {
    outline: none; /* Remove o contorno padrão no foco */
    box-shadow: 0px 0px 2px #0056b3; /* Adiciona um box-shadow para indicar o foco */
  }

  &:active {
    transform: scale(0.98); /* Diminui ligeiramente o botão quando clicado */
  }
`;