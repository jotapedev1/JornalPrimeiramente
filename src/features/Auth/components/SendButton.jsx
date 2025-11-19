import {Text, View, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import React from "react";

const SendButton = ({ label, onPress }) => {
    return (
        <Pressable onPress={onPress}
            style={({ pressed }) => [
            styles.sendView,
            pressed ? styles.pressed : {},
        ]}>
                <Text style={styles.sendLabel}>{label}</Text>
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
        top: 5,
        bottom: 5,
        marginTop: 5,
        marginBottom: 5
    },
    sendLabel: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 500,
        color: 'white',
    },
    pressed: {
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