// BookmarkButton.js
import React, {useContext, useEffect, useState} from "react";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";

const BookmarkButton = ({
                            mediaId,
                            height = 25,
                            width = 25,
                            saved = false,
                            onToggle,
                        }) => {
    const { api } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [localSaved, setLocalSaved] = useState(saved);

    const icons = {
        bookmarkEmpty: require("../../../assets/icons/bookmark-icon-empty.png"),
        bookmarkFilled: require("../../../assets/icons/bookmark-icon-filled.png"),
    };

    // Atualizar estado local quando a prop saved mudar
    useEffect(() => {
        setLocalSaved(saved);
    }, [saved]);

    const handleBookmarkPress = async () => {
        if (loading || !mediaId) return;

        // Estado otimista
        const optimisticSaved = !localSaved;
        setLocalSaved(optimisticSaved);

        // Notificar o pai sobre a mudança otimista
        onToggle?.(mediaId, optimisticSaved);

        try {
            setLoading(true);
            const response = await api.post(`/save/${mediaId}`);

            // Estado real vindo do servidor
            const newSaved = response.data.saved;
            setLocalSaved(newSaved);

            // Notificar o pai com o estado real
            onToggle?.(mediaId, newSaved);

        } catch (error) {
            console.log("Bookmark error:", error.response?.data || error.message);

            // Reverter para o estado anterior em caso de erro
            const previousSaved = !optimisticSaved;
            setLocalSaved(previousSaved);
            onToggle?.(mediaId, previousSaved);

        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBookmarkPress}
            style={styles.container}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#666" />
            ) : (
                <Image
                    source={localSaved ? icons.bookmarkFilled : icons.bookmarkEmpty}
                    style={{ height, width }}
                    resizeMode="contain"
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 4,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BookmarkButton;