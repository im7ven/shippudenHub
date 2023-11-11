"use client";
import { Character } from "@/types/character";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useCharacter } from "../context/CharacterContext";

const GridWrapper = styled.section`
  padding: 0 2rem 1rem;
  background: #1a1a1a;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: padding 0.5s;
`;

const GridHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  transform: translatey(0.4rem);
`;

const Grid = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  gap: 1.3rem;
  margin-top: 1rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const GridHeading = styled.h2`
  font-size: 1.7rem;
  color: #fff;
  text-align: center;
  margin: 0;
  letter-spacing: 0.2rem;

  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const CharacterIcon = styled.img`
  width: 4rem;
  border-radius: 8px;
  border: 1px solid white;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 5px 1.5px #6200f5;
    transform: scale(0.9);
  }

  @media screen and (min-width: 768px) {
    width: 6rem;
  }
`;

const Toggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 3.5rem;
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  transform: rotate(90deg);
  background: #555555;
  border-radius: 8px;
  margin-left: auto;
  transition: all 0.3s;

  &:hover {
    background: #777777;
  }
`;

const CharacterSelection = () => {
  const [characterIcons, setCharacterIcons] = useState<Character[] | null>(
    null
  );

  useEffect(() => {
    const fetchCharacterIcons = async () => {
      const res = await fetch("/api/characters");
      const characterIcons: Character[] = await res.json();
      setCharacterIcons(characterIcons);
    };

    fetchCharacterIcons();
  }, []);

  const { handleSelectedCharacter } = useCharacter();

  const [selectionExpanded, setSelectionExpanded] = useState(false);

  const handleSelectionExpansion = () => {
    setSelectionExpanded(!selectionExpanded);
  };

  return (
    <GridWrapper>
      <GridHeader>
        <GridHeading>Character Selection</GridHeading>
        <Toggle onClick={() => handleSelectionExpansion()}>
          <span style={{ transform: "translatey(-.1rem)" }}>
            {selectionExpanded
              ? String.fromCharCode(0x2716)
              : String.fromCharCode(0x276f)}
          </span>
        </Toggle>
      </GridHeader>

      {selectionExpanded ? (
        <Grid>
          {characterIcons?.map((char, index) => (
            <CharacterIcon
              onClick={() => {
                handleSelectedCharacter(char);
                handleSelectionExpansion();
              }}
              key={index}
              src={char?.imageIcon}
            ></CharacterIcon>
          ))}
        </Grid>
      ) : null}
    </GridWrapper>
  );
};

export default CharacterSelection;
