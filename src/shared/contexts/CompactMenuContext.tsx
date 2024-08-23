import React, { createContext, useContext, useState } from 'react';

// Definindo o contexto
interface CompactMenuContextProps {
    isCompact: boolean;
    toggleCompact: () => void;
}

const CompactMenuContext = createContext<CompactMenuContextProps | undefined>(undefined);

// Hook para usar o contexto
export const useCompactMenuContext = () => {
    const context = useContext(CompactMenuContext);
    if (!context) {
        throw new Error('useCompactMenuContext must be used within a CompactProvider');
    }
    return context;
};

// Provedor de contexto
export const CompactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCompact, setIsCompact] = useState(false);

    const toggleCompact = () => setIsCompact(prev => !prev);

    return (
        <CompactMenuContext.Provider value={{ isCompact, toggleCompact }}>
            {children}
        </CompactMenuContext.Provider>
    );
};
