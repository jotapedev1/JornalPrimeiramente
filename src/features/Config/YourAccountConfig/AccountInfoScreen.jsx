import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import InputButton from "../../Auth/components/InputButton";
import SendButton from "../../Auth/components/SendButton";
import { AuthContext } from "../../../context/AuthContext";
import PasswordInputButton from "../../Auth/components/PasswordInputButton";

const AccountInfoScreen = ({ navigation }) => {
    const { api } = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userEmail: '',
        userRole: '',
        userCreatedAt: ''
    });

    const loadUserProfile = async () => {
        try {
            setError('');
            const response = await api.get('/user/profile');

            // Ajuste conforme a estrutura real da sua API
            const userData = response.data; // ou response.data.userData

            setUserInfo({
                userName: userData.userName || userData.name || 'Usuário',
                userEmail: userData.userEmail || userData.email || '',
                userRole: userData.userRole || userData.role || 'USER',
                userCreatedAt: userData.userCreatedAt || userData.createdAt || new Date().toISOString()
            });

        } catch (error) {
            console.log("Error name: ", error.name);
            console.log("Error message: ", error.message);
            setError('Erro ao carregar perfil');
        } finally {
            setLoading(false);
        }
    };

    const verifyPassword = async () => {
        if (!password.trim()) {
            setError('Digite sua senha');
            return;
        }

        setLoading(true);
        try {
            // Envia senha para verificação
            const response = await api.post('/auth/verify-password', { password });

            if (response.data.valid) {
                setShowInfo(true);
                setError('');
            } else {
                setError('Senha incorreta');
            }
        } catch (error) {
            console.log("Erro ao verificar senha:", error);
            setError('Erro ao verificar senha');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserProfile();
    }, []);

    // Tela de loading
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    // Tela de informações (após senha confirmada)
    if (showInfo) {
        // Formatar data para exibição
        const formatDate = (dateString) => {
            if (!dateString) return 'Data não disponível';
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        };

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Informações da conta</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.subTitle}>Nome de usuário:</Text>
                    <Text style={styles.mainText}>{userInfo.userName}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.subTitle}>E-mail:</Text>
                    <Text style={styles.mainText}>{userInfo.userEmail}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.subTitle}>Conta criada em:</Text>
                    <Text style={styles.mainText}>{formatDate(userInfo.userCreatedAt)}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.subTitle}>Tipo de usuário:</Text>
                    <Text style={styles.mainText}>{userInfo.userRole === 'ADMIN' ? 'Administrador' : 'Integrante'}</Text>
                </View>
            </View>
        );
    }

    // Tela de verificação de senha
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificação de Segurança</Text>
            <Text style={styles.description}>
                Para visualizar suas informações, confirme sua senha atual.
            </Text>

            <PasswordInputButton
                label={"Senha atual"}
                placeholder={"Digite sua senha"}
                value={password}
                onChangeText={setPassword}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <SendButton
                label={loading ? "Verificando..." : "Confirmar"}
                onPress={verifyPassword}
                disabled={!password.trim() || loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Lalezar_400Regular',
        padding: 10,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        color: '#666',
        fontFamily: 'Inter-Regular',
        padding: 10,
    },
    infoContainer: {
        marginBottom: 15,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 5,
        fontFamily: 'Lalezar_400Regular',
    },
    mainText: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#333',
        fontFamily: 'Inter-Regular',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Inter-Regular',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});

export default AccountInfoScreen;