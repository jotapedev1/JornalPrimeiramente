import React, { useState } from 'react';
import {View, Text,  StyleSheet } from 'react-native';
import InputButton from "../components/inputButton"
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
                <JornalLogo/>

                <Text style={[styles.title,{width: '100%', textAlign: 'center', fontFamily: 'Lalezar_400Regular', top: 10}]}>Login</Text>
                <InputButton
                    label="E-mail:"
                    placeholder="Digite seu e-mail"
                />
                <InputButton
                    label="Senha:"
                    placeholder="Digite sua senha"
                />
                <SendButton label={'Entrar'} onPress={()=>navigation.navigate('Home')}/>

                <View style={{marginTop: 7}}>
                <TemplateButton style={styles.templateButtonView} label={'Não tem Cadastro?'}
                onPress={()=>navigation.popTo('TypeSignUp')}/>
                </View>

                <View style={{top: 25}}>
                    <TemplateButton label={'Esqueceu a senha?'}
                    onPress={()=>navigation.popTo('PasswordReset')}/>
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
    }
});


export default LoginScreen;