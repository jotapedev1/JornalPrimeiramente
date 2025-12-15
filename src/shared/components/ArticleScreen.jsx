import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import JornalLogo from "./JornalLogo";

const ArticleScreen = ({ route, navigation }) => {
    const { title, author, image } = route.params;

    return (
        <View style={styles.container}>
            <JornalLogo />

            <Text style={[styles.title, { fontFamily: 'Lalezar_400Regular' }]}>
                {title}
            </Text>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
                <Text style={styles.author}>Por: {author}</Text>
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
        padding: 12,
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
        marginTop: 12,
        fontSize: 14,
        color: '#555',
        paddingLeft: 4,
    },
});
