import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, BackHandler} from 'react-native';
import {Platform} from "react-native";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";
import InputButton from "../components/inputButton";
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";

const SignUpParticipantScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>
            <Text style={[styles.title,{ width: '100%', textAlign: 'center', fontFamily: 'Lalezar_400Regular'}]}>Cadastre-se</Text>
            <InputButton
                label="Nome Completo"
                placeholder="Digite seu nome completo"
            />
            <InputButton
                label="E-mail"
                placeholder="Digite seu e-mail"
            />
            <InputButton
                label="Confirme seu e-mail"
            />
            <InputButton
                label="Turma"
            />
            <InputButton
                label="Senha"
                placeholder="Digite sua senha"
            />
            <InputButton
                label="Confirme sua senha"
            />
            <SendButton label={'Cadastre-se'} onPress={()=>navigation.navigate('Home')}></SendButton>
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
        textAlign: 'center',
        marginBottom: 10,
    },

});


export default SignUpParticipantScreen;