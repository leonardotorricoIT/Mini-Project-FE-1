import { createContext, useContext, useState, useEffect } from "react";
import type { Flashcard } from "../types/Flashcard";

const STORAGE_KEY = "flashcards";

type CardContextType = {
  cards: Flashcard[];
  addCard: (card: Flashcard) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = (card: Flashcard) => {
    setCards((prev) => [...prev, card]);
  };

  return (
    <CardContext.Provider value={{ cards, addCard }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCards debe usarse dentro de CardProvider");
  return context;
}
