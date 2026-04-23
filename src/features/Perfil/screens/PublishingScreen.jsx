import React, {useState} from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {keepLocalCopy, pick} from '@react-native-documents/picker';
import JornalLogo from "../../../shared/components/JornalLogo";
import BottomBar from "../../../shared/components/BottomBar";

const PublishScreen = ({ navigation, route }) => {
    const { publishType } = route.params; // 'Aviso' ou 'Edicao'

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Campos específicos para Aviso
    const [priority, setPriority] = useState('normal');
    const [expiryDate, setExpiryDate] = useState('');

    // Campos específicos para Edição (agora com artigos)
    const [editionNumber, setEditionNumber] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [isSpecialEdition, setIsSpecialEdition] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileName, setPdfFileName] = useState('');
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);

    // Lista de artigos da edição
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState({
        title: '',
        content: '',
        author: '',
        category: '',
        tags: '',
        featuredImage: null
    });
    const [editingArticleId, setEditingArticleId] = useState(null);
    const [isArticleFormExpanded, setIsArticleFormExpanded] = useState(false); // Novo estado para controlar expansão

    const formatDataWithBars = (text) => {
        let cleaned = text.replace(/\D/g, '');
        if(cleaned.length > 8){
            cleaned = cleaned.slice(0,8);
        }

        let formatted = '';

        if(cleaned.length > 0){
            formatted += cleaned.slice(0, 2);
        }
        if(cleaned.length >= 3 ){
            formatted += "/" + cleaned.slice(2, 4);
        }
        if(cleaned.length >= 5){
            formatted += "/" + cleaned.slice(4, 8);
        }
        return formatted;
    }

    const formatFileSize = (bytes) => {
        if (!bytes) return 'Tamanho desconhecido';

        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = (bytes / Math.pow(1024, i)).toFixed(2);

        return `${size} ${sizes[i]}`;
    };

    const removePdf = () => {
        setPdfFile(null);
        setPdfFileName('');
    };

    const pickPdf = async () => {
        try {
            setIsLoadingPdf(true);

            const [selectedFile] = await pick({
                type: ['com.adobe.pdf'],
                allowMultiSelection: false,
            });

            if (selectedFile.size && selectedFile.size > 15 * 1024 * 1024) {
                Alert.alert(
                    'Arquivo muito grande',
                    'O PDF selecionado excede o limite de 15MB.'
                );
                return;
            }

            const [localCopy] = await keepLocalCopy({
                files: [
                    {
                        uri: selectedFile.uri,
                        fileName: selectedFile.name ?? `documento_${Date.now()}.pdf`,
                    },
                ],
                destination: 'cachesDirectory',
            });

            if (!localCopy?.localUri) {
                Alert.alert('Erro', 'Não foi possível copiar o arquivo selecionado.');
                return;
            }

            setPdfFile({
                uri: localCopy.localUri,
                originalUri: selectedFile.uri,
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type,
            });
            setPdfFileName(selectedFile.name);

        } catch (err) {
            if (err?.code === 'CANCELED' ||
                err?.message?.includes('cancel') ||
                err?.code === 'USER_CANCELED' ||
                err?.message?.includes('User cancelled')) {

                console.log('Usuário cancelou a seleção do PDF');
                return;
            }

            if (err?.message?.includes('No files selected')) {
                console.log('Nenhum arquivo selecionado');
                return;
            }

            console.error('Erro ao selecionar PDF:', err);
            Alert.alert(
                'Erro',
                'Ocorreu um erro ao selecionar o arquivo. Tente novamente.'
            );
        } finally {
            setIsLoadingPdf(false);
        }
    };

    // Função para validar todos os campos do artigo
    const validateArticle = () => {
        const errors = [];

        if (!currentArticle.title.trim()) {
            errors.push('Título do artigo');
        }
        if (!currentArticle.content.trim()) {
            errors.push('Conteúdo do artigo');
        }
        if (!currentArticle.author.trim()) {
            errors.push('Autor do artigo');
        }

        if (errors.length > 0) {
            const errorMessage = `Os seguintes campos são obrigatórios:\n${errors.map(e => `• ${e}`).join('\n')}`;
            Alert.alert('Campos Obrigatórios', errorMessage);
            return false;
        }

        return true;
    };

    // Função para resetar o formulário de artigo
    const resetArticleForm = () => {
        setCurrentArticle({
            title: '',
            content: '',
            author: '',
            category: '',
            tags: '',
            featuredImage: null
        });
        setEditingArticleId(null);
    };

    // Função para adicionar ou atualizar artigo
    const saveArticle = () => {
        if (!validateArticle()) {
            return;
        }

        const articleData = {
            ...currentArticle,
            tags: currentArticle.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
            updatedAt: new Date().toISOString()
        };

        if (editingArticleId) {
            // Atualizar artigo existente
            setArticles(articles.map(article =>
                article.id === editingArticleId
                    ? { ...articleData, id: editingArticleId, createdAt: article.createdAt }
                    : article
            ));
            Alert.alert('Sucesso', 'Artigo atualizado com sucesso!');
        } else {
            // Adicionar novo artigo
            const newArticle = {
                id: Date.now(),
                ...articleData,
                createdAt: new Date().toISOString()
            };
            setArticles([...articles, newArticle]);
            Alert.alert('Sucesso', 'Artigo adicionado à edição!');
        }

        resetArticleForm();
        removePdf();
        setIsArticleFormExpanded(false); // Fecha o formulário após salvar
    };

    const removeArticle = (articleId) => {
        Alert.alert(
            'Remover Artigo',
            'Tem certeza que deseja remover este artigo da edição?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: () => {
                        setArticles(articles.filter(article => article.id !== articleId));
                        Alert.alert('Removido', 'Artigo removido da edição');
                    }
                }
            ]
        );
    };

    const editArticle = (article) => {
        setCurrentArticle({
            title: article.title,
            content: article.content,
            author: article.author,
            category: article.category || '',
            tags: article.tags.join(', '),
            featuredImage: article.featuredImage
        });
        setEditingArticleId(article.id);
        setIsArticleFormExpanded(true); // Expande o formulário ao editar
    };

    const cancelEdit = () => {
        resetArticleForm();
        setIsArticleFormExpanded(false); // Fecha o formulário ao cancelar
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            Alert.alert('Erro', 'O título da edição é obrigatório');
            return;
        }

        if (publishType === 'Aviso') {
            if (!expiryDate) {
                Alert.alert('Erro', 'A data de expiração é obrigatória');
                return;
            }
            submitAviso();
        } else if (publishType === 'Edicao') {
            if (!editionNumber) {
                Alert.alert('Erro', 'O número da edição é obrigatório');
                return;
            }

            if (articles.length === 0) {
                Alert.alert('Erro', 'A edição deve conter pelo menos um artigo');
                return;
            }

            submitEdicao();
        }
    };

    const submitAviso = () => {
        const avisoData = {
            type: 'aviso',
            title,
            content,
            priority,
            expiryDate,
            createdAt: new Date().toISOString()
        };
        console.log('Enviando Aviso:', avisoData);
        Alert.alert('Sucesso', 'Aviso publicado com sucesso!');
        navigation.goBack();
    };

    const submitEdicao = () => {
        const edicaoData = {
            type: 'edicao',
            title,
            content,
            editionNumber,
            publicationDate,
            isSpecialEdition,
            pdfFile,
            articles: articles,
            createdAt: new Date().toISOString()
        };
        console.log('Enviando Edição com artigos:', edicaoData);
        Alert.alert('Sucesso', `Edição publicada com ${articles.length} artigo(s)!`);
        navigation.goBack();
    };

    const getTitle = () => {
        switch(publishType) {
            case 'Aviso': return 'Publicar Aviso';
            case 'Edicao': return 'Publicar Edição';
            default: return 'Publicar';
        }
    };

    const renderArticlesList = () => {
        if (articles.length === 0) {
            return (
                <View style={styles.emptyArticlesContainer}>
                    <Text style={styles.emptyArticlesIcon}>📝</Text>
                    <Text style={styles.emptyArticlesText}>
                        Nenhum artigo adicionado ainda
                    </Text>
                    <Text style={styles.emptyArticlesSubtext}>
                        Clique em "Adicionar Novo Artigo" para começar
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.articlesListContainer}>
                <View style={styles.articlesListHeader}>
                    <Text style={styles.sectionTitle}>
                        Artigos da Edição
                    </Text>
                    <Text style={styles.articlesCount}>{articles.length} artigo(s)</Text>
                </View>
                {articles.map((article, index) => (
                    <View key={article.id} style={styles.articleCard}>
                        <View style={styles.articleHeader}>
                            <View style={styles.articleNumberContainer}>
                                <Text style={styles.articleNumber}>#{index + 1}</Text>
                            </View>
                            <View style={styles.articleActions}>
                                <TouchableOpacity
                                    style={styles.editArticleButton}
                                    onPress={() => editArticle(article)}
                                >
                                    <Text style={styles.editArticleText}>✏️ Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.removeArticleButton}
                                    onPress={() => removeArticle(article.id)}
                                >
                                    <Text style={styles.removeArticleText}>🗑️ Remover</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.articleTitle}>{article.title}</Text>
                        <Text style={styles.articleAuthor}>Por: {article.author}</Text>
                        {article.category && (
                            <View style={styles.articleCategoryBadge}>
                                <Text style={styles.articleCategoryText}>
                                    {article.category}
                                </Text>
                            </View>
                        )}
                        {article.tags && article.tags.length > 0 && (
                            <View style={styles.tagsContainer}>
                                {article.tags.map((tag, idx) => (
                                    <View key={idx} style={styles.tagBadge}>
                                        <Text style={styles.tagText}>#{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                        <Text
                            style={styles.articleContent}
                            numberOfLines={3}
                        >
                            {article.content}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    const renderArticleForm = () => {
        // Se não estiver expandido, mostra apenas o botão
        if (!isArticleFormExpanded) {
            return (
                <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => setIsArticleFormExpanded(true)}
                >
                    <Text style={styles.expandButtonText}>+ Adicionar Novo Artigo</Text>
                </TouchableOpacity>
            );
        }

        // Se estiver expandido, mostra o formulário completo
        return (
            <View style={styles.articleFormContainer}>
                <View style={styles.articleFormHeader}>
                    <Text style={styles.articleFormTitle}>
                        {editingArticleId ? '✏️ Editar Artigo' : '📝 Novo Artigo'}
                    </Text>
                    <TouchableOpacity onPress={cancelEdit}>
                        <Text style={styles.closeFormText}>✕ Fechar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Título do Artigo *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o título do artigo"
                    placeholderTextColor="#999"
                    value={currentArticle.title}
                    onChangeText={(text) => setCurrentArticle({...currentArticle, title: text})}
                />

                <Text style={styles.label}>Descrição do Artigo *</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Digite o conteúdo do artigo"
                    placeholderTextColor="#999"
                    value={currentArticle.content}
                    onChangeText={(text) => setCurrentArticle({...currentArticle, content: text})}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />

                <Text style={styles.label}>Autor do Artigo *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do autor"
                    placeholderTextColor="#999"
                    value={currentArticle.author}
                    onChangeText={(text) => setCurrentArticle({...currentArticle, author: text})}
                />

                <Text style={styles.label}>Categoria</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Notícias, Esportes, Cultura"
                    placeholderTextColor="#999"
                    value={currentArticle.category}
                    onChangeText={(text) => setCurrentArticle({...currentArticle, category: text})}
                />

                <Text style={styles.label}>Tags (separadas por vírgula)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="exemplo, tags, separadas, por, virgula"
                    placeholderTextColor="#999"
                    value={currentArticle.tags}
                    onChangeText={(text) => setCurrentArticle({...currentArticle, tags: text})}
                />

                {pdfFile && pdfFile.name && (
                    <View style={styles.pdfInfoContainer}>
                        <View style={styles.pdfInfoCard}>
                            <Text style={styles.pdfInfoIcon}>📄</Text>
                            <View style={styles.pdfInfoDetails}>
                                <Text style={styles.pdfInfoName} numberOfLines={1}>
                                    {pdfFile.name}
                                </Text>
                                <Text style={styles.pdfInfoSize}>
                                    {formatFileSize(pdfFile.size)}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.removePdfButton}
                                onPress={removePdf}
                            >
                                <Text style={styles.removePdfText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <TouchableOpacity style={styles.imageButton} onPress={pickPdf}>
                    <Text style={styles.imageButtonText}>
                        {isLoadingPdf ? '⏳ Carregando...' : '📄 Anexar PDF do Artigo'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.saveArticleButton}
                    onPress={saveArticle}
                >
                    <Text style={styles.saveArticleButtonText}>
                        {editingArticleId ? '✓ Atualizar Artigo' : '+ Adicionar Artigo'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderSpecificFields = () => {
        if (publishType === 'Aviso') {
            return (
                <>
                    <Text style={styles.label}>Prioridade</Text>
                    <View style={styles.priorityContainer}>
                        <TouchableOpacity
                            style={[styles.priorityButton, priority === 'alta' && styles.priorityButtonActive]}
                            onPress={() => setPriority('alta')}
                        >
                            <Text style={[styles.priorityText, priority === 'alta' && styles.priorityTextActive]}>🔴 Alta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.priorityButton, priority === 'normal' && styles.priorityButtonActive]}
                            onPress={() => setPriority('normal')}
                        >
                            <Text style={[styles.priorityText, priority === 'normal' && styles.priorityTextActive]}>🟡 Normal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.priorityButton, priority === 'baixa' && styles.priorityButtonActive]}
                            onPress={() => setPriority('baixa')}
                        >
                            <Text style={[styles.priorityText, priority === 'baixa' && styles.priorityTextActive]}>🟢 Baixa</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Data de Expiração</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor="#999"
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                    />
                </>
            );
        } else if (publishType === 'Edicao') {
            return (
                <>
                    <Text style={styles.label}>Número da Edição</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Vol. 1, Nº 2"
                        placeholderTextColor="#999"
                        value={editionNumber}
                        onChangeText={setEditionNumber}
                    />

                    <Text style={styles.label}>Data de Publicação</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor="#999"
                        value={publicationDate}
                        onChangeText={(text)=> {
                            const formattedDate = formatDataWithBars(text);
                            setPublicationDate(formattedDate);
                        }}
                    />

                    <View style={styles.switchContainer}>
                        <Text style={styles.label}>Edição Especial</Text>
                        <Switch
                            value={isSpecialEdition}
                            onValueChange={setIsSpecialEdition}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isSpecialEdition ? '#ececec' : '#f3f3f3'}
                        />
                    </View>

                    {/* Seção de Artigos - Formulário expansível */}
                    <View style={styles.articlesSection}>
                        {renderArticleForm()}
                        {renderArticlesList()}
                    </View>
                </>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <JornalLogo />
            <ScrollView style={styles.scrollView}>
                <View style={styles.formContainer}>
                    <Text style={styles.headerTitle}>{getTitle()}</Text>

                    <Text style={styles.label}>Título da {publishType === 'Aviso' ? 'Edição' : 'Edição'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o título"
                        placeholderTextColor="#999"
                        value={title}
                        onChangeText={setTitle}
                    />

                    {renderSpecificFields()}

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Publicar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    formContainer: {
        padding: 20,
        paddingBottom: 120,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Lalezar_400Regular',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        marginBottom: 8,
        color: '#555',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        height: 120,
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    priorityButton: {
        flex: 1,
        padding: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    priorityButtonActive: {
        backgroundColor: '#2196F3',
    },
    priorityText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    priorityTextActive: {
        color: '#fff',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    imageButtonText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#555',
    },
    submitButton: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '500'
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 15,
        fontFamily: 'Inter-Regular',
    },
    pdfInfoContainer: {
        marginBottom: 15,
    },
    pdfInfoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#90caf9',
    },
    pdfInfoIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    pdfInfoDetails: {
        flex: 1,
    },
    pdfInfoName: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#333',
        marginBottom: 4,
    },
    pdfInfoSize: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#666',
    },
    removePdfButton: {
        backgroundColor: '#ffebee',
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removePdfText: {
        color: '#f44336',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Novos estilos para artigos
    articlesSection: {
        borderTopWidth: 2,
        borderTopColor: '#e0e0e0',
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        marginBottom: 8,
        color: '#333',
    },
    sectionDescription: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#666',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    expandButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    expandButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        fontWeight: 'bold',
    },
    articleFormContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    articleFormHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    articleFormTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#333',
    },
    closeFormText: {
        fontSize: 14,
        color: '#f44336',
        fontFamily: 'Inter-Regular',
        fontWeight: '500',
    },
    cancelEditText: {
        fontSize: 14,
        color: '#f44336',
        fontFamily: 'Inter-Regular',
    },
    saveArticleButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    saveArticleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        fontWeight: 'bold',
    },
    articlesListContainer: {
        marginTop: 10,
    },
    articlesListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    articlesCount: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#666',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    emptyArticlesContainer: {
        backgroundColor: '#f9f9f9',
        padding: 40,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
    },
    emptyArticlesIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyArticlesText: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#666',
        marginBottom: 8,
    },
    emptyArticlesSubtext: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#999',
        textAlign: 'center',
    },
    articleCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    articleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    articleNumberContainer: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    articleNumber: {
        fontSize: 12,
        fontFamily: 'Inter-Bold',
        color: '#fff',
    },
    articleActions: {
        flexDirection: 'row',
    },
    editArticleButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        backgroundColor: '#e3f2fd',
        borderRadius: 6,
    },
    editArticleText: {
        fontSize: 12,
        color: '#1976d2',
        fontFamily: 'Inter-Regular',
    },
    removeArticleButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#ffebee',
        borderRadius: 6,
    },
    removeArticleText: {
        fontSize: 12,
        color: '#f44336',
        fontFamily: 'Inter-Regular',
    },
    articleTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#333',
        marginBottom: 6,
    },
    articleAuthor: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#666',
        marginBottom: 8,
    },
    articleCategoryBadge: {
        backgroundColor: '#e8eaf6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    articleCategoryText: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#5c6bc0',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    tagBadge: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
        marginBottom: 4,
    },
    tagText: {
        fontSize: 11,
        fontFamily: 'Inter-Regular',
        color: '#666',
    },
    articleContent: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#555',
        lineHeight: 20,
        marginTop: 6,
    },
});

export default PublishScreen;