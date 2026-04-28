import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext({});

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadStoredData();
    }, []);

    const loadStoredData = async () => {
      try{
          const token = await AsyncStorage.getItem('@token');
          const storedUser = await AsyncStorage.getItem('@user');

          if(token && storedUser){
              const userData = JSON.parse(storedUser);
              setUser(userData);
              setIsAdmin(userData.isAdmin);
              api.defaults.headers.Authorization = `Bearer ${token}`;
          }
      }catch (error){
          console.log('Erro ao carregar dados:', error);
      }finally {
          setLoading(false);
      }
    };

    const login = async (email, password) => {
        try{
            const response = await api.post('/user', {email, password});
            const { token, userId, email: userEmail, nome, isAdmin: adminFlag } = response.data;

            await AsyncStorage.setItem('@token', token);

            const userData = {id: userId, email: userEmail, nome, isAdmin: adminFlag };
            await AsyncStorage.setItem('@user', JSON.stringify(userData));

            setUser(userData);
            setIsAdmin(adminFlag);

            return { success: true };
        }catch(error){
            console.log('Erro ao logar:', error);
            return { success: false, msg: 'Email ou senha inválidos' };
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('@token');
        await AsyncStorage.removeItem('@user');
        setUser(null);
        setIsAdmin(false);
    }

    return (
        <AuthContext.Provider value={{
            user, isAdmin, loading, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}