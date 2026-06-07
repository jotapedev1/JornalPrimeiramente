import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from 'react';

import axios from 'axios';
import { AuthContext } from './AuthContext';

const MediaContext = createContext({});

const MediaProvider = ({ children }) => {

    const { api } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllEditions();
    }, []);

    // =========================
    // CARREGAR EDIÇÕES
    // =========================

    const getAllEditions = async () => {

        setLoading(true);

        try {

            const response = await api.get('/edition');

            console.log("Editions response:", response.data);

            const editionsData =
                Array.isArray(response.data)
                    ? response.data
                    : [];

            setEditions(editionsData);

            return editionsData;
        } catch(error) {
            console.log(
                "Error loading editions:",
                error.response?.data || error.message
            );
            setEditions([]);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // BOOKMARK
    // =========================

    const toggleBookmark = async (media) => {
        try {
            // ANTES: await api.post(`/${media.mediaId}/save`, ...)  ← URL errada
            // DEPOIS:
            await api.post(`/save/${media.mediaId}`);

            setBookmarks(prev => {
                const exists = prev.some(item => item.mediaId === media.mediaId);
                if (exists) {
                    return prev.filter(item => item.mediaId !== media.mediaId);
                }
                return [...prev, media];
            });
        } catch (error) {
            console.log('Erro bookmark:', error.response?.data || error.message);
        }
    };

    const isBookmarked = (mediaId) => {

        return bookmarks.some(
            item => item.mediaId === mediaId
        );
    };

    // =========================
    // BUSCAS
    // =========================

    const getEditionById = async (editionId) => {
        try {
            setLoading(true);
            const response = await api.get(`/edition/${editionId}`);

            return response.data;
        } catch (error) {
            console.log("Error getting edition:", error.response?.data || error.message);

            return null;
        } finally {
            setLoading(false);
        }
    };

    const getMediaByEdition = async (editionId) => {
        try {
            setLoading(true);
            const response = await api.get(`/edition/${editionId}`);

            return response.data?.media || [];
        } catch (error) {
            console.log("Error getting media by edition:", error.response?.data || error.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const getCurrentEdition = () => {

        if (editions.length === 0) {
            return null;
        }

        return [...editions].sort(
                    (a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt))[0];
    };

    const value = {

        articles,
        editions,
        bookmarks,
        loading,

        toggleBookmark,
        isBookmarked,

        getEditionById,
        getMediaByEdition,
        getAllEditions,
        getCurrentEdition,
    };

    return (
        <MediaContext.Provider value={value}>
            {children}
        </MediaContext.Provider>
    );
};

export default MediaProvider;

export const useMedia = () => {

    const context = useContext(MediaContext);

    if (!context) {
        throw new Error(
            'useArticles must be used within ArticleProvider'
        );
    }

    return context;
};