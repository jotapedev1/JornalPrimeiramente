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
import BottomBar from "../../../shared/components/BottomBar";

const MenuScreen = ({navigation}) => {
    return (
        <View style={styles.container}>

            <View style={{display: 'absolute', width: '100%', height: 60, backgroundColor: '#e30000', justifyContent: 'center',
                borderTopColor: 'white', borderTopWidth: 2 }}>
                <Text style={{fontFamily: 'Lalezar_400Regular', color: 'white', fontSize: 30, alignSelf: 'center'}}>
                    Menu</Text>
            </View>

           <View style={{display: 'absolute', width: '100%', height: 60, backgroundColor: '#e30000', justifyContent: 'center',
            borderTopColor: 'white', borderTopWidth: 2 }}>
            <Text style={{fontFamily: 'Lalezar_400Regular', color: 'white', fontSize: 30, alignSelf: 'center'}}>
                Salvos</Text>
           </View>

            <View style={{display: 'absolute', width: '100%', height: 60, backgroundColor: '#e30000', justifyContent: 'center',
                borderTopColor: 'white', borderTopWidth: 2 }}>
                <Text style={{fontFamily: 'Lalezar_400Regular', color: 'white', fontSize: 30, alignSelf: 'center'}}>
                    Edições</Text>
            </View>

            <View style={{display: 'absolute', width: '100%', height: 60, backgroundColor: '#e30000', justifyContent: 'center',
                borderTopColor: 'white', borderTopWidth: 2 }}>
                <Text style={{fontFamily: 'Lalezar_400Regular', color: 'white', fontSize: 30, alignSelf: 'center'}}>
                    Configurações</Text>
            </View>
            <View style={{display: 'absolute', width: '100%', height: '100%', backgroundColor: '#e30000', justifyContent: 'center',
                borderTopColor: 'white', borderTopWidth: 2 }}>
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


export default MenuScreen;