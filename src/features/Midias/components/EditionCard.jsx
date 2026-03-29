// src/shared/components/EditionCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const EditionCard = ({ edition, navigation }) => {
    const nav = navigation || useNavigation();

    if (!edition) {
        return (
            <View style={styles.card}>
                <Text style={styles.errorText}>Edição não disponível</Text>
            </View>
        );
    }

    const handlePress = () => {
        nav.navigate('EditionArticles', {
            editionId: edition.id,
            editionTitle: edition.title
        });
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.card}>
                <Image
                    source={edition.coverImage}
                    style={styles.coverImage}
                    defaultSource={require('../../../../../JornalPrimeiramente/src/assets/imgs/img_placeholder.png')}
                />
                <View style={styles.overlay}>
                    <Text style={styles.period}>{edition.period}</Text>
                    <Text style={styles.title}>{edition.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {edition.description}
                    </Text>
                    <Text style={styles.articlesCount}>
                        {edition.articlesCount || 'Vários'} artigos
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        backgroundColor: '#fff',
        height: 200,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 16,
    },
    period: {
        color: '#FFD700',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        color: '#ddd',
        fontSize: 12,
        marginBottom: 4,
    },
    articlesCount: {
        color: '#aaa',
        fontSize: 10,
        marginTop: 4,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        padding: 20,
    },
});

export default EditionCard;