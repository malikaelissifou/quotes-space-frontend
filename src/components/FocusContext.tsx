import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FocusContextType {
  focusedCardId: string | null;
  setFocusedCardId: (id: string | null) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

interface FocusProviderProps {
  children: ReactNode;
}

export const FocusProvider: React.FC<FocusProviderProps> = ({ children }) => {
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);

  return (
    <FocusContext.Provider value={{ focusedCardId, setFocusedCardId }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (context === undefined) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};