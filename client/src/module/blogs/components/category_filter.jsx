import React from 'react';

const categories = [
    { id: 1, name: 'Technology', slug: 'technology', theme: '#FF5733' },
    { id: 2, name: 'Health & Wellness', slug: 'health-wellness', theme: '#33C1FF' },
    { id: 3, name: 'Travel', slug: 'travel', theme: '#8E44AD' },
    { id: 4, name: 'Food & Recipes', slug: 'food-recipes', theme: '#27AE60' },
    { id: 5, name: 'Finance & Investing', slug: 'finance-investing', theme: '#E67E22' },
    { id: 6, name: 'Lifestyle', slug: 'lifestyle', theme: '#2980B9' },
    { id: 7, name: 'Education', slug: 'education', theme: '#D35400' },
    { id: 8, name: 'Coding', slug: 'coding', theme: '#9B59B6' },
    { id: 9, name: 'Business', slug: 'business', theme: '#1ABC9C' },
    { id: 3, name: 'Travel', slug: 'travel', theme: '#8E44AD' },
    { id: 4, name: 'Food & Recipes', slug: 'food-recipes', theme: '#27AE60' },
    { id: 5, name: 'Finance & Investing', slug: 'finance-investing', theme: '#E67E22' },
    { id: 6, name: 'Lifestyle', slug: 'lifestyle', theme: '#2980B9' },
    { id: 7, name: 'Education', slug: 'education', theme: '#D35400' },
    { id: 8, name: 'Coding', slug: 'coding', theme: '#9B59B6' },
    { id: 9, name: 'Business', slug: 'business', theme: '#1ABC9C' },
    { id: 3, name: 'Travel', slug: 'travel', theme: '#8E44AD' },
    { id: 4, name: 'Food & Recipes', slug: 'food-recipes', theme: '#27AE60' },
    { id: 5, name: 'Finance & Investing', slug: 'finance-investing', theme: '#E67E22' },
    { id: 6, name: 'Lifestyle', slug: 'lifestyle', theme: '#2980B9' },
    { id: 7, name: 'Education', slug: 'education', theme: '#D35400' },
    { id: 8, name: 'Coding', slug: 'coding', theme: '#9B59B6' },
    { id: 9, name: 'Business', slug: 'business', theme: '#1ABC9C' },
];

const CategoryComponent = () => {
    const handleCategoryClick = (slug) => {
        // Add your logic for handling the click event here
    };

    return (
        <div className="flex justify-start items-center my-3 overflow-x-scroll">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)}
                    className="flex-shrink-0 mx-6 my-2 w-20 h-20 rounded-sm text-white hover:opacity-90 hover:scale-[1.05] transition duration-300"
                    style={{ backgroundColor: category.theme }}
                >
                    <span className="flex items-center justify-center h-full text-center p-2 text-[12px]">
                        {category.name}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default CategoryComponent;
