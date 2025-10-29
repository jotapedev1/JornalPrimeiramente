import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
// Importe o authApi, que você criará em breve
// import authApi from '../api/authApi';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.titleJornal}>JORNAL PRIMEIRAMENTE</Text>
            </View>



            <TextInput style={styles.input} placeholder={"Digite algo"}></TextInput>

            <Text style={styles.errorText}>Teste de erro</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleJornal: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Lalezar, sans-serif'
    },
    topContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 5,
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    }
    // Adicione mais estilos conforme necessário
});


export default LoginScreen;