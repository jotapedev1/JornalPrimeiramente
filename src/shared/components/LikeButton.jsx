import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useState} from "react";

const LikeButton = ({}) => {

    const icons = {
        heartFilled: require('../../assets/icons/heartFilled.png'),
        heartEmpty: require('../../assets/icons/heartEmpty.png'),
    };

    const [likeState, setLikeState] = useState(icons.heartEmpty);

    function handlePress() {
        setLikeState(prevState=>
            prevState !== icons.heartFilled ? icons.heartFilled : icons.heartEmpty
        );
    }

    return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={(handlePress)}
                style={styles.container}
            >
                <Image
                    source={likeState}
                    style={styles.icon}
                />
            </TouchableOpacity>
        )
    }
export default LikeButton;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center"
    },
    icon: {
        height: 30,
        width: 30,
    },
});
