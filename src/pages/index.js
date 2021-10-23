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
  width: 8rem;
  height: 8rem;
`

const Wrapper = styled.div`
  max-width: 64rem;
  width: 100%;
`;

const Header = styled.header`
  padding: 4rem 2rem 0;
`;

const Article = styled.article`
  padding: 8rem 2rem 2rem;
  font-size: 2rem;
  line-height: 3rem;

  h1 {
    margin-bottom: 2rem;
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
        <StyledLogo />
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
