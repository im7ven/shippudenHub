"use client";
import { Character } from "@/types/character";
import { useContext, createContext, useState, ReactNode } from "react";

interface CharacterContextValue {
  selectedCharacter: Character | null;
  handleSelectedCharacter: (character: Character) => void;
}

interface Props {
  children: ReactNode;
}

const CharacterContext = createContext<CharacterContextValue>(
  {} as CharacterContextValue
);

export const CharacterContextProvider = ({ children }: Props) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const handleSelectedCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  const characterContextValue: CharacterContextValue = {
    selectedCharacter,
    handleSelectedCharacter,
  };

  return (
    <CharacterContext.Provider value={characterContextValue}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  return useContext(CharacterContext);
};
