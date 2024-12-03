import React, { createContext, useContext } from 'react';
import useSessionWarning from '../../hooks/useSessionWarning';

interface SessionContextType {
  showWarning: boolean;
  renewSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { showWarning, renewSession } = useSessionWarning('accessToken');

    return (
        <SessionContext.Provider value={{ showWarning, renewSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    
    return context;
};
