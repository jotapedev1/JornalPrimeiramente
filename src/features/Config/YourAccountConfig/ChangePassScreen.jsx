import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import SendButton from "../../Auth/components/SendButton";
import PasswordInputButton from "../../Auth/components/PasswordInputButton";
import { AuthContext } from "../../../context/AuthContext";

const ChangePassScreen = ({ navigation }) => {
    const { api } = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const isButtonDisabled =
        currentPassword.trim().length === 0 ||
        newPassword.trim().length === 0 ||
        confirmPassword.trim().length === 0;

    const handleSavePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Erro', 'A nova senha deve ter no mínimo 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            await api.put('/user/change-password', {
                currentPassword,
                newPassword,
            });

            Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            const msg = error.response?.data?.error || 'Erro ao alterar senha';
            Alert.alert('Erro', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alterar senha</Text>

            <PasswordInputButton
                label="Senha atual"
                placeholder="Digite sua senha atual"
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />

            <PasswordInputButton
                label="Nova senha"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChangeText={setNewPassword}
            />

            {newPassword.trim() !== confirmPassword.trim() && confirmPassword !== '' && (
                <Text style={styles.errorText}>As senhas não coincidem</Text>
            )}

            <PasswordInputButton
                label="Confirme a nova senha"
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <SendButton
                label={loading ? 'Salvando...' : 'Salvar'}
                disabled={isButtonDisabled || loading}
                onPress={handleSavePassword}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
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

export default ChangePassScreen;