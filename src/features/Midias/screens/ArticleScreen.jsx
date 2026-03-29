// src/features/Midias/screens/ArticleScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import JornalLogo from '../../../shared/components/JornalLogo';
import LikeButton from '../../../shared/components/LikeButton';
import BookmarkButton from '../../Perfil/components/BookmarkButton';
import { useArticles } from '../../../context/ArticleContext';

const ArticleScreen = ({ navigation, route }) => {
    const { articleId } = route.params || {};
    const { isBookmarked, toggleBookmark, articles } = useArticles();

    // Encontra o artigo pelo ID ou pega o primeiro
    const article = articles.find(a => a.id === articleId) || articles[0];

    if (!article) {
        return (
            <View style={styles.container}>
                <Text>Artigo não encontrado</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <JornalLogo />
            <View style={styles.imageContainer}>
                {article?.image && (
                    <Image
                        source={article.image}
                        style={styles.image}
                    />
                )}

                <Text style={[styles.title, { fontFamily: 'Lalezar_400Regular' }]}>
                    {article.title}
                </Text>

                <Text style={styles.author}>Por: {article.author}</Text>

                <Text style={styles.description}>{article.desc}</Text>

                <View style={styles.actionsContainer}>
                    <View style={styles.action}>
                        <LikeButton />
                        <Text style={styles.text}>Likes</Text>
                    </View>

                    <View style={styles.action}>
                        <BookmarkButton
                            isBookmarked={article.id}
                            onPress={() => toggleBookmark(article)}
                            height={24}
                            width={24}
                        />
                        <Text style={styles.text}>Salvar</Text>
                    </View>
                </View>

                <Text style={[styles.comments, { fontFamily: 'Lalezar_400Regular' }]}>
                    Comentários
                </Text>
            </View>
        </View>
    );
};

export default ArticleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
    },
    imageContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 15,
    },
    author: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
    },
    description: {
        fontSize: 14,
        color: '#333',
        padding: 10,
        lineHeight: 20,
    },
    comments: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
    },
    text: {
        fontFamily: 'Lalezar_400Regular',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    action: {
        alignItems: 'center',
    },
});