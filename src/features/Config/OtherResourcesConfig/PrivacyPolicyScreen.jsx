import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import InputButton from "../../Auth/components/inputButton";
import SendButton from "../../Auth/components/SendButton";

const PrivacyPolicyScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Política de Privacidade:</Text>
            </View>
            <View>
                <Text style={styles.mainText}>
                    Info...
                </Text>
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


export default PrivacyPolicyScreen;