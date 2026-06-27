// BookmarkButton.js

import React, { useContext, useEffect, useState } from "react";
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
    const [initialLoading, setInitialLoading] = useState(true);
    const [localSaved, setLocalSaved] = useState(saved);

    const icons = {
        bookmarkEmpty: require("../../../assets/icons/bookmark-icon-empty.png"),
        bookmarkFilled: require("../../../assets/icons/bookmark-icon-filled.png"),
    };

    // Busca o estado real do backend
    useEffect(() => {
        if (!mediaId) return;

        let mounted = true;

        const fetchSavedState = async () => {
            try {
                setInitialLoading(true);

                const response = await api.get(`/save/${mediaId}`);

                if (
                    mounted &&
                    typeof response.data.saved === "boolean"
                ) {
                    setLocalSaved(response.data.saved);
                    onToggle?.(mediaId, response.data.saved);
                }
            } catch (error) {
                console.log(
                    "Check save error:",
                    error.response?.data || error.message
                );

                // fallback para a prop recebida
                if (mounted) {
                    setLocalSaved(saved);
                }
            } finally {
                if (mounted) {
                    setInitialLoading(false);
                }
            }
        };

        fetchSavedState();

        return () => {
            mounted = false;
        };
    }, [mediaId]);

    const handleBookmarkPress = async () => {
        if (loading || !mediaId) return;

        const previousState = localSaved;
        const optimisticState = !previousState;

        // atualização otimista
        setLocalSaved(optimisticState);
        onToggle?.(mediaId, optimisticState);

        try {
            setLoading(true);

            const response = await api.post(`/save/${mediaId}`);

            if (typeof response.data.saved === "boolean") {
                setLocalSaved(response.data.saved);
                onToggle?.(mediaId, response.data.saved);
            }
        } catch (error) {
            console.log(
                "Bookmark error:",
                error.response?.data || error.message
            );

            // rollback
            setLocalSaved(previousState);
            onToggle?.(mediaId, previousState);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBookmarkPress}
            style={styles.container}
            disabled={loading || initialLoading}
        >
            {loading || initialLoading ? (
                <ActivityIndicator size="small" color="#666" />
            ) : (
                <Image
                    source={
                        localSaved
                            ? icons.bookmarkFilled
                            : icons.bookmarkEmpty
                    }
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