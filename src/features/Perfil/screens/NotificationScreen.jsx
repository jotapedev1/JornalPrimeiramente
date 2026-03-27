import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";

const NotificationScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>

            <View style={styles.mainContent}>
                <ScrollView>
                    <View style={{backgroundColor: 'white', width: '100%', height: 85, flexDirection: 'row', borderBottomWidth: 0.6,
                        borderBottomColor: '#d5d5d5'}}>
                        <Image source={require('../../../assets/imgs/signupimg.jpg')} style={{borderRadius: '100%', width: 60, height: 60,  left: 14}}/>
                        <Text style={{fontFamily: 'Lalezar_400Regular', fontSize: 20, flexDirection: 'row',  width: '100%', height: 100, left: 25}}>Perfil curtiu sua obra.
                            <Text style={{fontFamily: 'Inter', fontSize: 13, width: 15, height: 15, alignItems: 'stretch', flexWrap: 'nowrap'}}>{"\n"}Sou um perfil de teste, feito para testar.</Text>
                        </Text>



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
        height: '150%',
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
    mainContent: {
        zIndex: 300,
        marginTop: 10
    },
});

export default NotificationScreen;