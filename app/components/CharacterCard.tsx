"use client";

import styled from "styled-components";
import villageIcon from "../images/village.png";
import Expandable from "./Expandable";
import { useCharacter } from "../context/CharacterContext";
import { Neuton } from "next/font/google";
import { Character } from "@prisma/client";
import { motion } from "framer-motion";

const neuton = Neuton({
  subsets: ["latin"],
  weight: ["800"],
});

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #000;
  max-width: 56rem;
  width: 100%;
  color: #fff;
  border-radius: 25px;
  padding: 3rem 0 0;
  box-shadow: 0 2px 5px 1px #1b1b1b;
  position: relative;
  margin: 30rem auto;

  @media screen and (min-width: 965px) {
    margin: 10rem auto;
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows: auto, auto;
    max-width: 60rem;
  }
`;

const CardContent = styled.div`
  padding: 0 2rem;

  @media screen and (min-width: 550px) {
    padding: 0 2.6rem;
  }

  @media screen and (min-width: 965px) {
    padding: 0 3rem 0 0;
  }
`;

const CharacterImage = styled.img`
  position: absolute;
  max-width: 32rem;
  transform: translatey(-52%);
  top: 0;
  z-index: -1;

  @media screen and (min-width: 965px) {
    max-width: 35rem;
    transform: translateX(-50%);
    max-height: 50rem;
    min-height: 40rem;
    position: initial;
    z-index: 0;
  }

  @media screen and (min-width: 768px) {
  }
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 1rem;

  @media screen and (min-width: 550px) {
    justify-content: space-between;
    flex-wrap: nowrap;
  }
`;

const StatusOverline = styled.p`
  font-size: 1.2rem;
  letter-spacing: 1.3rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0;
  color: #37d17f;
  width: 100%;
  text-align: center;

  &.deceased {
    color: #ff4a4a;
  }

  @media screen and (min-width: 550px) {
    font-size: 1.5rem;
    width: initial;
    order: 2;
  }
`;

const CharacterName = styled.h2`
  font-weight: 900;
  font-size: 3rem;
  margin: 0;
  line-height: 3.4rem;
  order: 2;
  text-align: center;
  max-width: 24.5rem;

  @media screen and (min-width: 550px) {
    text-align: left;
    font-size: 4.5rem;
  }
`;

const VillageContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  @media screen and (min-width: 550px) {
    justify-content: start;
  }
`;

const VillageIcon = styled.img`
  width: 100%;
  max-width: 4rem;
`;

const Village = styled.p`
  margin: 0;
  font-size: 1.8rem;
  color: #cdbef0;

  @media screen and (min-width: 550px) {
    font-size: 2rem;
  }
`;

const StatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2.4rem 0 1rem;
`;

const StatLabel = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  color: #ff3923;
  text-align: center;

  &.footer {
    margin-bottom: 0.8rem;
    color: #d7d7d7;
  }

  @media screen and (min-width: 550px) {
    font-size: 2rem;
  }
`;

const Stat = styled.p`
  font-size: 4rem;
  align-self: center;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 45%,
    rgba(0, 0, 0, 0) 87%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-weight: 700;

  @media screen and (min-width: 550px) {
    font-size: 5rem;
  }
`;

const CardFooter = styled.footer`
  margin-top: 2rem;
  background: #2c2c2c;
  width: 100%;
  grid-area: 2 / 1 / 3 / 3;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  padding: 1rem;
  box-sizing: border-box;
`;

const NatureWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 0 auto;
  color: #fff;
  font-size: 3rem;
  flex-wrap: wrap;
  max-width: 40rem;
`;

const NatureGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NatureIcon = styled.img`
  width: 30px;
`;

const NatureLabel = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;

interface Props {
  initialCharacter: Character;
}

const CharacterCard = ({ initialCharacter }: Props) => {
  const { selectedCharacter, animate } = useCharacter();
  const renderedCharacter = selectedCharacter
    ? selectedCharacter
    : initialCharacter;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={animate ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4 }}
    >
      <CardContainer>
        <CharacterImage src={renderedCharacter?.image} />
        <CardContent>
          <CardHeader>
            <CharacterName className={neuton.className}>
              {renderedCharacter?.name}
            </CharacterName>
            <StatusOverline
              className={renderedCharacter?.status ? "" : "deceased"}
            >
              {renderedCharacter?.status ? "Alive" : "Deceased"}
            </StatusOverline>
          </CardHeader>
          <StatWrapper>
            <div>
              <StatLabel>Overall</StatLabel>
              <Stat>{renderedCharacter?.overall}</Stat>
            </div>
            <div>
              <StatLabel>IQ</StatLabel>
              <Stat>{renderedCharacter?.iq}</Stat>
            </div>
            <div>
              <StatLabel>Abilities</StatLabel>
              <Stat>{renderedCharacter?.abilities}</Stat>
            </div>
          </StatWrapper>
          <VillageContainer>
            {/* <VillageIcon src={villageIcon} /> */}
            <Village>{renderedCharacter?.village}</Village>
          </VillageContainer>
          <Expandable
            maxChars={260}
            description={renderedCharacter ? renderedCharacter.description : ""}
          />
        </CardContent>
        <CardFooter>
          <StatLabel className="footer">Nature Transformations</StatLabel>
          <NatureWrapper>
            {renderedCharacter?.natureIcons.map((icon, index) => (
              <NatureGroup key={index}>
                <NatureIcon src={icon} />
                <NatureLabel>
                  {renderedCharacter.natureLabels[index]}
                </NatureLabel>
              </NatureGroup>
            ))}
          </NatureWrapper>
        </CardFooter>
      </CardContainer>
    </motion.div>
  );
};

export default CharacterCard;
