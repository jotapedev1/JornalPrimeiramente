import React, { useState, useContext } from 'react';
import {View, Text,  StyleSheet, Alert } from 'react-native';
import InputButton from "../components/InputButton"
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import { AuthContext } from "../../../context/AuthContext";

const PasswordResetScreen = ({ navigation }) => {
    const { api } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email.trim()) {
            Alert.alert('Erro', 'Digite seu e-mail');
            return;
        }
        setLoading(true);
        try {
            await api.post('/auth/forgot-password', { email });
            Alert.alert(
                'Verifique seu e-mail',
                'Se o e-mail informado existir em nossa base, enviamos um link de recuperação.',
                [{ text: 'OK', onPress: () => navigation.popTo('Login') }]
            );
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível processar sua solicitação');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <JornalLogo/>

            <Text style={[styles.title,{width: '100%', textAlign: 'center',
                fontFamily: 'Lalezar_400Regular', top: 10}]}>
                Esqueci minha senha</Text>

            <View style={{top: 10}}>
                <InputButton
                    label="E-mail:"
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <SendButton
                label={loading ? 'Enviando...' : 'Enviar'}
                onPress={handleSubmit}
                disabled={loading || !email.trim()}
            />

            <TemplateButton style={styles.templateButtonView} label={'Já tenho login'}
                            onPress={()=>navigation.popTo('Login')}/>
        </View>
    );
};
// ... styles permanecem iguais

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        fontSize: 100
    },
    templateButtonView: {
        margin: 10
    },
    pressedPermanent: {
        width: 180,
        height: 60,
        backgroundColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        top: 5,
        bottom: 5,
        marginTop: 5,
        marginBottom: 5,
    }
});


export default PasswordResetScreen;