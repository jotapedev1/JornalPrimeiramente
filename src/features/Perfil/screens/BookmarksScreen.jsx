import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';
import ArticleCard from "../../../shared/components/ArticleCard";
import { useArticles } from "../../../context/ArticleContext";

const BookmarksScreen = ({ navigation }) => {
    const {
        bookmarks, // Pega os artigos salvos do contexto
        loading,
    } = useArticles();

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (!bookmarks || bookmarks.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum artigo salvo ainda</Text>
                <Text style={styles.emptySubText}>
                    Toque no ícone de bookmark nos artigos para salvá-los
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meus Salvos</Text>
                <Text style={styles.headerCount}>{bookmarks.length} artigos</Text>
            </View>

            <View style={styles.articlesContainer}>
                {bookmarks.map((item, index) => (
                    <ArticleCard
                        key={item.id ?? index}
                        article={item}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    headerCount: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    articlesContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    emptySubText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    card: {
        flexDirection: 'row',
        margin: 10,
        height: 160,
        backgroundColor: '#f6f6f6',
        borderRadius: 2,
        padding: 10,
    },
    coverImage: {
        width: 100,
        height: '100%',
        borderRadius: 1,
        resizeMode: 'cover',
    },
    contentContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 13,
        color: '#737373',
        bottom: 32,
    },
    bookmarkContainer: {
        alignItems: 'flex-end',
    },
});

export default BookmarksScreen;