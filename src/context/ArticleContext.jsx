// src/context/ArticleContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { articleData } from "../data/articleData.js";
import { editionData } from "../data/editionData.js";

const ArticleContext = createContext({});

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = () => {
        if (articleData && articleData.length > 0) {
            setArticles(articleData);
        } else {
            console.error('articleData is empty or undefined');
        }

        if (editionData && editionData.length > 0) {
            setEditions(editionData);
        } else {
            console.error('editionData is empty or undefined');
        }

        setLoading(false);
    };

    const toggleBookmark = (article) => {
        setBookmarks(prev => {
            const exists = prev.some(item => item.id === article.id);
            if (exists) {
                return prev.filter(item => item.id !== article.id);
            } else {
                return [...prev, article];
            }
        });
    };

    const isBookmarked = (articleId) => {
        return bookmarks.some(item => item.id === articleId);
    };

    const getArticlesByEdition = (editionId) => {
        return articles.filter(a => a.editionId === editionId);
    };

    const getEditionById = (editionId) => {
        return editions.find(edition => edition.id === editionId);
    };

    const getAllEditions = () => {
        return editions;
    };

    const getCurrentEdition = () => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const current = editions.find(edition => {
            if (edition.year !== currentYear) return false;
            return currentMonth >= edition.monthStart && currentMonth <= edition.monthEnd;
        });

        // Se não encontrar, retorna a primeira edição
        return current || editions[0];
    };

    const value = {
        articles,
        bookmarks,
        editions,
        loading,
        toggleBookmark,
        isBookmarked,
        getArticlesByEdition,
        getEditionById,
        getAllEditions,
        getCurrentEdition,
    };

    return (
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    );
};

export const useArticles = () => {
    const context = useContext(ArticleContext);
    if (!context) {
        throw new Error('useArticles must be used within ArticleProvider');
    }
    return context;
};