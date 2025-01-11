import React, { createContext, useEffect, useState } from 'react';
import api_url from '../utils/utils';

// Create a BlogContext with default values
export const BlogDataContext = createContext();

export const BlogDataProvider = ({ children }) => {
    const [blog_context_data, setContextData] = useState({
        user_data:[],
        blog_data:[],
        authors_data:[],
        similier_data:[],
        trainding_data:[],
    });
    const [user_data, setUserData] = useState([]);
    const [blog_data, setBlogData] = useState([]);
    const [authors_data, setAuthorsData] = useState([]);
    const [similier_data, setSimilierData] = useState([]);
    const [trainding_data, setTrandingData] = useState([]);

    const BlogContextValue = {
        user_data, 
        setUserData,
        blog_data, 
        setBlogData,
        authors_data, 
        setAuthorsData,
        similier_data, 
        setSimilierData,
        trainding_data, 
        setTrandingData,
        blog_context_data, 
        setContextData
    };
    
    return (
        <BlogDataContext.Provider value={BlogContextValue}>
            <div>
              {children}
            </div>
        </BlogDataContext.Provider>
    );
};

