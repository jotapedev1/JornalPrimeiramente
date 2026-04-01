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
    TouchableOpacity, ScrollView, VirtualizedList
} from 'react-native';
import {Platform} from "react-native";
import InputButton from "../../Auth/components/inputButton"
import SendButton from "../../Auth/components/SendButton";
import TemplateButton from "../../Auth/components/TemplateButton";
import JornalLogo from "../../../shared/components/JornalLogo";
import {c} from "react/compiler-runtime";
import {Lalezar_400Regular} from "@expo-google-fonts/lalezar";
import BottomBar from "../../../shared/components/BottomBar";

const ProfileScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>
            <View style={styles.mainContent}>
                <ScrollView>
                    <View style={styles.profileDiv}>
                        <Image source={require('../../../assets/imgs/signupimg.jpg')} style={styles.profilePic}></Image>
                        <Text style={styles.profileTitle}>Perfil</Text>
                        <Text style={styles.profileDesc}>Sou um perfil de teste, feito para testar. Testando... 1, 2, 3...</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Artigos Curtidos</Text>
                        
                    </View>

                </ScrollView>
            </View>
            <BottomBar navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 10,
        fontFamily: 'Lalezar_400Regular',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        fontSize: 100,
    },
    mainContent: {
        zIndex: 300,
        marginTop: 20
    },
    profileDiv:{
        backgroundColor: 'white',
        width: '100%', height: 280,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 0.6,
        borderBottomColor: '#d5d5d5'
    },
    profilePic: {
        borderRadius: '100%',
        width: 150, height: 150,
        alignSelf: 'center'
    },
    profileTitle: {
        fontFamily: 'Lalezar_400Regular',
        fontSize: 30, marginTop: 10
    },
    profileDesc: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        paddingHorizontal: 50,
        alignSelf: 'center',
        textAlign: 'center'
    },
});

export default ProfileScreen;