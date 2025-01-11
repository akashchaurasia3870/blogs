import React, { useEffect, useState ,useContext } from 'react';
import PopularAuthorCard from './populer_author_card';
import api_url from '../../../utils/utils';
import {BlogDataContext } from '../../../context/Blog_Context';
import { useTheme } from '../../../context/ThemeContext';

const PopularAuthors = () => {

    let {authors_data}  = useContext(BlogDataContext);
        const {themeValue} = useTheme();

        
    const [authors, setAuthors] = useState(authors_data);
    const [page, setPage] = useState(1);
    const [dataSize, setDataLimit] = useState(5);
    const [totalAuthors, setTotalAuthors] = useState(0);

    
    const fetchAuthors = async (limit) => {
        try {
            const response = await fetch(`${api_url}/users/get_writer_info`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        page: page,
                        pageSize: dataSize,
                        limit: limit,
                    }),
                    credentials: "include",
                });
            const data = await response.json();

            // Set the authors data and the total number of authors
            setAuthors(data.data);
            // setTotalAuthors(response.data.total);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    // useEffect(() => {
    //     fetchAuthors(5);
    // }, []);    

    return (
        <div className={`p-6 mx-6 rounded-lg ${themeValue.bgvalue2}`} 
        >
            <h1 className={`text-2xl font-bold mb-6 text-${themeValue.fontsize} text-${themeValue.fontcolor}-500`}>Popular Authors</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                {authors.length > 0 && authors.map((author) => (
                    <PopularAuthorCard key={author.user_id} author_id={author.user_id} />
                ))}
            </div>
        </div>
    );
};

export default PopularAuthors;
