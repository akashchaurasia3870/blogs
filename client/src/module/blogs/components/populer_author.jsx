import React, { useEffect, useState ,useContext } from 'react';
import PopularAuthorCard from './populer_author_card';
import api_url from '../../../utils/utils';
import {BlogDataContext } from '../../../context/Blog_Context';

const PopularAuthors = () => {

    let { theme,theme2,fontColor,fontStyle,fontWeight ,
        authors_data, setAuthorsData,similier_data, 
        setSimilierData,trainding_data, setTrandingData}  = useContext(BlogDataContext);
        
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
                        "Authorization": localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        page: page,
                        pageSize: dataSize,
                        limit: limit,
                    })
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
        <div className={`p-6 mx-6 rounded-lg`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
            <h1 className={`text-2xl font-bold mb-6 text-${fontColor}-600 ${fontWeight} ${fontStyle}`}>Popular Authors</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                {authors.length > 0 && authors.map((author) => (
                    <PopularAuthorCard key={author.user_id} author_id={author.user_id} />
                ))}
            </div>
        </div>
    );
};

export default PopularAuthors;
