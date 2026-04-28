import React, {useState} from 'react';
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
    View
} from 'react-native';
import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";

const ProfileScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [slideAnim, setSlideAnim] = useState(new Animated.Value(0));

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
        }).start(()=>setModalVisible(false));
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


    return (

        <View style={styles.container}>
            <JornalLogo/>
            <View style={styles.mainContent}>
                <ScrollView>
                    <View style={styles.profileDiv}>
                        <Image source={require('../../../assets/imgs/profilepic_placeholder.png')} style={styles.profilePic}></Image>
                        <Text style={styles.profileTitle}>Perfil</Text>
                        <Text style={styles.profileDesc}>Sou um perfil de teste, feito para testar. Testando... 1, 2, 3...</Text>
                    </View>
                    <View style={styles.profileDiv}>
                        <Text style={styles.title}>Artigos Curtidos</Text>

                    </View>
                    <View style={{paddingBottom: 200}}>
                        <TouchableOpacity onPress={handlePublishingButton} style={{borderRadius: 25, width: 50, height: 50, alignSelf: 'center', backgroundColor: 'red', marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../../assets/icons/plus-icon.png')}
                                   style={{height: 20, width: 20}}/>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

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
                                    <View style={[styles.optionIcon, {backgroundColor: '#FF9800'}]}>
                                        <Text style={styles.optionIconText}>📢</Text>
                                    </View>
                                    <Text style={styles.optionText}>Aviso</Text>
                                    <Text style={styles.optionArrow}>→</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.optionButton}
                                    onPress={() => handleOptionPress('Edição')}
                                >
                                    <View style={[styles.optionIcon, {backgroundColor: '#2196F3'}]}>
                                        <Text style={styles.optionIconText}>📰</Text>
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


            <BottomBar navigation={navigation}/>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        fontSize: 100,
    },
    mainContent: {
        zIndex: 300,
        marginTop: 20
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    profileDiv:{
        backgroundColor: 'white',
        width: '100%', height: 280,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 0.6,
        borderBottomColor: '#d5d5d5'
    },
    profilePic: {
        borderRadius: '100%',
        width: 150, height: 150,
        alignSelf: 'center'
    },
    profileTitle: {
        fontFamily: 'Lalezar_400Regular',
        fontSize: 30, marginTop: 10
    },
    profileDesc: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        paddingHorizontal: 50,
        alignSelf: 'center',
        textAlign: 'center'
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