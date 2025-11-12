import React from 'react';
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
import {Platform} from "react-native";
import InputButton from "../../Auth/components/inputButton"
import SendButton from "../../Auth/components/SendButton";
import TemplateButton from "../../Auth/components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import {c} from "react/compiler-runtime";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";

const ProfileScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>

            <Text>Profile Screen</Text>

            <View style={{width: '100%', height: '10%', backgroundColor: '#c5c5c5',display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                <TouchableOpacity>
                    <Image source={require('../../../assets/icons/burger-icon.png')}></Image>
                </TouchableOpacity>
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


export default ProfileScreen;