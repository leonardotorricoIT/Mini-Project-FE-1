import { createContext, useContext, useState, useEffect } from "react";
import type { Flashcard } from "../types/Flashcard";

const STORAGE_KEY = "flashcards";

type CardContextType = {
  cards: Flashcard[];
  addCard: (card: Flashcard) => void;
  updateCard: (id: string, updates: Partial<Flashcard>) => void;
  deleteCard: (id: string) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = (card: Flashcard) => {
    setCards((prev) => [...prev, card]);
  };

  const updateCard = (id: string, updates: Partial<Flashcard>) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updates } : card))
    );
  };

  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <CardContext.Provider value={{ cards, addCard, updateCard, deleteCard }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCards must be used within CardProvider");
  return context;
}
