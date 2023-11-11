import { Character } from "@/types/character";
import CharacterCard from "./components/CharacterCard";
import CharacterSelection from "./components/CharacterSelection";

export default async function Home() {
  if (!process.env.NEXT_PUBLIC_BASE_API_URL) {
    return null;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/characters`
  );
  const characters: Character[] = await res.json();
  const initialCharacter = characters[0];

  return (
    <main>
      <CharacterCard initialCharacter={initialCharacter} />
      <CharacterSelection />
    </main>
  );
}
