import React, { createContext, useState, useContext } from 'react';

export const articleData = [
    {
        id: 1,
        title: 'Obra X',
        author: 'Fulano Ciclano',
        desc: 'Descrição breve da obra, Descrição breve da obra, Descrição breve da obra, Descrição breve da obra, Descrição breve da obra, Descrição breve da obra',
        image: require('../assets/imgs/signupimg.jpg'),
        bookmarked: false
    },
    {
        id: 2,
        title: 'Obra Y',
        author: 'Beltrano Silva',
        desc: 'Outra descrição de obra interessante para testar os cards',
        image: require('../assets/imgs/signupimg.jpg'),
        bookmarked: false
    },
    {
        id: 3,
        title: 'Obra Z',
        author: 'Ciclana Souza',
        desc: 'Mais uma descrição para preencher espaço e testar o layout',
        image: require('../assets/imgs/signupimg.jpg'),
        bookmarked: false
    },
];

const ArticleContext = createContext({});

export const ArticleProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);

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

    return (
        <ArticleContext.Provider value={{
            articles: articleData,
            bookmarks,
            toggleBookmark,
            isBookmarked,
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