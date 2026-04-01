import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import InputButton from "../../Auth/components/inputButton";
import SendButton from "../../Auth/components/SendButton";

const AccountInfoScreen = ({navigation}) => {
    const [inputValue, setInputValue] = useState('');
    const [actualScreen, setActualScreen] = useState(false);

    const renderActualScreen = () => {
        setActualScreen(true);
    }

    const isButtonDisabled = inputValue.trim().length === 0;

    if(actualScreen){
        return (
            <View style={[styles.container, {top: 20}]}>
                <View>
                    <Text>Nome de usuário: </Text>
                </View>
                <View>
                    <Text>E-mail: </Text>
                </View>
                <View>
                    <Text>Conta criada em: </Text>
                </View>
                <View>
                    <Text>Data de nascimento: </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container, {top: 20}]}>
            <View>
                <InputButton label={"Insira a senha atual"} placeholder={"Confirme sua senha atual"}
                             value={inputValue} onChangeText={setInputValue}/>
            </View>

            <SendButton label={"Enviar"} onPress={renderActualScreen} disabled={isButtonDisabled}/>
        </View>
    )
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
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        paddingTop: 60,
        padding: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        fontSize: 100,
    },
});


export default AccountInfoScreen;