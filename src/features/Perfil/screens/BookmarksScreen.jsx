import React from 'react';
import {
    View,
    StyleSheet, ScrollView,
} from 'react-native';
import ArticleCard from "../../../shared/components/ArticleCard";
import {articleData} from "../../../context/ArticleContext";

const BookmarksScreen = ({navigation, article}) => {

    return (
        <ScrollView style={styles.container}>
            <View style={{width: '100%', height: 15, backgroundColor: 'red'}}/>
            {articleData.map((item, index) => (
                <ArticleCard
                    key={item.id ?? index} // passing title as a "id" obrigatory
                    article={item}
                />
            ))}
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        flexDirection: 'row',
        margin: 10,
        height: 160,
        backgroundColor: '#f6f6f6',
        borderRadius: 2,
        padding: 10,
    },
    coverImage: {
        width: 100,
        height: '100%',
        borderRadius: 1,
        resizeMode: 'cover',
    },
    contentContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 13,
        color: '#737373',
        bottom: 32,
    },
    bookmarkContainer: {
        alignItems: 'flex-end',
    },
});

export default BookmarksScreen;