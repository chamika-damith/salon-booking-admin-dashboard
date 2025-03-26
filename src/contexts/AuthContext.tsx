import { createContext, useState, useEffect, ReactNode } from "react";
import authService from "@/service/authService.ts";

interface User {
    id: string;
    email: string;
    role: string;
    name?: string;
}

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    isAuthenticated: false,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if user is already logged in
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authService.login({ email, password });
        setCurrentUser(response.user);
        setIsAuthenticated(true);
    };

    const register = async (name: string, email: string, password: string) => {
        const response = await authService.register({ name, email, password });
        setCurrentUser(response.user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;