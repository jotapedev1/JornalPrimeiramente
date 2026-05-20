import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";
import MediaCard from "../../../shared/components/MediaCard";

import { useArticles } from '../../../context/MediaContext';

const HomeScreen = ({ navigation }) => {

    const {
        loading,
        getAllEditions
    } = useArticles();

    const [currentEdition, setCurrentEdition] =
        useState(null);

    const [editionArticles, setEditionArticles] =
        useState([]);

    const loadHomeData = async () => {

        try {

            const editionsData =
                await getAllEditions();

            if (
                !editionsData ||
                editionsData.length === 0
            ) {

                setCurrentEdition(null);
                setEditionArticles([]);

                return;
            }

            const current =
                [...editionsData]
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt) -
                            new Date(a.createdAt)
                    )[0];

            setCurrentEdition(current);

            setEditionArticles(
                current?.media || []
            );

        } catch (error) {

            console.log(
                "Erro HomeScreen:",
                error
            );
        }
    };

    useEffect(() => {

        loadHomeData();

    }, []);

    if (loading && !currentEdition) {

        return (
            <View style={styles.loadingContainer}>

                <JornalLogo />

                <ActivityIndicator
                    size="large"
                    color="#000"
                    style={{ marginTop: 40 }}
                />

                <Text style={styles.loadingText}>
                    Carregando...
                </Text>

                <BottomBar navigation={navigation} />

            </View>
        );
    }

    return (
        <View style={styles.container}>

            <JornalLogo />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadHomeData}
                    />
                }
            >

                <Text
                    style={[
                        styles.title,
                        { fontFamily: 'Lalezar_400Regular' }
                    ]}
                >
                    {currentEdition?.title || 'Sem edição'}
                </Text>

                <View style={styles.editionInfoContainer}>

                    <Text style={styles.editionNumber}>
                        Edição #{currentEdition?.editionNumber || '--'}
                    </Text>

                    <Text style={styles.publicationDate}>
                        {currentEdition?.publicationDate || ''}
                    </Text>

                </View>

                <View style={styles.coverContainer}>

                    <Image
                        style={styles.coverImage}
                        source={
                            require('../../../assets/imgs/signupimg.jpg')
                        }
                    />

                </View>

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>
                        Artigos desta edição
                    </Text>

                    <Text style={styles.articleCounter}>
                        {editionArticles.length}
                    </Text>

                </View>

                <View style={styles.articlesContainer}>

                    {editionArticles.length > 0 ? (

                        editionArticles.map((item) => (

                            <View
                                key={item.mediaId}
                            >
                                <MediaCard article={item} />
                            </View>
                        ))

                    ) : (

                        <View style={styles.emptyContainer}>

                            <Text style={styles.emptyText}>
                                Nenhum artigo encontrado
                            </Text>

                            <Text style={styles.emptySubText}>
                                Esta edição ainda não possui conteúdos publicados.
                            </Text>

                        </View>
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
        paddingBottom: 100
    },

    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },

    loadingText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 16,
        color: '#666'
    },

    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 15,
        color: '#222'
    },

    editionInfoContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15
    },

    editionNumber: {
        fontSize: 16,
        color: '#444',
        fontWeight: '600'
    },

    publicationDate: {
        fontSize: 13,
        color: '#888',
        marginTop: 4
    },

    coverContainer: {
        width: '92%',
        alignSelf: 'center',
        marginBottom: 20
    },

    coverImage: {
        width: '100%',
        height: 250,
        borderRadius: 18,
        resizeMode: 'cover'
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginBottom: 15
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#222'
    },

    articleCounter: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        color: '#444',
        fontWeight: '600'
    },

    articlesContainer: {
        paddingBottom: 30
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20
    },

    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666'
    },

    emptySubText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20
    }
});

export default HomeScreen;