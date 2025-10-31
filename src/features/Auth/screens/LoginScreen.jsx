import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import {Platform} from "react-native";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";
// Importe o authApi, que você criará em breve
// import authApi from '../api/authApi';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.titleJornal}>JORNAL PRIMEIRAMENTE</Text>
            </View>

            <View style={styles.inputView}>
                <Text style={styles.inputLabel}>E-mail:</Text>
                <TextInput style={styles.input} placeholder={"Digite algo"}></TextInput>
            </View>

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
        flex: 1,
        position: 'absolute',
        top: 60,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
        width: '115%',
        height: '9%',
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
        marginBottom: 30,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: 'regular',
        textAlign: 'left',
        marginBottom: 3,
        paddingHorizontal: 10,
    },
    inputView: {
        position: 'absolute',
        top: 200,
        left: 10,
        width: '100%',
    },
    // Adicione mais estilos conforme necessário
});


export default LoginScreen;