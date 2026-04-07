import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import InputButton from "../../Auth/components/inputButton";
import SendButton from "../../Auth/components/SendButton";
import TemplateButton from "../../Auth/components/TemplateButton";
import ToggleBox from "../../Perfil/components/ToggleBox";

const AccessibilityConfigScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Visão</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.mainText}>
                        Aumentar contraste de cores
                    </Text>
                    <ToggleBox/>
                </View>
            </View>
            <View>
                <Text style={styles.title}>Mídia</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.mainText}>
                        Receber lembrete de descrição de imagem
                    </Text>
                    <ToggleBox/>
                </View>
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
        alignSelf: 'flex-start',
        padding: 10,
        paddingLeft: 15
    },
    mainText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        paddingLeft: 30,
        alignSelf: 'flex-start',
        paddingTop: 13,
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


export default AccessibilityConfigScreen;