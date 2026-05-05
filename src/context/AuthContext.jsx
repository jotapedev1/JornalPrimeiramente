// context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // Configuração da URL base para diferentes plataformas
    const getBaseUrl = () => {
        if (Platform.OS === 'android') {
            return 'http://10.0.2.2:8080';
        }
        return 'http://localhost:8080';
    };

    // Criar instância do axios com configuração dinâmica
    const api = axios.create({
        baseURL: getBaseUrl(),
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 10000,
    });

    // Interceptor para adicionar token automaticamente
    api.interceptors.request.use(
        async (config) => {
            const storedToken = await AsyncStorage.getItem('@JornalApp:token');
            if (storedToken) {
                config.headers.Authorization = `Bearer ${storedToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        loadStoredData();
    }, []);

    const loadStoredData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('@JornalApp:token');
            const storedUser = await AsyncStorage.getItem('@JornalApp:user');

            if (storedToken && storedUser) {
                const userData = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(userData);
                setIsAdmin(userData.isAdmin || false);
            }
        } catch (error) {
            console.log('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    // Função de login ajustada para o endpoint correto
    const login = async (token, userData) => {
        try {
            // Salvar token e dados do usuário
            await AsyncStorage.setItem('@JornalApp:token', token);
            await AsyncStorage.setItem('@JornalApp:user', JSON.stringify(userData));

            setToken(token);
            setUser(userData);
            setIsAdmin(userData.isAdmin || false);

            return { success: true };
        } catch (error) {
            console.log('Erro ao salvar dados do login:', error);
            return { success: false, msg: 'Erro ao fazer login' };
        }
    };

    // Função de login com email e senha (chama o backend)
    const loginWithCredentials = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, userId, email: userEmail, userName, role, isAdmin: adminFlag } = response.data;

            // Salvar no AsyncStorage
            await AsyncStorage.setItem('@JornalApp:token', token);

            const userData = {
                userId,
                email: userEmail,
                userName,
                role,
                isAdmin: adminFlag
            };

            await AsyncStorage.setItem('@JornalApp:user', JSON.stringify(userData));

            setToken(token);
            setUser(userData);
            setIsAdmin(adminFlag);

            return { success: true, data: response.data };
        } catch (error) {
            console.log('Erro ao logar:', error);

            if (error.response) {
                return {
                    success: false,
                    msg: error.response.data.error || 'Email ou senha inválidos'
                };
            }
            return { success: false, msg: 'Erro de conexão com o servidor' };
        }
    };

    // Função de registro que já retorna o token
    const register = async (name, email, password) => {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const { token, userId, email: userEmail, userName, role, isAdmin: adminFlag } = response.data;

            // Salvar no AsyncStorage
            await AsyncStorage.setItem('@JornalApp:token', token);

            const userData = {
                userId,
                email: userEmail,
                userName,
                role,
                isAdmin: adminFlag
            };

            await AsyncStorage.setItem('@JornalApp:user', JSON.stringify(userData));

            setToken(token);
            setUser(userData);
            setIsAdmin(adminFlag);

            return { success: true, data: response.data };
        } catch (error) {
            console.log('Erro ao registrar:', error);

            if (error.response) {
                return {
                    success: false,
                    msg: error.response.data.error || 'Erro ao criar conta'
                };
            }
            return { success: false, msg: 'Erro de conexão com o servidor' };
        }
    };

    const logout = async () => {
        try {
            // Opcional: chamar endpoint de logout no backend
            if (token) {
                try {
                    await api.post('/auth/logout', null, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                } catch (error) {
                    console.log('Erro no logout do backend:', error);
                }
            }
        } finally {
            // Limpar dados locais
            await AsyncStorage.removeItem('@JornalApp:token');
            await AsyncStorage.removeItem('@JornalApp:user');
            setToken(null);
            setUser(null);
            setIsAdmin(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAdmin,
            loading,
            login,                    // Para login com token já gerado
            loginWithCredentials,     // Para login com email/senha
            register,                 // Para registro de novos usuários
            logout,
            isAuthenticated: !!token && !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}