// BookmarksScreen.js
import { useContext, useEffect, useState, useCallback } from "react";
import {
    FlatList,
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    RefreshControl,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import MediaCard from "../../../shared/components/MediaCard";

export default function BookmarksScreen() {
    const { api } = useContext(AuthContext);

    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        try {
            setLoading(true);
            const response = await api.get("/save");
            // Garantir que cada item tenha a propriedade 'saved: true'
            const bookmarksWithSaved = response.data.map(item => ({
                ...item,
                saved: true, // Todos os itens na lista de bookmarks estão salvos
            }));
            setBookmarks(bookmarksWithSaved);
        } catch (error) {
            console.log("Error loading bookmarks:", error.response?.data || error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadBookmarks();
    }, []);

    // Função chamada quando o bookmark é toggled
    const handleToggleSaved = useCallback((mediaId, newSaved) => {
        if (!newSaved) {
            // Remover da lista de bookmarks (otimista)
            setBookmarks(prev => prev.filter(item => item.mediaId !== mediaId));

            // Opcional: recarregar a lista para garantir consistência
            // loadBookmarks();
        } else {
            // Se foi re-adicionado (não deve acontecer na tela de bookmarks)
            // Atualizar o estado local
            setBookmarks(prev =>
                prev.map(item =>
                    item.mediaId === mediaId
                        ? { ...item, saved: true }
                        : item
                )
            );
        }
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1a1a1a" />
            </View>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyText}>Nenhum artigo salvo</Text>
                <Text style={styles.emptySubtext}>
                    Comece a salvar artigos para vê-los aqui
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={bookmarks}
            keyExtractor={(item) => item.mediaId}
            renderItem={({ item }) => (
                <MediaCard
                    article={item}
                    onToggleSaved={handleToggleSaved}
                />
            )}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#1a1a1a"]}
                />
            }
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontFamily: "Lalezar_400Regular",
        color: "#333",
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        fontFamily: "Inter-Regular",
        color: "#666",
        textAlign: "center",
    },
    listContainer: {
        paddingBottom: 20,
    },
});