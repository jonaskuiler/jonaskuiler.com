import * as React from "react";
import { Reset } from "styled-reset";
import styled, { createGlobalStyle } from "styled-components";
import Logo from "../assets/badge.inline.svg";

const Global = createGlobalStyle`
  html {
    font-size: 14px;
  }

  @media only screen and (min-width: 1024px) {
    html {
      font-size: 16px;
    }
  }

  body {
    background-color: #ffffff;
    color: #000000;
    font-family: sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const StyledLogo = styled(Logo)`
  width: 6rem;
  height: 6rem;

  @media only screen and (min-width: 1024px) {
    width: 10rem;
    height: 10rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 48rem;
  width: 100%;
  padding: 0 2.4rem;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Header = styled.header`
  padding: 2rem 0;

  @media only screen and (min-width: 1024px) {
    padding: 0 2rem 0 0;
  }
`;

const Article = styled.article`
  font-size: 1.8rem;
  line-height: 2.4rem;

  h1 {
    font-size: 2.3rem;
    line-height: 3rem;
  }

  p h2 {
    display: inline;
  }

  strong {
    font-weight: bold;
  }
`;

const IndexPage = () => (
  <Container>
    <Reset />
    <Global />
    <Wrapper>
      <Header>
        <StyledLogo />
      </Header>
      <Article>
        <h1>
          Hi, I'm <strong>Jonas</strong>
        </h1>
        <p>
          Freelance software developer with a <strong>creative</strong> mindset.
          I <strong>focus</strong> on making the complex <strong>simple</strong>
          .
        </p>
      </Article>
    </Wrapper>
  </Container>
);

export default IndexPage;
