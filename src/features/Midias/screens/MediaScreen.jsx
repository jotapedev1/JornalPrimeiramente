// MediaScreen.js
import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import Pdf from 'react-native-pdf';
import JornalLogo from "../../../shared/components/JornalLogo";
import LikeButton from "../../../shared/components/LikeButton";
import BookmarkButton from "../../Perfil/components/BookmarkButton";
import { Platform } from 'react-native';
import { AuthContext } from "../../../context/AuthContext";
import InputButton from "../../Auth/components/InputButton";
import SendButton from "../../Auth/components/SendButton";
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'
    : 'http://localhost:8080';

const MediaScreen = ({ route }) => {
    const { media } = route.params || {};
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { api, token, isAdmin } = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [sendingComment, setSendingComment] = useState(false);

    // Estados para o Modal de deleção
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [deletingComment, setDeletingComment] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            setCommentsLoading(true);
            const response = await api.get(`/comments/${media.mediaId}`);
            setComments(response.data);
        } catch (error) {
            console.log("Erro ao buscar comentários:", error);
        } finally {
            setCommentsLoading(false);
        }
    };

    const handleSendComment = async () => {
        if (!commentText.trim()) return;

        try {
            setSendingComment(true);
            const response = await api.post(
                `/comments/${media.mediaId}`,
                { content: commentText }
            );
            setComments((prev) => [response.data, ...prev]);
            setCommentText("");
        } catch (error) {
            console.log("Erro ao enviar comentário:", error);
            Alert.alert('Erro', 'Não foi possível enviar o comentário');
        } finally {
            setSendingComment(false);
        }
    };

    // Função para abrir o modal de confirmação de deleção
    const handleDeletePress = (comment) => {
        setCommentToDelete(comment);
        setDeleteModalVisible(true);
    };

    // Função para deletar o comentário
    const handleConfirmDelete = async () => {
        if (!commentToDelete) return;

        try {
            setDeletingComment(true);
            await api.delete(`/comments/${media.mediaId}/comment/${commentToDelete.id}`);

            // Remover o comentário da lista
            setComments(prev => prev.filter(c => c.id !== commentToDelete.id));

            Alert.alert('Sucesso', 'Comentário deletado permanentemente');
        } catch (error) {
            console.log("Erro ao deletar comentário:", error);
            Alert.alert('Erro', 'Não foi possível deletar o comentário');
        } finally {
            setDeletingComment(false);
            setDeleteModalVisible(false);
            setCommentToDelete(null);
        }
    };

    // Função para cancelar a deleção
    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
        setCommentToDelete(null);
    };

    if (!media) {
        return (
            <View style={styles.container}>
                <JornalLogo/>
                <Text style={styles.errorText}>Mídia não encontrada</Text>
            </View>
        );
    }

    const pdfUrl = `${API_URL}/media/${media.mediaId}/view`;

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

    const hasPdf = !!media.mediaId;

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

                    <View style={styles.commentInput}>
                        <InputButton
                            placeholder="Comente algo na postagem"
                            style={styles.commentDimensions}
                            value={commentText}
                            onChangeText={setCommentText}
                        />
                    </View>

                    <View style={{ paddingBottom: 20 }}>
                        <SendButton
                            label={sendingComment ? "Enviando..." : "Comentar"}
                            onPress={handleSendComment}
                            disabled={sendingComment}
                        />
                    </View>
                </View>

                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#e8e8e8",
                    }}
                />

                {commentsLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#1a1a1a"
                        style={{ marginTop: 20 }}
                    />
                ) : comments.length > 0 ? (
                    <View style={styles.commsListContainer}>
                        {comments.map((comment) => (
                            <View
                                key={comment.id}
                                style={styles.commentCard}
                            >
                                <View style={styles.commentRow}>
                                    <View style={styles.commentContentContainer}>
                                        <Text style={styles.commentAuthor}>
                                            {comment.userName}
                                        </Text>
                                        <Text style={styles.commentContent}>
                                            {comment.content}
                                        </Text>
                                    </View>

                                    {/* Botão de deletar - aparece apenas para ADMIN */}
                                    {isAdmin && (
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => handleDeletePress(comment)}
                                        >
                                            <Text style={styles.deleteText}>Deletar️</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                ) : null}
            </ScrollView>

            {/* Modal de Confirmação de Deleção */}
            <Modal
                transparent={true}
                visible={deleteModalVisible}
                animationType="fade"
                onRequestClose={handleCancelDelete}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Ionicons name="warning" color="#000" style={styles.modalIcon}/>
                            <Text style={styles.modalTitle}>Confirmar Deleção</Text>
                        </View>

                        <Text style={styles.modalMessage}>
                            Tem certeza que deseja deletar este comentário?
                        </Text>

                        <View style={styles.modalWarningContainer}>
                            <Text style={styles.modalWarningText}>
                                Esta ação é permanente e não pode ser desfeita.
                            </Text>
                        </View>

                        {!!commentToDelete && (
                            <View style={styles.modalCommentPreview}>
                                <Text style={styles.modalCommentPreviewLabel}>
                                    Comentário:
                                </Text>
                                <Text style={styles.modalCommentPreviewText}>
                                    "{commentToDelete.content}"
                                </Text>
                                <Text style={styles.modalCommentPreviewAuthor}>
                                    Por: {commentToDelete.userName}
                                </Text>
                            </View>
                        )}

                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalCancelButton]}
                                onPress={handleCancelDelete}
                                disabled={deletingComment}
                            >
                                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalDeleteButton]}
                                onPress={handleConfirmDelete}
                                disabled={deletingComment}
                            >
                                {deletingComment ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.modalDeleteButtonText}>Deletar</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default MediaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
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
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
        fontFamily: 'Inter-Regular',
    },
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
    },
    errorSubtext: {
        color: '#666',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
        fontFamily: 'Inter-Regular',
    },
    noPdfContainer: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        margin: 20,
        borderRadius: 12,
    },
    noPdfIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    noPdfText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        color: '#333',
        marginBottom: 8,
    },
    noPdfSubtext: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        color: '#666',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: '#fff',
    },
    commentsContainer: {
        backgroundColor: 'white',
        flex: 1,
        minHeight: 150,
        paddingHorizontal: 10,
    },
    commentTitle: {
        textAlign: 'center',
        fontFamily: 'Lalezar_400Regular',
        fontSize: 20,
        marginTop: 30,
    },
    commentInput: {
        marginTop: 20,
    },
    commentDimensions: {
        borderColor: '#e6e6e6',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#e6e6e6',
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        flexShrink: 1,
        width: '95%',
        flexDirection: 'row',
    },
    commsListContainer: {
        minHeight: 200,
        flex: 1,
        paddingHorizontal: 10,
    },
    commentCard: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e8e8e8",
    },
    commentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentContentContainer: {
        flex: 1,
        marginRight: 10,
    },
    commentAuthor: {
        fontFamily: "Lalezar_400Regular",
        fontSize: 16,
        marginBottom: 2,
    },
    commentContent: {
        color: "#555",
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    deleteButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#ffeeee',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 40,
    },
    deleteText: {
        fontSize: 15,
        color: '#910000',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalIcon: {
        fontSize: 28,
        marginRight: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Lalezar_400Regular',
        color: '#333',
        marginTop: 4,
    },
    modalMessage: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#333',
        marginBottom: 12,
    },
    modalWarningContainer: {
        backgroundColor: '#fff3e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        borderLeftColor: '#ff9800',
    },
    modalWarningText: {
        fontSize: 13,
        fontFamily: 'Inter-Regular',
        color: '#e65100',
        fontWeight: 800
    },
    modalCommentPreview: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
    modalCommentPreviewLabel: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#666',
        marginBottom: 4,
    },
    modalCommentPreviewText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#333',
        fontStyle: 'italic',
        marginBottom: 4,
    },
    modalCommentPreviewAuthor: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#666',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCancelButton: {
        backgroundColor: '#f5f5f5',
    },
    modalCancelButtonText: {
        color: '#666',
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    modalDeleteButton: {
        backgroundColor: '#d32f2f',
    },
    modalDeleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        fontWeight: 'bold',
    },
});