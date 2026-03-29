import React, { createContext, useState, useContext } from 'react';
import {articleData} from "../data/articleData";
import {editionData} from "../data/editionData";

const ArticleContext = createContext({});

export const ArticleProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [editions, setEditions] = useState(editionData)

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
        return articleData.filter(a => a.editionId === editionId);
    }

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

        return editions.find(edition => {
            if (edition.year !== currentYear) return false;
            return currentMonth >= edition.monthStart && currentMonth <= edition.monthEnd;
        }) || editions[0];
    };


    return (
        <ArticleContext.Provider value={{
            articles: articleData,
            bookmarks,
            toggleBookmark,
            isBookmarked,
            getArticlesByEdition,
            getEditionById,
            getAllEditions,
            getCurrentEdition,
        }}>
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