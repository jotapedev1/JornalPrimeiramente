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

    /*
    const getBaseUrl = () => {
    if (__DEV__) {
        // Desenvolvimento
        if (Platform.OS === 'android') {
            return 'http://10.0.2.2:8080'; // Emulador Android
        }
        return 'http://localhost:8080'; // iOS / Web
    }
    // Produção — substitua pela URL do seu servidor quando fizer deploy
    return 'https://sua-api.railway.app';
    };
    * */

    // Criar instância do axios com configuração dinâmica
     const api = axios.create({
        baseURL: getBaseUrl(),
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 10000, //pra evitar que requests q demoram muito não demorem mais que 10 segundos
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
    // Interceptor de RESPOSTA
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Token expirado ou inválido — limpa tudo e força novo login
                await AsyncStorage.removeItem('@JornalApp:token');
                await AsyncStorage.removeItem('@JornalApp:user');
                setToken(null);
                setUser(null);
                setIsAdmin(false);
            }
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
            // Verificar se os dados são válidos antes de salvar
            if (!token || !userData) {
                return { success: false, msg: 'Dados de login inválidos' };
            }

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
        // Validação básica no frontend
        if (!email || !password) {
            return { success: false, msg: 'Email e senha são obrigatórios' };
        }

        try {
            const response = await api.post('/auth/login', { email, password });

            // Verificar se a resposta tem os dados esperados
            if (!response.data || !response.data.token) {
                return { success: false, msg: 'Resposta do servidor inválida' };
            }

            const { token, userId, email: userEmail, userName, role, isAdmin: adminFlag } = response.data;

            // Verificar se os dados essenciais existem
            if (!token || !userId) {
                return { success: false, msg: 'Dados de autenticação incompletos' };
            }

            // Salvar no AsyncStorage
            await AsyncStorage.setItem('@JornalApp:token', token);

            const userData = {
                userId,
                email: userEmail,
                userName,
                role,
                isAdmin: adminFlag || false
            };

            await AsyncStorage.setItem('@JornalApp:user', JSON.stringify(userData));

            setToken(token);
            setUser(userData);
            setIsAdmin(adminFlag || false);

            return { success: true, data: response.data };
        } catch (error) {
            console.log('Erro ao logar:', error);

            if (error.response) {
                // Backend respondeu com erro (401, 400, etc)
                let errorMessage = 'Email ou senha inválidos';

                if (error.response.status === 401) {
                    errorMessage = 'Email ou senha incorretos';
                } else if (error.response.status === 400) {
                    errorMessage = error.response.data.error || 'Dados inválidos';
                } else if (error.response.status === 404) {
                    errorMessage = 'Usuário não encontrado';
                } else if (error.response.status === 500) {
                    errorMessage = 'Erro no servidor. Tente novamente mais tarde';
                }

                return {
                    success: false,
                    msg: errorMessage,
                    status: error.response.status
                };
            } else if (error.request) {
                // Requisição foi feita mas não houve resposta
                return {
                    success: false,
                    msg: 'Não foi possível conectar ao servidor. Verifique sua conexão.'
                };
            } else {
                // Erro na configuração da requisição
                return {
                    success: false,
                    msg: 'Erro ao fazer login. Tente novamente.'
                };
            }
        }
    };

    // Função de registro que já retorna o token
    const register = async (name, email, password, role) => {
        // ...
        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
                role
            });

            if (!response.data || !response.data.token) {
                return {success: false, msg: 'Resposta do servidor inválida'};
            }

            // ✅ Renomear role para userRole para evitar conflito
            const {
                token: responseToken,
                userId,
                email: userEmail,
                userName,
                role: userRole,      // <-- renomear aqui
                isAdmin: adminFlag
            } = response.data;

            if (!responseToken || !userId) {
                return {success: false, msg: 'Dados de autenticação incompletos'};
            }

            await AsyncStorage.setItem('@JornalApp:token', responseToken);

            const userData = {
                userId,
                email: userEmail,
                userName,
                role: userRole,      // <-- e aqui
                isAdmin: adminFlag || false
            };

            await AsyncStorage.setItem('@JornalApp:user', JSON.stringify(userData));

            setToken(responseToken);
            setUser(userData);
            setIsAdmin(adminFlag || false);

            return {success: true, data: response.data};
        } catch (error) {
            console.log('Erro ao registrar:', error);

            if (error.response) {
                let errorMessage = 'Erro ao criar conta';
                let validationErrors = null;

                if (error.response.status === 400) {
                    // Erros de validação Bean Validation retornam { errors: { campo: msg } }
                    if (error.response.data?.errors) {
                        validationErrors = error.response.data.errors;
                        errorMessage = 'Campos inválidos';
                    } else {
                        errorMessage = error.response.data?.error || 'Dados inválidos';
                    }
                }

                return {
                    success: false,
                    msg: errorMessage,
                    validationErrors,
                    status: error.response.status
                };
            }
        }
    }

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
            api,
            isAuthenticated: !!token && !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}