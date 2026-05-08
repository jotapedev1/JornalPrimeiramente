import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet, Alert, Platform} from 'react-native';
import InputButton from "../components/inputButton";
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
    const { register } = useContext(AuthContext); // Pega a função de login do contexto
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Configuração da URL base para diferentes plataformas
    const getBaseUrl = () => {
        if (Platform.OS === 'android') {
            return 'http://10.0.2.2:8080'; // Android Emulator
        }
        return 'http://localhost:8080'; // iOS ou Web
    };

    const isButtonDisabled =
        fullName.trim().length === 0 ||
        email.trim().length === 0 ||
        confirmEmail.trim().length === 0 ||
        password.trim().length === 0 ||
        confirmPassword.trim().length === 0 ||
        email.trim() !== confirmEmail.trim() ||
        password.trim() !== confirmPassword.trim();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return false;
        }

        if (email !== confirmEmail) {
            Alert.alert('Erro', 'Os e-mails não coincidem');
            return false;
        }

        if (fullName.trim().split(' ').length < 2) {
            Alert.alert('Erro', 'Digite seu nome completo');
            return false;
        }

        setLoading(true);
        try {
            const result = await register(fullName, email, password);
            console.log(result.data);

            if (result.success) {
                navigation.replace('Home'); // Use replace ao invés de navigate
            } else {
                // ❌ Mostra o erro retornado pelo backend
                Alert.alert('Erro no cadastro', result.msg || 'Alguns campos inválidos');
            }

            return result.success;
        } catch (error) {
            console.error('Erro no registro:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar criar sua conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <JornalLogo/>

            <Text style={styles.title}>Cadastre-se</Text>

            {fullName.trim().length > 0 && fullName.trim().split(' ').length < 2 && (
                <Text style={styles.errorText}>Digite seu nome completo</Text>
            )}
            <InputButton
                label="Nome Completo:"
                placeholder="Digite seu nome completo"
                onChangeText={setFullName}
                value={fullName}
            />

            <InputButton
                label="E-mail:"
                placeholder="Digite seu e-mail"
                onChangeText={setEmail}
                value={email}
            />

            {email.trim() !== confirmEmail.trim() && confirmEmail !== '' && (
                <Text style={styles.errorText}>E-mails não coincidem</Text>
            )}
            <InputButton
                label="Confirme seu e-mail"
                placeholder="Confirme seu e-mail"
                onChangeText={setConfirmEmail}
                value={confirmEmail}
            />

            <InputButton
                label="Senha:"
                placeholder="Digite sua senha"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />

            {password.trim() !== confirmPassword.trim() && confirmPassword !== '' && (
                <Text style={styles.errorText}>Senhas não coincidem</Text>
            )}
            <InputButton
                label="Confirme sua senha"
                placeholder="Confirme sua senha"
                secureTextEntry={true}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
            />

            <SendButton
                label={loading ? 'Cadastrando...' : 'Cadastre-se'}
                onPress={handleSubmit}
                disabled={isButtonDisabled || loading}
            />

            <TemplateButton
                label={'Já tem cadastro?'}
                onPress={() => navigation.navigate('Login')}
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
        width: '100%',
        fontFamily: 'Lalezar_400Regular',
        top: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 2,
        textAlign: "left",
        paddingHorizontal: 10,
        fontSize: 12
    },
});

export default SignUpScreen;