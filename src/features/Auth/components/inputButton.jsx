import {Text, TextInput, View, StyleSheet} from "react-native";
import React from "react";

const InputButton = ({ label, placeholder}) => {
    return (
        <View style={styles.inputView}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput style={styles.input} placeholder={placeholder || ''}></TextInput>
        </View>
    );
}

export default InputButton;

const styles = StyleSheet.create({
    inputView: {
        position: 'relative',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 30,
        backgroundColor: '#d9d9d9',
        marginLeft: 10,
        marginRight: 10
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 3,
        paddingHorizontal: 10,
        fontFamily: 'Inter-Regular'
    },
});