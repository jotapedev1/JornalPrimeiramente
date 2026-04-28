import React, { useState } from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import InputButton from "../components/inputButton"
import SendButton from "../components/SendButton";
import TemplateButton from "../components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const isButtonDisabled = inputValue.trim().length === 0 ||
        inputValue2.trim().length === 0;

    const handleSubmit = async () => {
        try{
            // const response = await axios.post('http://localhost:8080/user', formData);
            console.log('pedido de login enviado!');
            return true;
        }catch (error){
            console.log('Error: ', error);
        }
    }

    return (
        <View style={styles.container}>
                <JornalLogo/>

                <Text style={[styles.title,{width: '100%', textAlign: 'center', fontFamily: 'Lalezar_400Regular', top: 10}]}>Login</Text>
                <InputButton
                    label="E-mail:"
                    placeholder="Digite seu e-mail"
                    onChangeText={(value) => {
                        setInputValue(value);
                        setFormData({...formData, userEmail: value})
                    }}
                />
                <InputButton
                    label="Senha:"
                    placeholder="Digite sua senha"
                    onChangeText={(value) => {
                        setInputValue2(value);
                        setFormData({...formData, userPassword: value})
                    }}
                />

                <SendButton label={'Entrar'} onPress={()=>handleSubmit().then(navigation.navigate('Home'))}
                // disabled={isButtonDisabled}
                    />

                <View>
                <TemplateButton label={'Não tem Cadastro?'}
                onPress={()=>navigation.popTo('TypeSignUp')}/>
                </View>

                <View>
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
});


export default LoginScreen;