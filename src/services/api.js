import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    URLbackend: 'http://localhost:8080'
});

api.interceptors.request.use(async (config)=> {
    const token = await AsyncStorage.getItem('@token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;