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

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>

            <Text style={[styles.title,{width: '100%', fontFamily: 'Lalezar_400Regular', marginTop: 10}]}>Edição 2025 - 5º Bimestre</Text>
            <View style={{width: '90%', height: 250, alignSelf: 'center'}}>
                <Image style={{width: '100%', height: '80%', borderRadius: 15, alignSelf: 'center', padding: 10}} source={require('../../../assets/imgs/signupimg.jpg')}/>
                <Text style={{color: 'black', marginTop: 50, fontFamily: 'Inter', paddingLeft: 10}}></Text>

            </View>
            <View style={{display: 'fixed', bottom: 0, top: 340}}>
                <View style={{width: '100%', height: '8%', display: 'flex',flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.popTo('Menu')} style={{width: 40, height: 40, display: 'flex'}}>
                        <Image source={require('../../../assets/icons/burger-icon.png')} style={{height: 40, width: 40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.popTo('Browse')} style={{width: 40, height: 40, display: 'flex'}}>
                        <Image source={require('../../../assets/icons/compass-icon.png')} style={{height: 40, width: 40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.popTo('Home')} style={{width: 40, height: 40, display: 'flex'}}>
                        <Image source={require('../../../assets/icons/home-icon.png')} style={{height: 40, width: 40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.popTo('Notification')} style={{width: 40, height: 40, display: 'flex'}}>
                        <Image source={require('../../../assets/icons/bell-icon.png')} style={{height: 40, width: 40}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.popTo('Profile')} style={{width: 40, height: 40, display: 'flex'}}>
                        <Image source={require('../../../assets/icons/profile-icon.png')} style={{height: 40, width: 40}}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
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
        paddingTop: 60,
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