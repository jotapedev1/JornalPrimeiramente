import {View, Image, Text} from "react-native";
import React from "react";

const NotificationCard = () => {
    return (
    <View style={{backgroundColor: 'white', width: '100%', height: 70, flexDirection: 'row', borderBottomWidth: 0.6,
        borderBottomColor: '#d5d5d5'}}>
        <Image source={require('../../../assets/imgs/profilepic_placeholder.png')} style={{borderRadius: 50, width: 60, height: 60,  left: 14}}/>
        <Text style={{fontFamily: 'Lalezar_400Regular', fontSize: 20, flexDirection: 'row',  width: '100%', height: 100, left: 25}}>
            Perfil curtiu sua obra
            <Text style={{fontFamily: 'Inter', fontSize: 13, width: 15, height: 10, alignItems: 'stretch', flexWrap: 'nowrap'}}>{"\n"}
                Obra X</Text>
        </Text>
    </View>
    )
}

export default NotificationCard;
