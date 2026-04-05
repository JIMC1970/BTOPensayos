"use client"

import { User } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

type AppContextType = {
    language: string;
    setLanguage: (lang: string) => void;
    user: User;
    setUser: (user: User) => void;
}

interface AppProviderProps {
    children: ReactNode,
    initialUser: User,
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({children, initialUser}: AppProviderProps){
    const [language, setLanguage] = useState("es");
    const [user, setUser] = useState(initialUser);

    return (
        <AppContext.Provider
            value={{
                language,
                setLanguage,
                user,
                setUser
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider")
    }
    return context;
}