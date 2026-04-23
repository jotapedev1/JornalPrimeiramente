import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {useState} from "react";

const BookmarkButton = ({height, width}) => {

    const icons = {
        bookmarkEmpty: require('../../../assets/icons/bookmark-icon-empty.png'),
        bookmarkFilled: require('../../../assets/icons/bookmark-icon-filled.png'),
    };

    const [bookmarkState, setBookmarkState] = useState(icons.bookmarkEmpty);

    function handleBookmarkPress() {
        setBookmarkState(prevState =>
            prevState === icons.bookmarkFilled
                ? icons.bookmarkEmpty
                : icons.bookmarkFilled
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBookmarkPress}
            style={styles.container}
        >
            <Image
                source={bookmarkState}
                style={{height, width}}
            />
        </TouchableOpacity>
    )
}
export default BookmarkButton;

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        fontFamily: 'Lalezar_400Regular'
    },

});
