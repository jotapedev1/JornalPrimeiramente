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
        fontSize: 28,
        fontWeight: '900',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Lalezar-Regular',
    },
    topContainer: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignContent: 'center',
        width: '110%',
        height: '8.5%',
        backgroundColor: '#e30000',
    },
});

export default JornalLogo;