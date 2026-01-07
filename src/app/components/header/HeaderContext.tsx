'use client';
import { createContext, useContext } from 'react';

export interface HeaderContextType {
    isMenuOpen: boolean;
    triggerNavMenu: () => void;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function useHeaderContext() {
    const context = useContext(HeaderContext);

    if (!context) {
        throw new Error('useHeaderContext must be used within a HeaderProvider');
    }

    return context;
}
