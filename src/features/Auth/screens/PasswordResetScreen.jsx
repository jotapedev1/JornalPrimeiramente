import React, { useState } from 'react';
import {View, Text,  StyleSheet } from 'react-native';
import InputButton from "../components/inputButton"
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";

const PasswordResetScreen = ({ navigation }) => {
    const [press, setPress] = useState(false);

    function handlePress(){
        //console.log(press);
        return setPress(true);
    }

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
            />
            </View>

            <SendButton label={'Enviar'} onPress={handlePress} style={press === false ? {} : styles.pressedPermanent}/>

            <TemplateButton style={styles.templateButtonView} label={'Já tenho login'}
                            onPress={()=>navigation.popTo('Login')}/>


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