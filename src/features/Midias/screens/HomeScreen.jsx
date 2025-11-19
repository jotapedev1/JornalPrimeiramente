import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ActivityIndicator,
    BackHandler,
    Image,
    TouchableOpacity
} from 'react-native';
import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>
            <Text style={[styles.title,{width: '100%', fontFamily: 'Lalezar_400Regular'}]}>Edição 2025 - 5º Bimestre</Text>
            <View style={{width: '90%', height: 250, alignSelf: 'center'}}>
                <Image style={{width: '100%', height: '80%', borderRadius: 15, alignSelf: 'center', padding: 10}} source={require('../../../assets/imgs/signupimg.jpg')}/>
                <Text style={{color: 'black', marginTop: 50, fontFamily: 'Inter', paddingLeft: 10}}></Text>
            </View>

            <BottomBar navigation={navigation}/>
        </View>
    );
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
        alignContent: 'flex-start',
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
});


export default HomeScreen;