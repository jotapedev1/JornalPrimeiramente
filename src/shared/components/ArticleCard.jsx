import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function ArticleCard({ image, author, title, onPress }) {
    const navigation = useNavigation();
        return (
            <TouchableOpacity style={styles.card}
                              onPress={() => navigation.navigate('ArticleScreen')}
                              activeOpacity={0.8}>
                <Image source={{ uri: image }} style={styles.image} />

                <View style={styles.content}>
                    <Text style={styles.author}>Por: {author} </Text>
                    <Text style={styles.title} numberOfLines={2}>{title} </Text>
                </View>
            </TouchableOpacity>
        );
}
const styles = StyleSheet.create({
    card: {
        width: 165,
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 16,
        overflow: 'hidden',

        // sombra (Android)
        elevation: 4,

        // sombra (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
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
    },
});
