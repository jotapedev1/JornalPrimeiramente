import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleBox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={toggleCheckbox}
            activeOpacity={0.7}
        >
            <View style={[
                styles.checkbox,
                isChecked && styles.checked
            ]}>
                {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            {/*<Text style={styles.label}>*/}
            {/*    {isChecked ? 'Ativado' : 'Desativado'}*/}
            {/*</Text>*/}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#666',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default ToggleBox;