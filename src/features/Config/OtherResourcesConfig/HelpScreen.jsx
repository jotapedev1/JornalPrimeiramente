import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import InputButton from "../../Auth/components/inputButton";
import SendButton from "../../Auth/components/SendButton";

const HelpScreen = ({navigation}) => {
    const [disabledButton, setDisabledButton] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleDisabledButton = () =>{
        setDisabledButton(true);
    }

    const handlePress = () => {
        alert("Pedido enviado.");
        setInputValue("");
    }

    const isButtonDisabled = inputValue.trim().length === 0;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Ajuda:</Text>
            </View>
            <View>
                <Text style={styles.mainText}>
                    Conte-nos seu problema
                </Text>
                <InputButton value={inputValue} onChangeText={setInputValue}/>
                <SendButton label={"Enviar"} disabled={isButtonDisabled} onPress={handlePress}/>
            </View>
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
        alignSelf: 'center',
        alignContent: 'center',
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
    mainText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        paddingHorizontal: 50,
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop:10,
        paddingBottom: 30
    }
});


export default HelpScreen;