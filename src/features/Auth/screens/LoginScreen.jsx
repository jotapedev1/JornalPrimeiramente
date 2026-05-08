// screens/auth/LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import InputButton from "../components/inputButton";
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import { AuthContext } from "../../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
    const { loginWithCredentials } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const isButtonDisabled = email.trim().length === 0 || password.trim().length === 0;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await loginWithCredentials(email, password);

            if (result.success) {
                navigation.replace('Home'); // Use replace ao invés de navigate
            } else {
                Alert.alert('Erro no login', result.msg || 'Email ou senha inválidos');
            }

            return result.success;
        } catch (error) {
            console.log('Erro ao logar:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <JornalLogo />
            <Text style={styles.title}>Login</Text>

            <InputButton
                label="E-mail:"
                placeholder="Digite seu e-mail"
                onChangeText={setEmail}
                value={email}
            />

            <InputButton
                label="Senha:"
                placeholder="Digite sua senha"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />

            <SendButton
                label={loading ? 'Entrando...' : 'Entrar'}
                onPress={handleSubmit}
                disabled={isButtonDisabled || loading}
            />

            <View style={styles.footer}>
                <TemplateButton
                    label={'Não tem Cadastro?'}
                    onPress={() => navigation.navigate('TypeSignUp')}
                />

                <TemplateButton
                    label={'Esqueceu a senha?'}
                    onPress={() => navigation.navigate('PasswordReset')}
                />
            </View>
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
        width: '100%',
        fontFamily: 'Lalezar_400Regular',
        marginVertical: 20,
    },
    footer: {
        marginTop: 20,
        gap: 10,
    },
});

export default LoginScreen;