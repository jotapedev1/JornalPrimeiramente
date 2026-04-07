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
                    <Text style={styles.title}>Nome de usuário: </Text>
                    <Text style={styles.mainText}>João Santos </Text>
                </View>
                <View>
                    <Text style={styles.title}>E-mail: </Text>
                    <Text style={styles.mainText}>joao.santos@gemail.com </Text>
                </View>
                <View>
                    <Text style={styles.title}>Conta criada em: </Text>
                    <Text style={styles.mainText}>14/03/2026</Text>
                </View>
                <View>
                    <Text style={styles.title}>Data de nascimento: </Text>
                    <Text style={styles.mainText}>13/02/2006 </Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        padding: 10,
        paddingLeft: 15
    },
    mainText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        paddingLeft: 30,
        alignSelf: 'flex-start',
        paddingBottom: 15
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