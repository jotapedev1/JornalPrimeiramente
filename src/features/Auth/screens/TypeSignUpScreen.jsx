import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, BackHandler, Image} from 'react-native';
import {Platform} from "react-native";
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";

const TypeSignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.titleJornal}>JORNAL PRIMEIRAMENTE</Text>
            </View>

            <Image source={require('../../../assets/imgs/signupimg.jpg')} style={styles.image1}/>

            <View style={{alignItems: 'center', paddingVertical: 30, marginTop: 80}}>
                <Text style={{fontWeight: 500}}>O jornal bimestral da Etec X.</Text>
                <Text style={{fontFamily: 'Lalezar_400Regular', fontSize: 27, marginTop: 20}}>Escolha como se cadastrar:</Text>
                <Text style={{fontWeight: 500, paddingLeft: 15, paddingRight: 15, textAlign: 'justify'}}>O Integrante faz parte da publicação do jornal e tem suas postagens vinculadas ao próprio perfil, enquanto o Leitor apenas lê as postagens. Os dois podem interagir com as postagens.</Text>
            </View>

            <SendButton label={'Participante'} onPress={()=>navigation.navigate('SignUpParticipant')}/>

            <SendButton label={'Leitor'} onPress={()=>navigation.navigate('SignUpReader')}/>

            <TemplateButton label={'Já tem login?'}
                            onPress={()=>navigation.navigate('Login')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    titleJornal: {
        fontFamily: 'Lalezar_400Regular',
        fontSize: 28,
        fontWeight: '900',
        textAlign: 'center',
        color: 'white',
    },
    topContainer: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 1,
        width: '110%',
        height: '8.5%',
        backgroundColor: '#e30000',
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
    button: {
        fontSize: 100
    },
    image1: {
        width: '110%',
        height: 200,
        position: 'absolute',
        top: 64,
    }
});


export default TypeSignUpScreen;