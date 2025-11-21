import {Text, View, StyleSheet} from "react-native";
import React from "react";

const JornalLogo = ({ navigation }) => {
    return (
        <View style={styles.topContainer}>
            <Text style={styles.titleJornal}>JORNAL PRIMEIRAMENTE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleJornal: {
        fontSize: 30,
        top: 3,
        fontWeight: '900',
        color: 'white',
        fontFamily: 'Lalezar-Regular',
        alignSelf: 'center'
    },
    topContainer: {
        position: 'relative',
        //top: 60,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '8.5%',
        backgroundColor: '#e30000',
        zIndex: 1500,
    },
});

export default JornalLogo;