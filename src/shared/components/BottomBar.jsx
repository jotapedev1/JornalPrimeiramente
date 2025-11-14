import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

const BottomBar = ({ navigation }) => {
    const icons = {
        burger: require('../../assets/icons/burger-icon.png'),
        compass: require('../../assets/icons/compass-icon.png'),
        home: require('../../assets/icons/home-icon.png'),
        bell: require('../../assets/icons/bell-icon.png'),
        profile: require('../../assets/icons/profile-icon.png'),
    };

    const data=[
        {id: 1, name: 'burger', route: 'Menu'},
        {id: 2, name: 'compass', route: 'Browse'},
        {id: 3, name: 'home', route: 'Home'},
        {id: 4, name: 'bell', route: 'Notification'},
        {id: 5, name: 'profile', route: 'Profile'},
    ];

    return (
        <View style={styles.bottomBar}>
            <View style={styles.barItems}>
                {data.map(item=>(
                    <TouchableOpacity key={item.id} style={styles.icon} onPress={()=>navigation.navigate(item.route)}>
                        <Image source={icons[item.name]} style={styles.iconImg}/>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {zIndex: 1000, position: 'absolute',bottom: 0, left: 0, right: 0, borderTopColor: '#d5d5d5', borderTopWidth: 0.6, backgroundColor: 'white', paddingBottom: 80},
    barItems: {zIndex: 1000, width: '100%', height: '8%', display: 'flex',flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', top: 30},
    iconImg: {height: 30, width: 30},
    icon:{width: 30, height: 30, display: 'flex'},
});

export default BottomBar;