import {Text, View, StyleSheet, Pressable} from "react-native";
import React from "react";

const TemplateButton = ({ label, onPress }) => {
    return (
        <Pressable onPress={onPress}
                   style={({ pressed }) => [
                       styles.sendLabel,
                       pressed ? styles.pressed : {},
                   ]}>
                <Text style={styles.sendLabel}>{label}</Text>
        </Pressable>

    );
}

export default TemplateButton;

const styles = StyleSheet.create({
    sendLabel: {
        alignSelf: 'center',
        fontWeight: 500,
        color: '#0098ff',
        top: 10
    },
    pressed: {
        fontWeight: 500,
        top: 10,
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#d5fdff',
    }
});