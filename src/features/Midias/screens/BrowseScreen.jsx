import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";
import EditionCard from "../components/EditionCard";
import {useArticles} from "../../../context/ArticleContext";

const BrowseScreen = ({navigation}) => {
    const { getAllEditions } = useArticles();

    // Pega todas as edições
    const editions = getAllEditions();

    return (
        <View style={styles.container}>
            <JornalLogo />

            <Text style={[styles.title, { fontFamily: 'Lalezar_400Regular' }]}>
                Todas as Edições
            </Text>

            <FlatList
                data={editions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EditionCard
                        edition={item}  // ← Passando a edição como prop
                        navigation={navigation}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Nenhuma edição encontrada
                    </Text>
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#999',
        marginTop: 50,
    },
});


export default BrowseScreen;