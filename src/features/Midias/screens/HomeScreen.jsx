import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ActivityIndicator, BackHandler, Image} from 'react-native';
import {Platform} from "react-native";
import InputButton from "../../Auth/components/inputButton"
import SendButton from "../../Auth/components/SendButton";
import TemplateButton from "../../Auth/components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import {c} from "react/compiler-runtime";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>

            <Text style={[styles.title,{width: '100%', fontFamily: 'Lalezar_400Regular'}]}>Edição 2025 - 5º Bimestre</Text>
            <View style={{width: '90%', height: 250, alignSelf: 'center'}}>
                <Image style={{width: '100%', height: '80%', borderRadius: 15, alignSelf: 'center'}} source={require('../../../assets/imgs/signupimg.jpg')}/>
                <Text style={{color: 'black', marginTop: 14, fontFamily: 'Inter', paddingLeft: 10}}></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        paddingTop: 60
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        fontSize: 100
    },
});


export default HomeScreen;