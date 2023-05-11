import * as React from "react";
import { Reset } from "styled-reset";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Logo from "../assets/badge.inline.svg";
import { border, layout, space, typography } from "styled-system";

const Global = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

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
    color: #16161D;
    font-family: sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledLogo = styled(Logo)`
  ${layout}
  ${space}

  @media only screen and (min-width: 1024px) {
    // width: 10rem;
    // height: 10rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 48rem;
  max-width: 100%;
  width: 960px;

  ${layout}
  ${space}
  ${border}
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${space}
  ${layout}
  ${border}
`;

// const Article = styled.article`
//   font-size: 1.8rem;
//   line-height: 2.4rem;

//   h1 {
//     font-size: 2.3rem;
//     line-height: 3rem;
//   }

//   p h2 {
//     display: inline;
//   }

//   strong {
//     font-weight: bold;
//   }
// `;

const Text = styled.span`
  ${typography}
  ${space}
  ${layout}
  ${border}
`;

const theme = {};

const ExperienceItem = ({ role, company, description }) => {
  return (
    <>
      <Text
        as="h3"
        fontSize={4}
        fontFamily="'Golos Text', sans-serif"
        fontWeight="500"
        mb={3}
      >
        {role}
      </Text>
      <Text
        as="h4"
        fontSize={3}
        fontFamily="'Golos Text', sans-serif"
        fontWeight="700"
        mb={3}
      >
        {company}
      </Text>
      <Text
        as="p"
        fontSize={3}
        lineHeight={1.6}
        fontFamily="'Golos Text', sans-serif"
        fontWeight="400"
      >
        {description}
      </Text>
    </>
  );
};

const IndexPage = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <Reset />
      <Global />
      <Wrapper mt={4} mb={4}>
        <Header
          pb={4}
          borderBottomWidth={1}
          borderStyle="solid"
          borderColor="#"
        >
          <StyledLogo width="3rem" height="3rem" mr={3} />
          <Text
            as="h1"
            fontSize={5}
            fontFamily="'Golos Text', sans-serif"
            fontWeight="500"
          >
            <Text as="strong" fontWeight={700}>
              Jonas Kuiler
            </Text>{" "}
            - Freelance Software Developer
          </Text>
        </Header>
      </Wrapper>
      <Wrapper mb={5}>
        <Text
          as="p"
          fontSize={4}
          lineHeight={1.6}
          fontFamily="'Golos Text', sans-serif"
        >
          Hey there! I'm a software developer with a decade of experience under
          my belt, and my specialty is making the complex simple. You know,
          taking gnarly, tangled-up systems and transforming them into something
          that even your grandma could use. And let me tell you, that's no easy
          feat. But it's a challenge I relish, like trying to beat the high
          score on my favorite arcade game.
        </Text>
      </Wrapper>
      <Wrapper mb={4}>
        <Text
          as="h2"
          fontSize={5}
          fontFamily="'Golos Text', sans-serif"
          fontWeight="700"
        >
          Experience
        </Text>
      </Wrapper>

      <Wrapper mb={5}>
        <ExperienceItem
          role="Senior Frontend Developer"
          company="NLZIET"
          description="Responsible for the development and maintance of NLZIET's web applications."
        />
      </Wrapper>

      <Wrapper mb={5}>
        <ExperienceItem
          role="NodeJS Back End Developer"
          company="GrandVision NV"
          description="Responsible for the development and maintance of several microservices."
        />
      </Wrapper>

      <Wrapper mb={5}>
        <ExperienceItem
          role="NodeJS Back End Developer"
          company="Terberg Business Lease Group B.V."
          description="Responsible for incrementally improving and innovating on the calculation engine used by https://carculator.justlease.nl/. My main tech stack here is JavaScript (both in-browser and NodeJS), ReactJS, VueJS, PostgresQL, Redis and ElasticSearch."
        />
      </Wrapper>

      <Wrapper mb={5}>
        <ExperienceItem
          role="Creative Developer"
          company="Robot Kittens"
          description={`
            Responsible for developing web and mobile applications. At Robot Kittens I've worked on projects ranging from small campaign sites, mobile apps and incrementally improving existing platforms. The stack I used here was mainly JavaScript (both in-browser and NodeJS), React and React Native, VueJS and AWS. 

            My role could be described as a supporting team member (acting as a bridge between back-end and front-end), as I provided tailor-made solutions for client environments and colleagues.
          `}
        />
      </Wrapper>

      <Wrapper mb={5}>
        <ExperienceItem
          role="Fullstack Developer"
          company="Governance.com"
          description={`
            Responsible for developing new features to an existing software suite. I co-created a suite of collaboration tools used for the financial sector. My main tech stack here was JavaScript (both browser and NodeJS), GraphQL, React and Flux architecture, ExtJS, PostgresQL, Redis, Websockets, on-premise and cloud hosting.

            I also helped gradually migrate the frontend of governance.com's software suite to React.
          `}
        />
      </Wrapper>

      <Wrapper mb={5}>
        <ExperienceItem
          role="Creative Developer"
          company="Blocklevel"
          description={`
            Responsible for developing web and mobile applications. At Blocklevel I've worked on several digital advertising campaign projects mostly expressed in highly interactive websites. As Blocklevel was positioned as a front-end boutique, we tried to push the boundaries of the web combining animations, media and gamification to create a digital experience for end-users.

            My main tech stack here was JavaScript (both in-browser and NodeJS), VueJS and several animation frameworks like PixiJS, GSAP and more. 
          `}
        />
      </Wrapper>

      <Wrapper mb={5}>
        <ExperienceItem
          role="Fullstack Developer"
          company="Blocklevel"
          description={`
            Responsible for the co-creation of Woov (https://woov.com/) from thin air. I collaborated with the founder of Woov and several team members to create the first MVP and initial launch of their Android/iOS based app. 

            My main tech stack here was JavaScript (both in-browser and NodeJS), ExtJS, PostgresQL, Redis, Websockets and Android/iOS native modules.
          `}
        />
      </Wrapper>

      <Wrapper mb={5}>
        <ExperienceItem
          role="Creative Developer"
          company="Blocklevel"
          description={`
            Responsible for developing web and mobile applications. At Blocklevel I've worked on several digital advertising campaign projects mostly expressed in highly interactive websites. As Blocklevel was positioned as a front-end boutique, we tried to push the boundaries of the web combining animations, media and gamification to create a digital experience for end-users.

            My main tech stack here was JavaScript (both in-browser and NodeJS), VueJS and several animation frameworks like PixiJS, GSAP and more. 
          `}
        />
      </Wrapper>
    </Container>
  </ThemeProvider>
);

export default IndexPage;
