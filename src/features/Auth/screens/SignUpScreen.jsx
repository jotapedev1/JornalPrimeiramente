import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet, Alert, Platform} from 'react-native';
import InputButton from "../components/InputButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import {AuthContext} from "../../../context/AuthContext";
import PasswordInputButton from "../components/PasswordInputButton";
import DropDownPicker from "react-native-dropdown-picker";
import SendButton from "../components/SendButton";

const SignUpScreen = ({ navigation }) => {
    const { register } = useContext(AuthContext); // Pega a função de login do contexto
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(false);

    //picker states
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Leitor', value: 'READER' },
        { label: 'Integrante', value: 'PARTICIPANT' },
    ]);

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
            return;
        }
        if (email !== confirmEmail) {
            Alert.alert('Erro', 'Os e-mails não coincidem');
            return;
        }
        if (fullName.trim().split(' ').length < 2) {
            Alert.alert('Erro', 'Digite seu nome completo');
            return;
        }
        if (!role) {
            Alert.alert('Erro', 'Escolha seu tipo de usuário');
            return;
        }

        setLoading(true);
        try {
            const result = await register(fullName, email, password, role);

            if (result.success) {
                navigation.replace('Home');
            } else {
                // Trata tanto erros de validação de campo quanto erros gerais
                if (result.validationErrors) {
                    const msgs = Object.values(result.validationErrors).join('\n');
                    Alert.alert('Campos inválidos', msgs);
                } else {
                    Alert.alert('Erro no cadastro', result.msg || 'Verifique os campos e tente novamente');
                }
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao criar sua conta');
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

            <PasswordInputButton
                label="Senha:"
                placeholder="Digite sua senha"
                onChangeText={setPassword}
                value={password}
            />

            {password.trim() !== confirmPassword.trim() && confirmPassword !== '' && (
                <Text style={styles.errorText}>Senhas não coincidem</Text>
            )}
            <PasswordInputButton
                label="Confirme sua senha"
                placeholder="Confirme sua senha"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
            />

            {/*   SET USER TYPE HERE   */}
            <DropDownPicker open={open}
                            value={role}
                            items={items}
                            setOpen={setOpen}
                            setValue={setRole}
                            setItems={setItems}
                            placeholder={"Selecione o seu tipo de usuário"}
                            listMode="SCROLLVIEW"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdown}
                            zIndex={3000}
                            zIndexInverse={1000}/>


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
    dropdown: {
        borderColor: '#e6e6e6',
        marginLeft: 10,
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#e6e6e6',
        borderWidth: 1,
        width: '95%',
        marginBottom: 15,
    }
});

export default SignUpScreen;