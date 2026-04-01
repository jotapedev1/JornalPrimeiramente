// ChangePassScreen.js - Versão corrigida
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import InputButton from "../../Auth/components/inputButton";
import SendButton from "../../Auth/components/SendButton";

const ChangePassScreen = ({ navigation }) => {
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');

    // Calcula se o botão deve estar desabilitado
    const isButtonDisabled = inputValue.trim().length === 0 ||
        inputValue2.trim().length === 0 ||
        inputValue3.trim().length === 0;

    // Função chamada ao clicar no botão
    const handleSavePassword = () => {
        // Verificar se as senhas nova e confirmação são iguais
        if (inputValue2 !== inputValue3) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        // Verificar se a nova senha tem tamanho mínimo
        if (inputValue2.length < 6) {
            Alert.alert('Erro', 'A nova senha deve ter no mínimo 6 caracteres');
            return;
        }

        // Aqui você implementa a lógica para salvar a senha
        Alert.alert(
            'Sucesso',
            'Senha alterada com sucesso!',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <InputButton
                    label={"Insira sua senha atual"}
                    placeholder={"Senha atual"}
                    value={inputValue}
                    onChangeText={setInputValue}
                    secureTextEntry={true}
                />

                <InputButton
                    label={"Insira uma nova senha"}
                    placeholder={"Nova Senha"}
                    value={inputValue2}
                    onChangeText={setInputValue2}
                    secureTextEntry={true}
                />

                <InputButton
                    label={"Confirme sua nova senha"}
                    placeholder={"Confirmar Senha"}
                    value={inputValue3}
                    onChangeText={setInputValue3}
                    secureTextEntry={true}
                />
            </View>

            <SendButton
                label={"Salvar"}
                disabled={isButtonDisabled}
                onPress={handleSavePassword}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 60,
        padding: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        fontSize: 100,
    },
});

export default ChangePassScreen;