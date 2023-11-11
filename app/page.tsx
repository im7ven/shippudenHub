import { Character } from "@/types/character";
import CharacterCard from "./components/CharacterCard";
import CharacterSelection from "./components/CharacterSelection";

export default async function Home() {
  const res = await fetch("/api/characters");
  const characters: Character[] = await res.json();
  const initialCharacter = characters[0];

  return (
    <main>
      <CharacterCard initialCharacter={initialCharacter} />
      <CharacterSelection />
    </main>
  );
}
