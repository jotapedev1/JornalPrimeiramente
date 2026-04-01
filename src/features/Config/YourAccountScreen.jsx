import React from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';

const YourAccountScreen = ({navigation}) => {
    const data=[
        {id: 1, name: 'Informações da Conta', route: 'AccountInfo'},
        {id: 2, name: 'Altere sua senha', route: 'ChangePass'},
        {id: 3, name: 'Desative sua conta', route: 'AccountDeactivation'},
    ];

    return (
        <View style={styles.container}>
            <View style={{display: 'absolute', width: '100%', height: 60, backgroundColor: '#e30000', justifyContent: 'center',
                borderTopColor: 'white', borderTopWidth: 2 }}>
                <Text style={{fontFamily: 'Lalezar_400Regular', color: 'white', fontSize: 30, alignSelf: 'center'}}>
                    Sua Conta</Text>
            </View>

            {data.map((item)=>(
                <View key={item.id} style={styles.viewStyle}>
                    <TouchableOpacity onPress={()=>navigation.navigate(item.route)}>
                        <Text style={styles.textStyle}>
                            {item.name}</Text>
                    </TouchableOpacity>
                </View>
            ))}


            <View style={{display: 'absolute', width: '100%', height: '100%', backgroundColor: '#e30000', justifyContent: 'center',
                borderTopColor: 'white', borderTopWidth: 2 }}>
            </View>
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
    viewStyle: {
        display: 'absolute', width: '100%', height: 60, backgroundColor: '#e30000', justifyContent: 'center',
        borderTopColor: 'white', borderTopWidth: 2, paddingTop: 5
    },
    textStyle: {
        fontFamily: 'Lalezar_400Regular',
        color: 'white',
        fontSize: 30,
        alignSelf: 'center'
    },
});


export default YourAccountScreen;