import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import BottomBar from "../../../shared/components/BottomBar";

const ConfigurationScreen = ({navigation}) => {
    const data=[
        {id: 1, name: 'salvos', route: 'Bookmark'},
        {id: 2, name: 'configurações', route: 'Configuration'},
    ];

    return (
        <View style={styles.container}>

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


export default ConfigurationScreen;