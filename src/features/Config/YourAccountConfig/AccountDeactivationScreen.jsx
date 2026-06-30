import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import SendButton from "../../Auth/components/SendButton";
import { AuthContext } from "../../../context/AuthContext";

const AccountDeactivationScreen = ({navigation}) => {
    const { api } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const deactivateRequest = async () => {
        setLoading(true);
        try {
            const response = await api.post('/user/deactivate');
            Alert.alert('Sucesso', response.data.message, [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert('Erro', error.response?.data?.error || 'Erro ao desativar conta');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Isso desativará sua conta.</Text>
                <Text style={styles.mainText}>
                    Dentro de 30 dias sua conta será desativada, se até lá você mudar de ideia: fazer login cancelará o processo de desativamento.</Text>
            </View>

            <SendButton label={loading ? "Enviando..." : "Desativar"} onPress={deactivateRequest} disabled={loading}/>
        </View>
    )
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
    mainText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        paddingHorizontal: 50,
        alignSelf: 'center',
        textAlign: 'center',
        paddingBottom: 20
    }
});


export default AccountDeactivationScreen;