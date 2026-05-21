import React, { useEffect } from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";
import EditionCard from "../components/EditionCard";

import { useMedia } from "../../../context/MediaContext";

const BrowseScreen = ({ navigation }) => {

    const {
        editions,
        loading,
        getAllEditions
    } = useMedia();

    useEffect(() => {

        loadEditions();

    }, []);

    const loadEditions = async () => {

        await getAllEditions();
    };

    if (loading && editions.length === 0) {

        return (
            <View style={styles.loadingContainer}>

                <JornalLogo />

                <ActivityIndicator
                    size="large"
                    color="#000"
                    style={{ marginTop: 40 }}
                />

                <Text style={styles.loadingText}>
                    Carregando edições...
                </Text>

                <BottomBar navigation={navigation} />

            </View>
        );
    }

    return (
        <View style={styles.container}>

            <JornalLogo />

            <Text
                style={[
                    styles.title,
                    { fontFamily: 'Lalezar_400Regular' }
                ]}
            >
                Todas as Edições
            </Text>

            <FlatList
                data={editions}
                keyExtractor={(item) => item.editionId}
                renderItem={({ item }) => (

                    <EditionCard
                        edition={item}
                        navigation={navigation}
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadEditions}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    editions.length === 0
                        ? styles.emptyListContent
                        : styles.listContent
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>

                        <Text style={styles.emptyIcon}>
                            📰
                        </Text>

                        <Text style={styles.emptyText}>
                            Nenhuma edição encontrada
                        </Text>

                        <Text style={styles.emptySubText}>
                            Ainda não existem edições publicadas.
                        </Text>

                    </View>
                }
            />

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
        marginBottom: 20,
        color: '#222'
    },

    listContent: {
        paddingBottom: 30
    },

    emptyListContent: {
        flexGrow: 1,
        justifyContent: 'center'
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 80
    },

    emptyIcon: {
        fontSize: 54,
        marginBottom: 15
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

export default BrowseScreen;