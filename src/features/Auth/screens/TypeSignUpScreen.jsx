import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, BackHandler, Image} from 'react-native';
import {Platform} from "react-native";
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";
import JornalLogo from "../../../shared/components/JornalLogo";

const TypeSignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>

            <Image source={require('../../../assets/imgs/signupimg.jpg')} style={styles.image1}/>

            <View style={{alignItems: 'center', paddingVertical: 10, marginBottom: 10}}>
                <Text style={{fontWeight: 500}}>O jornal bimestral da Etec X.</Text>
                <Text style={{fontFamily: 'Lalezar_400Regular', fontSize: 27}}>Escolha como se cadastrar:</Text>
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
    image1: {
        width: '100%',
        height: 200,
        position: 'relative',
        bottom: 10,
    }
});

export default TypeSignUpScreen;