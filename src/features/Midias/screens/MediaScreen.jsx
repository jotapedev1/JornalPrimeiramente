import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions, ScrollView,
} from 'react-native';

import Pdf from 'react-native-pdf';
import JornalLogo from "../../../shared/components/JornalLogo";
import LikeButton from "../../../shared/components/LikeButton";
import BookmarkButton from "../../Perfil/components/BookmarkButton";
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'
    : 'http://localhost:8080';

const MediaScreen = ({ route }) => {

    const { media } = route.params || {};

    if (!media) {

        return (
            <View style={styles.container}>
                <JornalLogo/>
                <Text>PDF não encontrado</Text>
            </View>
        );
    }

    const pdfUrl =
        `${API_URL}/media/${media.mediaId}/view`;

    console.log("PDF URL:", pdfUrl);

    return (
        <View style={styles.container}>
            <JornalLogo/>
            <Text style={styles.title}>
                {media.mediaTitle}
            </Text>
            <Text style={styles.subtitle}>{media.mediaDescription}</Text>
            <Text style={styles.subsubtitle}>Por: {media.mediaAuthor}</Text>

            <ScrollView>
            <Pdf
                source={{
                    uri: pdfUrl,
                    cache: true,
                }}

                style={styles.pdf}

                onLoadComplete={(pages) => {
                    console.log(
                        `PDF carregado com ${pages} páginas`
                    );
                }}

                onError={(error) => {
                    console.log(
                        "PDF ERROR:",
                        error
                    );
                }}

                trustAllCerts={false}
                fitPolicy={0}
            />

                <View style={styles.actionsContainer}>

                <LikeButton
                    height={35}
                    width={35}
                    mediaId={media.mediaId}
                />

                <BookmarkButton
                    height={30}
                    width={30}
                    mediaId={media.mediaId}
                />

                </View>
                <View style={styles.commentsContainer}>
                    <Text style={styles.commentTitle}>Comentários:</Text>

                </View>
            </ScrollView>
        </View>
    );
};

export default MediaScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'Lalezar_400Regular',
    },
    subtitle: {
        fontSize: 13,
        textAlign: 'center',
        color: '#7c7c7c',
    },
    subsubtitle: {
        fontSize: 10,
        textAlign: 'center',
        color: '#7c7c7c',
        marginBottom: 20
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        minHeight: 400,
        minWidth: 200
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: 60,
        boxShadow: '0 -1px 20px rgba(0,0,0,0.5)',
    },
    commentsContainer: {
        backgroundColor: 'white',
        flex: 1,
        minHeight: 300
    },
    commentTitle: {
        textAlign: 'center',
        fontFamily: 'Lalezar_400Regular',
        fontSize: 20,
        top: 30

    }

})