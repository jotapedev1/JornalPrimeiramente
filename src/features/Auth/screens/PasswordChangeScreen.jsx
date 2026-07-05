import SendButton from "../components/SendButton";
import PasswordInputButton from "../components/PasswordInputButton";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {Alert, View, Text, StyleSheet} from "react-native";

const PasswordChangeScreen = ({ route, navigation }) => {
    const token = route.params?.token;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { api } = useContext(AuthContext);

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/reset-password', {
                token,
                newPassword
            });

            Alert.alert(
                'Sucesso!',
                'Senha redefinida com sucesso.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
        } catch (error) {
            Alert.alert('Erro', error.response?.data?.error || 'Token inválido ou expirado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redefinir Senha</Text>
            <PasswordInputButton
                label="Nova Senha"
                placeholder="Digite sua nova senha"
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <PasswordInputButton
                label="Confirmar Senha"
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <SendButton
                label={loading ? 'Salvando...' : 'Salvar'}
                onPress={handleSubmit}
                disabled={!newPassword || !confirmPassword || loading}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'Lalezar_400Regular',
    },
    errorText: {
        color: 'red',
        marginBottom: 2,
        textAlign: 'left',
        paddingHorizontal: 10,
        fontSize: 12,
    },
});
export default PasswordChangeScreen;