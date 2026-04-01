import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";

const SendButton = ({ label, onPress, disabled }) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.sendView,
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
            ]}
        >
            <Text style={[
                styles.sendLabel,
                disabled && styles.disabledLabel
            ]}>
                {label}
            </Text>
        </Pressable>
    );
}

export default SendButton;

const styles = StyleSheet.create({
    sendView: {
        width: 180,
        height: 60,
        backgroundColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    sendLabel: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 500,
        color: 'white',
    },
    pressed: {
        backgroundColor: 'gray',
    },
    disabled: {
        backgroundColor: '#cccccc', // Cinza quando desabilitado
    },
    disabledLabel: {
        color: '#666666', // Texto cinza quando desabilitado
    }
});