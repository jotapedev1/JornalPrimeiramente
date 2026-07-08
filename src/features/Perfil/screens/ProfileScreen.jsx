import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
    Alert,
} from 'react-native';
import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";
import { AuthContext } from "../../../context/AuthContext";
import MediaCard from "../../../shared/components/MediaCard";
import Ionicons from '@react-native-vector-icons/ionicons'

const ProfileScreen = ({ navigation }) => {
    const { user, token, isAdmin, logout, api } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [slideAnim, setSlideAnim] = useState(new Animated.Value(0));
    const [userPosts, setUserPosts] = useState([]);
    const [likedArticles, setLikedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUserData = async () => {
        try {
            if (isAdmin) {
                // Admin é responsável apenas pelas publicações
                const postsResponse = await api.get(`/user/${user?.userId}/posts`);
                const posts = Array.isArray(postsResponse.data) ? postsResponse.data : [];

                setUserPosts(posts);
                setLikedArticles([]);

                console.log('Posts carregados (admin):', posts.length);

                return;
            }

            const [postsResponse, likesResponse] = await Promise.all([
                api.get(`/user/${user?.userId}/posts`),
                api.get(`/user/${user?.userId}/likes`)
            ]);

            console.log('Posts response status:', postsResponse.status);
            console.log('Posts data:', postsResponse.data);
            console.log('Likes response status:', likesResponse.status);
            console.log('Likes data:', likesResponse.data);

            const posts = Array.isArray(postsResponse.data)? postsResponse.data : [];
            const likes  = Array.isArray(likesResponse.data)? likesResponse.data : [];

            const likedMedia = likes.map(like => ({
                mediaId: like.mediaId || like.id,
                mediaTitle: like.mediaTitle || like.title || "Sem título",
                mediaDescription: like.mediaDescription || like.description || "",
                mediaAuthor: like.mediaAuthor || like.author || "Autor desconhecido",
                mediaFileName: like.mediaFileName || like.fileName || "",
                mediaPreview: like.mediaPreview || like.preview || null,
                createdAt: like.createdAt,
            }));

            setUserPosts(posts);
            setLikedArticles(likedMedia);

            console.log('Posts carregados:', posts.length);
            console.log('Likes carregados:', likedMedia.length);

        } catch (error) {
            // Falha silenciosa — exibe listas vazias
            console.log('Erro ao carregar dados do perfil:', error.response?.data || error.message);
            setUserPosts([]);
            setLikedArticles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const handleToggleSaved = (mediaId, newSaved) => {
        setUserPosts(prev =>
            prev.map(item =>
                item.mediaId === mediaId
                    ? { ...item, saved: newSaved }
                    : item
            )
        );

        setLikedArticles(prev =>
            prev.map(item =>
                item.mediaId === mediaId
                    ? { ...item, saved: newSaved }
                    : item
            )
        );
    };

    const canPublish =
        isAdmin || user?.role === 'PARTICIPANT';

    const handlePublishingButton = () => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start(() => setModalVisible(false));
    }

    const handleOptionPress = (option) => {
        let publishType;
        switch (option) {
            case 'Aviso':
                publishType = 'Aviso';
                break;
            case 'Edição':
                publishType = 'Edicao';
                break;
        }
        closeModal();
        navigation.navigate('Publishing', { publishType });
    }

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        navigation.replace('Login');
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1a1a1a" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <JornalLogo />
            <View style={styles.mainContent}>
                <ScrollView>
                    {/* Seção do Perfil */}
                    <View style={styles.profileDiv}>
                        <Image
                            source={require('../../../assets/imgs/profilepic_placeholder.png')}
                            style={styles.profilePic}
                        />

                        {/* Nome do usuário */}
                        <Text style={styles.profileName}>
                            {user?.userName || user?.nome || 'Usuário'}
                        </Text>

                        {/* Email do usuário */}
                        <Text style={styles.profileEmail}>
                            {user?.email || user?.userEmail || 'Email não informado'}
                        </Text>


                        {/* Bio/Descrição (se tiver) */}
                        <Text style={styles.profileDesc}>
                            {user?.bio || user?.description || 'Sem bio'}
                        </Text>

                        {/* Botão de logout */}
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Sair da conta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Estatísticas do usuário */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{userPosts.length}</Text>
                            <Text style={styles.statLabel}>Publicações</Text>
                        </View>

                        {!isAdmin && (
                            <>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>{likedArticles.length}</Text>
                                    <Text style={styles.statLabel}>Curtidas</Text>
                                </View>
                            </>
                        )}
                    </View>

                    {/* Seção de Artigos Curtidos — não se aplica ao admin */}
                    {!isAdmin && (
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Artigos Curtidos</Text>
                            {likedArticles.length > 0 ? (
                                likedArticles.map((article, index) => (
                                    <MediaCard
                                        key={article.mediaId || index}
                                        article={article}
                                        onToggleSaved={handleToggleSaved}
                                    />
                                ))
                            ) : (
                                <Text style={styles.emptyText}>Nenhum artigo curtido ainda</Text>
                            )}
                        </View>
                    )}

                    {/* Seção de Publicações do Usuário */}
                    {canPublish && (
                        <View style={styles.sectionContainer}>

                            <Text style={styles.sectionTitle}>
                                Minhas Publicações
                            </Text>

                            {userPosts.length > 0 ? (
                                userPosts.map((post, index) => (
                                    <MediaCard
                                        key={post.mediaId || post.id || index}
                                        article={post}
                                        onToggleSaved={handleToggleSaved}
                                    />
                                ))
                            ) : (
                                <Text style={styles.emptyText}>
                                    Nenhuma publicação ainda
                                </Text>
                            )}

                        </View>
                    )}

                    {/* Botão de publicação - SÓ APARECE SE FOR ADMIN */}
                    {isAdmin && (
                        <View style={{ paddingBottom: 200 }}>
                            <TouchableOpacity
                                onPress={handlePublishingButton}
                                style={styles.publishButton}
                            >
                                <Image
                                    source={require('../../../assets/icons/plus-icon.png')}
                                    style={styles.publishIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>

            {/* Modal de publicação - SÓ APARECE SE FOR ADMIN */}
            {isAdmin && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="none"
                    onRequestClose={closeModal}
                >
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <Animated.View
                                    style={[
                                        styles.modalContent,
                                        {
                                            transform: [{
                                                translateY: slideAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [500, 0]
                                                })
                                            }]
                                        }
                                    ]}
                                >
                                    <View style={styles.modalHeader}>
                                        <View style={styles.modalIndicator} />
                                        <Text style={styles.modalTitle}>Adicionar</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.optionButton}
                                        onPress={() => handleOptionPress('Aviso')}
                                    >
                                        <View style={[styles.optionIcon, { backgroundColor: '#FF9800' }]}>
                                            <Ionicons name="megaphone" color="#000" size={24} />
                                        </View>
                                        <Text style={styles.optionText}>Aviso</Text>
                                        <Text style={styles.optionArrow}>→</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.optionButton}
                                        onPress={() => handleOptionPress('Edição')}
                                    >
                                        <View style={[styles.optionIcon, { backgroundColor: '#2196F3' }]}>
                                            <Ionicons name="newspaper" color="#000" size={24} />
                                        </View>
                                        <Text style={styles.optionText}>Edição</Text>
                                        <Text style={styles.optionArrow}>→</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}

            <BottomBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 10,
        fontFamily: 'Lalezar_400Regular',
    },
    mainContent: {
        zIndex: 300,
        marginTop: 20,
        marginBottom: 140,
    },
    profileDiv: {
        backgroundColor: 'white',
        width: '100%',
        minHeight: 280,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 0.6,
        borderBottomColor: '#d5d5d5',
        paddingBottom: 20,
    },
    profilePic: {
        borderRadius: 75,
        width: 150,
        height: 150,
        marginTop: 20,
    },
    profileName: {
        fontFamily: 'Lalezar_400Regular',
        fontSize: 28,
        marginTop: 10,
        color: '#333',
    },
    profileEmail: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    roleBadge: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 10,
    },
    adminBadge: {
        backgroundColor: '#FF9800',
    },
    roleText: {
        color: '#fff',
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        fontWeight: 'bold',
    },
    profileDesc: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        paddingHorizontal: 30,
        textAlign: 'center',
        marginTop: 10,
        color: '#666',
    },
    logoutButton: {
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    logoutButtonText: {
        color: '#FF5722',
        fontFamily: 'Inter-Regular',
        fontSize: 14,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderBottomWidth: 0.6,
        borderBottomColor: '#e0e0e0',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 22,
        fontFamily: 'Lalezar_400Regular',
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#666',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e0e0e0',
    },
    sectionContainer: {
        padding: 15,
        borderBottomWidth: 0.6,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Lalezar_400Regular',
        color: '#333',
        marginBottom: 10,
    },
    articleCard: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    articleTitle: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#333',
    },
    articleDate: {
        fontSize: 10,
        fontFamily: 'Inter-Regular',
        color: '#999',
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        paddingVertical: 20,
    },
    publishButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#d90000',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    publishIcon: {
        height: 20,
        width: 20,
        tintColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 30,
        maxHeight: '80%'
    },
    modalHeader: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    modalIndicator: {
        width: 40,
        height: 4,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        marginBottom: 10
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Lalezar_400Regular',
        color: '#333'
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    optionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    optionIconText: {
        fontSize: 24
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#333'
    },
    optionArrow: {
        fontSize: 20,
        color: '#ccc'
    },
    cancelButton: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        alignItems: 'center'
    },
    cancelButtonText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#666'
    }
});

export default ProfileScreen;