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
            <JornalLogo/>

           <Text>Menu Screen</Text>



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