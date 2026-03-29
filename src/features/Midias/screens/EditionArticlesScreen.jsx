// src/features/Edition/screens/EditionArticlesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useArticles } from '../../../context/ArticleContext';
import ArticleCard from '../../../shared/components/ArticleCard';
import JornalLogo from "../../../shared/components/JornalLogo";

const EditionArticlesScreen = ({ route, navigation }) => {
    const { editionId, editionTitle } = route.params;
    const { getArticlesByEdition } = useArticles();

    const articles = getArticlesByEdition(editionId);

    return (
        <View style={styles.container}>
            <JornalLogo/>

            <Text style={styles.header}>{editionTitle}</Text>

            {articles.length > 0 ? (
                <FlatList
                    data={articles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <ArticleCard article={item} />
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={true}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Nenhum artigo encontrado para esta edição
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    list: {
        paddingHorizontal: 8,
        paddingBottom: 20,
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default EditionArticlesScreen;