import React from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import SendButton from "../Auth/components/SendButton";
import ToggleBox from "../Perfil/components/ToggleBox";

const NotificationsConfigScreen = ({navigation}) =>{
    function deactivateRequest() {
        alert('button pressed');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações de Notificação:</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.mainText}>
                       Notificações por push
                    </Text>
                    <ToggleBox/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.mainText}>
                        Notificações por e-mail
                    </Text>
                    <ToggleBox/>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        fontSize: 100,
    },
    mainText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        paddingLeft: 20,
        alignSelf: 'flex-start',
        paddingTop: 13,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 10,
        paddingLeft: 15
    },
});


export default NotificationsConfigScreen;