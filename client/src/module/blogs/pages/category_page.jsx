import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { slug } = useParams();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 capitalize">{slug.replace('-', ' ')}</h1>
            {/* Fetch and display blogs related to the category */}
        </div>
    );
};

export default CategoryPage;
