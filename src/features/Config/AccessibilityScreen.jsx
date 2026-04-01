import React from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';

const AccessibilityScreen = ({navigation}) => {
    const data=[
        {id: 1, name: 'Acessiblidade', route: 'AccessibilityConfig'},
        {id: 2, name: 'Tela', route: 'Frame'},
    ];

    return (
        <View style={styles.container}>
            <View style={{display: 'absolute', width: '100%', height: 60, backgroundColor: '#e30000', justifyContent: 'center',
                borderTopColor: 'white', borderTopWidth: 2 }}>
                <Text style={{fontFamily: 'Lalezar_400Regular', color: 'white', fontSize: 30, alignSelf: 'center'}}>
                    Acessibilidade e Tela</Text>
            </View>

            {data.map((item)=>(
                <View key={item.id} style={styles.viewStyle}>
                    <TouchableOpacity onPress={()=>navigation.navigate(item.route)} disabled={item.name === 'Tela'}>
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
        borderTopColor: 'white', borderTopWidth: 2
    },
    textStyle: {
        fontFamily: 'Lalezar_400Regular',
        color: 'white',
        fontSize: 30,
        alignSelf: 'center'},
});


export default AccessibilityScreen;