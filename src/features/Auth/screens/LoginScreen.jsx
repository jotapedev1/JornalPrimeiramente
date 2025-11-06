import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, BackHandler} from 'react-native';
import {Platform} from "react-native";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";
import InputButton from "../components/inputButton";
// Importe o authApi, que você criará em breve
// import authApi from '../api/authApi';

const LoginScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.titleJornal}>JORNAL PRIMEIRAMENTE</Text>
            </View>
                <Text style={[styles.title,{width: '100%', textAlign: 'center'}]}>Login</Text>
                <InputButton
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                />
                <InputButton
                    label="Senha"
                    placeholder="Digite sua senha"
                />
                <Button title={'Entrar'}/>
                <Button title={'Não tem Cadastro?'}
                onPress={()=>navigation.navigate('SignUp')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    titleJornal: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Lalezar-Regular',
    },
    topContainer: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 1,
        width: '110%',
        height: '8.5%',
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
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


export default LoginScreen;