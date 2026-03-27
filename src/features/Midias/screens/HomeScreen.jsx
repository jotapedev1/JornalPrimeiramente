import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, } from 'react-native';
import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";
import ArticleCard from "../../../shared/components/ArticleCard";
import {articleData} from "../../../context/ArticleContext";
const HomeScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <JornalLogo/>
            <Text style={[styles.title,{width: '100%', fontFamily: 'Lalezar_400Regular'}]}>Edição 2026 - 1º Bimestre</Text>

            <View style={{width: '90%', height: 250, alignSelf: 'center'}}>
                <Image style={{width: '100%', height: '80%', borderRadius: 15, alignSelf: 'center', padding: 10}} source={require('../../../assets/imgs/signupimg.jpg')}/>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15 }}>
                {articleData.map((item, index) => (
                    <ArticleCard
                        key={item.id ?? index} // passing title as a "id" obrigatory
                        article={item}
                    />
                ))}
            </View>

            <BottomBar navigation={navigation}/>

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
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        padding: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        fontSize: 100,
    },
});

export default HomeScreen;