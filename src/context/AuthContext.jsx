import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {LogBox, Platform} from "react-native";

export const AuthContext = createContext({});

LogBox.ignoreLogs([
    'hapticpatternlibrary.plist',
]);

const BASE_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:8080"
        : "http://localhost:8080";

// Cria UMA única instância do Axios
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para adicionar automaticamente o JWT
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("@JornalApp:token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadStoredData();
    }, []);

    const loadStoredData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem("@JornalApp:token");
            const storedUser = await AsyncStorage.getItem("@JornalApp:user");

            if (storedToken && storedUser) {
                const userData = JSON.parse(storedUser);

                setToken(storedToken);
                setUser(userData);
                setIsAdmin(userData.isAdmin ?? false);
            }
        } catch (error) {
            console.log("Erro ao carregar sessão:", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (jwtToken, userData) => {
        try {
            await AsyncStorage.setItem("@JornalApp:token", jwtToken);
            await AsyncStorage.setItem(
                "@JornalApp:user",
                JSON.stringify(userData)
            );

            setToken(jwtToken);
            setUser(userData);
            setIsAdmin(userData.isAdmin ?? false);

            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                msg: "Erro ao salvar autenticação",
            };
        }
    };

    const loginWithCredentials = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const {
                token: jwtToken,
                userId,
                userName,
                role,
                isAdmin: adminFlag,
                email: userEmail,
            } = response.data;

            const userData = {
                userId,
                userName,
                role,
                email: userEmail,
                isAdmin: adminFlag ?? false,
            };

            return await login(jwtToken, userData);
        } catch (error) {
            console.log(error);

            return {
                success: false,
                msg:
                    error.response?.data?.error ??
                    "Não foi possível realizar o login.",
            };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
                role,
            });

            const {
                token: jwtToken,
                userId,
                userName,
                isAdmin: adminFlag,
                email: userEmail,
                role: userRole,
            } = response.data;

            const userData = {
                userId,
                userName,
                email: userEmail,
                role: userRole,
                isAdmin: adminFlag ?? false,
            };

            return await login(jwtToken, userData);
        } catch (error) {
            console.log(error);

            return {
                success: false,
                msg:
                    error.response?.data?.error ??
                    "Não foi possível realizar o cadastro.",
                validationErrors: error.response?.data?.errors,
            };
        }
    };

    const logout = async () => {
        try {
            try {
                await api.post("/auth/logout");
            } catch (_) {
                // Ignora erro do backend e prossegue com logout local
            }

            await AsyncStorage.removeItem("@JornalApp:token");
            await AsyncStorage.removeItem("@JornalApp:user");

            setToken(null);
            setUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAdmin,
                api,
                login,
                loginWithCredentials,
                register,
                logout,
                BASE_URL,
                isAuthenticated: !!token && !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}