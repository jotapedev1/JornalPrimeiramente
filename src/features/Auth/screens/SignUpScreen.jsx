import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, BackHandler, Alert} from 'react-native';
import {Platform} from "react-native";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";
import InputButton from "../components/inputButton";
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import {AuthContext} from "../../../context/AuthContext";
import axios from "axios";

const SignUpScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [inputValue4, setInputValue4] = useState('');
    const [inputValue5, setInputValue5] = useState('');

    const isButtonDisabled = inputValue.trim().length === 0 ||
        inputValue2.trim().length === 0 ||
        inputValue3.trim().length === 0 ||
        inputValue4.trim().length === 0 ||
        inputValue5.trim().length === 0;

    const handleSubmit = async () => {
        if (inputValue2 !== inputValue3) {
            return Alert.alert('As senhas não coincidem');
        }

        if (inputValue4 !== inputValue5) {
            return Alert.alert('Os emails não coincidem');
        }

        try{
            const response = await axios.post('http://localhost:8080/user', formData);
            console.log('usuário registrado!');
            return response;
        }catch (error){
            console.log('Error: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <JornalLogo/>

            <Text style={[styles.title,{ width: '100%', textAlign: 'center', fontFamily: 'Lalezar_400Regular'}]}>Cadastre-se</Text>

            {inputValue.trim().length > 0 && inputValue.trim().split(' ').length < 2
                && <Text style={styles.errorText}>Digite seu nome completo</Text>}
            <InputButton
                label="Nome Completo:"
                placeholder="Digite seu nome completo"
                onChangeText={(value)=>{
                    setInputValue(value);
                    setFormData({...formData, userName: value})
                }}
                value={inputValue}
            />


            <InputButton
                label="E-mail:"
                placeholder="Digite seu e-mail"
                onChangeText={(value)=>{
                    setInputValue2(value);
                    setFormData({...formData, userEmail: value})
                }}
                value={inputValue2}
            />
            {inputValue2.trim() !== inputValue3.trim()
                && inputValue3 !== '' && <Text style={styles.errorText}>E-mails não coincidem</Text>}
            <InputButton
                label="Confirme seu e-mail"
                onChangeText={(value)=>{
                    setInputValue3(value);
                }}
                value={inputValue3}
            />

            <InputButton
                label="Senha:"
                placeholder="Digite sua senha"
                onChangeText={(value)=>{
                    setInputValue4(value);
                    setFormData({...formData, userPassword: value})
                }}
                value={inputValue4}
            />
            {inputValue4.trim() !== inputValue5.trim()
                && inputValue5 !== '' && <Text style={styles.errorText}>Senhas não coincidem</Text>}
            <InputButton
                label="Confirme sua senha"
                onChangeText={(value)=>{
                    setInputValue5(value);
                }}
                value={inputValue5}
            />
            <SendButton label={'Cadastre-se'} onPress={async () => {
                const success = await handleSubmit();
                if (success) navigation.navigate('Home');
            }} disabled={isButtonDisabled}></SendButton>
            <TemplateButton label={'Já tem cadastro?'} onPress={()=> navigation.popTo('Login')}/>

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