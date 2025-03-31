import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const login = async (username, password) => {
        try {
            const response = await axios.post("https://fakestoreapi.com/auth/login", {
                username,
                password
            });
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setUser({ username });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const register = async (userData) => {
        try {
            await axios.post("https://fakestoreapi.com/users", userData);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
