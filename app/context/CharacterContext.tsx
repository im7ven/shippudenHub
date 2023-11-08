"use client";
import { Character } from "@/types/character";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CharacterContextValue {
  selectedCharacter: Character | null;
  handleSelectedCharacter: (character: Character) => void;
  animate: boolean;
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
    setAnimate(false); // Disable animation
    setTimeout(() => {
      setSelectedCharacter(character);
    }, 400);
  };

  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    if (selectedCharacter) {
      setTimeout(() => setAnimate(true), 100);
    }
  }, [selectedCharacter]);

  const characterContextValue: CharacterContextValue = {
    selectedCharacter,
    handleSelectedCharacter,
    animate,
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
