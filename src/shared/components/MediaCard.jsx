// MediaCard.js
import React, {useContext, useState} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, LogBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BookmarkButton from "../../features/Perfil/components/BookmarkButton";
import {AuthContext} from "../../context/AuthContext";

const MediaCard = ({ article, onToggleSaved }) => {
    const navigation = useNavigation();
    const { api, BASE_URL } = useContext(AuthContext);
    const [imageError, setImageError] = useState(false);

    if (!article) return null;

    const handlePress = () => {
        navigation.navigate("MediaScreen", {
            media: article,
        });
    };

    const handleToggleSaved = (mediaId, newSaved) => {
        onToggleSaved?.(mediaId, newSaved);
    };

    const getImageSource = () => {
        // Prioridade: Capa personalizada > Preview > Placeholder
        if (article.hasCover) {
            // Se tem capa personalizada, usa a URL da capa
            return { uri: `${BASE_URL}/media/${article.mediaId}/cover` };
        }
        // Se tem mediaPreview, usar o preview
        if (article.mediaPreview && typeof article.mediaPreview === 'string') {
            return { uri: `data:image/png;base64,${article.mediaPreview}` };
        }
        if (article.mediaId) {
            return { uri: `${BASE_URL}/media/${article.mediaId}/preview` };
        }
        // Fallback para placeholder
        return require('../../assets/imgs/img_placeholder.png');
    };

    const imageSource = getImageSource();

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
            <View style={styles.shadow}>
                <View style={styles.card}>
                    <Image
                        source={imageSource}
                        style={styles.image}
                        onError={() => {
                            console.log('Erro ao carregar preview');
                            setImageError(true);
                        }}
                        onLoad={() => {
                            console.log('Preview carregado com sucesso:', article.mediaId);
                            setImageError(false);
                        }}
                    />

                    <View style={styles.content}>
                        <Text style={styles.author}>
                            Por: {article.mediaAuthor || "Autor desconhecido"}
                        </Text>

                        <Text style={styles.title} numberOfLines={2}>
                            {article.mediaTitle || "Sem título"}
                        </Text>

                        <Text style={styles.description} numberOfLines={3}>
                            {article.mediaDescription || ""}
                        </Text>

                        <View style={styles.bookmarkContainer}>
                            <BookmarkButton
                                mediaId={article.mediaId}
                                height={25}
                                width={25}
                                saved={article.saved || false}
                                onToggle={handleToggleSaved}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 350,
        backgroundColor: "#fff",
        borderRadius: 16,
        margin: 16,
        overflow: "hidden",
        alignSelf: "center",
    },
    shadow: {
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    image: {
        width: "100%",
        height: 115,
        resizeMode: "cover",
    },
    content: {
        padding: 12,
    },
    author: {
        fontSize: 12,
        color: "#666",
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: "#444",
        marginBottom: 8,
        maxWidth: "90%",
    },
    bookmarkContainer: {
        alignItems: "flex-end",
    },
});

export default MediaCard;