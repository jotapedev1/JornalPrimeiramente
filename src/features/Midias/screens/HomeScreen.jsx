// src/features/Home/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";
import ArticleCard from "../../../shared/components/ArticleCard";
import { useArticles } from "../../../context/ArticleContext";

const HomeScreen = ({ navigation }) => {
    const {
        getCurrentEdition,
        getArticlesByEdition,
        loading
    } = useArticles();

    const currentEdition = getCurrentEdition();

    const editionArticles = currentEdition ? getArticlesByEdition(currentEdition.id) : [];

    if (loading) {
        return (
            <View style={styles.container}>
                <JornalLogo />
                <Text style={styles.loadingText}>Carregando...</Text>
                <BottomBar navigation={navigation} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <JornalLogo />

            <ScrollView>
                <Text style={[styles.title, { fontFamily: 'Lalezar_400Regular' }]}>
                    {currentEdition?.title || 'Edição Atual'}
                </Text>

                <View style={styles.coverContainer}>
                    <Image
                        style={styles.coverImage}
                        source={currentEdition?.coverImage || require('../../../assets/imgs/signupimg.jpg')}
                    />
                    {currentEdition?.description && (
                        <Text style={styles.editionDescription}>
                            {currentEdition.description}
                        </Text>
                    )}
                </View>

                <Text style={styles.sectionTitle}>Artigos desta edição</Text>

                <View>
                    {editionArticles.length > 0 ? (
                        editionArticles.map((item) => (
                            <View key={item.id}>
                                <ArticleCard article={item} />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>
                            Nenhum artigo encontrado para esta edição
                        </Text>
                    )}
                </View>
            </ScrollView>

            <BottomBar navigation={navigation} />
        </View>
    );
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
        marginTop: 10,
    },
    coverContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    coverImage: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    editionDescription: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 16,
        marginBottom: 15,
        marginTop: 10,
        color: '#333',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#999',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default HomeScreen;