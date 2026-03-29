// src/shared/components/ArticleCard.js
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import BookmarkButton from '../../features/Perfil/components/BookmarkButton';
import { useArticles } from '../../context/ArticleContext';

const ArticleCard = ({ article }) => {
    const navigation = useNavigation();
    const { toggleBookmark } = useArticles();

    const handlePress = () => {
        navigation.navigate('ArticleScreen', { articleId: article.id });
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.shadow}>
                <View style={styles.card}>
                    <Image
                        source={article.image}
                        style={styles.image}
                    />
                    <View style={styles.content}>
                        <Text style={styles.author}>Por: {article.author}</Text>
                        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
                        <Text style={styles.description} numberOfLines={3}>{article.desc}</Text>
                        <View style={styles.bookmarkContainer}>
                            <BookmarkButton
                                isBookmarked={article.id}
                                onPress={() => toggleBookmark(article)}
                                height={25}
                                width={25}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ArticleCard;

const styles = StyleSheet.create({
    card: {
        width: 350,
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 16,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    shadow: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    image: {
        width: '100%',
        height: 115,
    },
    content: {
        padding: 12,
    },
    author: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#444',
        marginBottom: 8,
        maxWidth: '90%'
    },
    bookmarkContainer: {
        alignItems: 'flex-end',
    },
});