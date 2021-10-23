import * as React from "react";
import { Reset } from "styled-reset";
import styled, { createGlobalStyle } from "styled-components";
import Logo from "../assets/badge.inline.svg";

const Global = createGlobalStyle`
  html {
    line-height: 16px;
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

const Wrapper = styled.div`
  max-width: 1024px;
  width: 100%;
`;

const Header = styled.header`
  padding: 80px 32px 0;
`;

const Article = styled.article`
  padding: 128px 32px 32px;
  font-size: 2rem;
  line-height: 3rem;

  h1 {
    margin-bottom: 32px;
  }

  p h2 {
    display: inline;
  }
`;

const IndexPage = () => (
  <Container>
    <Reset />
    <Global />
    <Wrapper>
      <Header>
        <Logo width={128} height={128} />
      </Header>
      <Article>
          <h1>Hi, I'm Jonas Kuiler.</h1>
          <p>
            Freelance Software Developer with a creative mindset. I like to
            connect the dots and make the complex simple by looking at barriers
            from different perspectives.
          </p>
        </Article>
    </Wrapper>
  </Container>
);

export default IndexPage;
