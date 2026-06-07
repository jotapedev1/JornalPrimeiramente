import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const BookmarkButton = ({ height, width, mediaId }) => {
    const { api } = useContext(AuthContext);

    const icons = {
        bookmarkEmpty: require('../../../assets/icons/bookmark-icon-empty.png'),
        bookmarkFilled: require('../../../assets/icons/bookmark-icon-filled.png'),
    };

    const [bookmarked, setBookmarked] = useState(false);

    const handleBookmarkPress = async () => {
        setBookmarked(prev => !prev);
        try {
            await api.post(`/save/${mediaId}`);
        } catch (error) {
            setBookmarked(prev => !prev);
            console.log('Erro ao salvar:', error.response?.data || error.message);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBookmarkPress}
            style={styles.container}
        >
            <Image
                source={bookmarked ? icons.bookmarkFilled : icons.bookmarkEmpty}
                style={{ height, width }}
            />
        </TouchableOpacity>
    );
};

export default BookmarkButton;

const styles = StyleSheet.create({
    container: {},
});