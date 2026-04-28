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
import NotificationCard from "../components/NotificationCard";

const NotificationScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <JornalLogo/>

            <View style={styles.mainContent}>
                <ScrollView>
                    <NotificationCard/>
                </ScrollView>
            </View>

            <BottomBar navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
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