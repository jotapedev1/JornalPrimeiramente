import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import JornalLogo from "../../../shared/components/JornalLogo";

import MediaCard from '../../../shared/components/MediaCard';

const EditionMediaScreen = ({ route }) => {

    const {edition, media} = route.params;

    const articles = media || [];

    return (
        <View style={styles.container}>

            <JornalLogo />

            <Text style={styles.header}>
                {edition?.title || 'Edição'}
            </Text>

            <Text style={styles.subHeader}>
                Edição #{edition?.editionNumber}
            </Text>

            {articles.length > 0 ? (

                <FlatList
                    data={articles}
                    keyExtractor={(item) =>
                        item.mediaId.toString()
                    }
                    renderItem={({ item }) => (

                        <View style={styles.cardContainer}>

                            <MediaCard
                                article={item}
                            />

                        </View>
                    )}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
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
        paddingTop: 16,
        color: '#222',
    },

    subHeader: {
        fontSize: 14,
        textAlign: 'center',
        color: '#777',
        marginBottom: 10,
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
        paddingHorizontal: 20,
    },

    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },

});

export default EditionMediaScreen;