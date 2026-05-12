import {Text, TextInput, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { Ionicons } from "@expo/vector-icons";

const PasswordInputButton = ({ label, placeholder, value, onChangeText }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <View style={styles.inputView}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder={placeholder || ''}
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={togglePasswordVisibility}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={22}
                        color="#666"
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default PasswordInputButton;

const styles = StyleSheet.create({
    inputView: {
        position: 'relative',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#e6e6e6',
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        position: 'absolute',
        right: 1,
        padding: 1,
        width: '95%',
    },
    eyeButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        left: 340,
    },

});
