import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LikeButton = ({ height, width, mediaId }) => {
    const { api } = useContext(AuthContext);

    const icons = {
        heartFilled: require('../../assets/icons/heartFilled.png'),
        heartEmpty: require('../../assets/icons/heartEmpty.png'),
    };

    const [liked, setLiked] = useState(false);

    const handlePress = async () => {
        // Atualiza visualmente de imediato (optimistic update)
        setLiked(prev => !prev);
        try {
            await api.post(`/like/${mediaId}`);
        } catch (error) {
            // Reverte se falhar
            setLiked(prev => !prev);
            console.log('Erro ao curtir:', error.response?.data || error.message);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePress}
            style={styles.container}
        >
            <Image
                source={liked ? icons.heartFilled : icons.heartEmpty}
                style={{ height, width }}
            />
        </TouchableOpacity>
    );
};

export default LikeButton;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center"
    },
});