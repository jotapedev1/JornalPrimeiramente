import React, {useContext, useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions, ScrollView, ActivityIndicator,
} from 'react-native';

import Pdf from 'react-native-pdf';
import JornalLogo from "../../../shared/components/JornalLogo";
import LikeButton from "../../../shared/components/LikeButton";
import BookmarkButton from "../../Perfil/components/BookmarkButton";
import { Platform } from 'react-native';
import {AuthContext} from "../../../context/AuthContext";

const API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'
    : 'http://localhost:8080';

const MediaScreen = ({ route }) => {
    const { media } = route.params || {};
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    if (!media) {
        return (
            <View style={styles.container}>
                <JornalLogo/>
                <Text style={styles.errorText}>Mídia não encontrada</Text>
            </View>
        );
    }

    const pdfUrl =
        `${API_URL}/media/${media.mediaId}/view`;

    console.log('PDF URL:', pdfUrl);
    console.log('Media ID:', media.mediaId);
    console.log('Media Title:', media.mediaTitle);

    const title = media.mediaTitle;
    const description = media.mediaDescription;
    const author = media.mediaAuthor;

    const handlePdfError = (error) => {
        console.log("❌ PDF ERROR:", error);
        setError('Não foi possível carregar o PDF');
        setLoading(false);
    };

    const handlePdfLoadComplete = (pages) => {
        console.log(`✅ PDF carregado com ${pages} páginas`);
        setLoading(false);
        setError(null);
    };

    const hasPdf = !!media.mediaFileName;

    return (
        <View style={styles.container}>
            <JornalLogo/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{description}</Text>
            <Text style={styles.subsubtitle}>Por: {author}</Text>

            <ScrollView style={styles.scrollView}>
                {!hasPdf ? (
                    <View style={styles.noPdfContainer}>
                        <Text style={styles.noPdfIcon}>📄</Text>
                        <Text style={styles.noPdfText}>
                            Este artigo não possui um arquivo PDF disponível.
                        </Text>
                        <Text style={styles.noPdfSubtext}>
                            Apenas o título e descrição estão disponíveis.
                        </Text>
                    </View>
                ) : (

                    <>
                        <Pdf
                            source={{
                                uri: pdfUrl,
                                cache: true,
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: 'application/pdf',
                                },
                            }}
                            style={styles.pdf}
                            onLoadComplete={handlePdfLoadComplete}
                            onError={handlePdfError}
                            trustAllCerts={false}
                            fitPolicy={0}
                            activityIndicatorColor="#1a1a1a"
                        />
                        {loading && (
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator size="large" color="#1a1a1a" />
                                <Text style={styles.loadingText}>Carregando PDF...</Text>
                            </View>
                        )}
                        {error && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                                <Text style={styles.errorSubtext}>
                                    O arquivo pode estar indisponível ou corrompido.
                                </Text>
                            </View>
                        )}
                    </>
                )}

                <View style={styles.actionsContainer}>
                    <LikeButton height={35} width={35} mediaId={media.mediaId} />
                    <BookmarkButton height={30} width={30} mediaId={media.mediaId} />
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