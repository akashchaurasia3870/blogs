import React from 'react';
import CategoryComponent from '../category_filter/category_filter';
import Silk_Slider from '../../global_components/silk_slider/slider'
import img from '../../assets/img/img1.jpg';
const CategorySlider = () => {

  
  const categories = [
    {
        title: 'Nature',
        imgSrc: img,
        description: 'Beautiful nature scenes',
        theme: '#5f4a3e',
    },
    {
        title: 'Tech',
        imgSrc: img,
        description: 'Latest in tech',
        theme: '#b56e22',
    },
    {
        title: 'Travel',
        imgSrc: img,
        description: 'Explore new destinations',
        theme: '#7e3f88',
    },
    {
        title: 'Food',
        imgSrc: img,
        description: 'Delicious culinary delights',
        theme: '#d4322a',
    },
    {
        title: 'Fashion',
        imgSrc: img,
        description: 'Trendy styles and designs',
        theme: '#3b72b2',
    },
    {
        title: 'Sports',
        imgSrc: img,
        description: 'Exciting sports activities',
        theme: '#1e9b83',
    },
    {
        title: 'Art',
        imgSrc: img,
        description: 'Creative artistic expressions',
        theme: '#ab347c',
    },
    {
        title: 'AI',
        imgSrc: img,
        description: 'Capturing moments in time',
        theme: '#4c7fbc',
    },
    {
        title: 'Music',
        imgSrc: img,
        description: 'Melodies and rhythms',
        theme: '#c3435a',
    },
    {
        title: 'Fitness',
        imgSrc: img,
        description: 'Staying fit and healthy',
        theme: '#52a47c',
    },
    {
        title: 'Movies',
        imgSrc: img,
        description: 'Cinema and entertainment',
        theme: '#d97f19',
    },
    {
        title: 'Books',
        imgSrc: img,
        description: 'Literature and reading',
        theme: '#6e62bc',
    },
    {
        title: 'Science',
        imgSrc: img,
        description: 'Discoveries and innovations',
        theme: '#d6317b',
    },
    {
        title: 'Gaming',
        imgSrc: img,
        description: 'Interactive digital adventures',
        theme: '#29a3d6',
    },
    {
        title: 'Architect',
        imgSrc: img,
        description: 'Innovative building designs',
        theme: '#748c37',
    }
];


  return (
    <div className="p-0 m-0 md:px-5 hidden md:block">
        <Silk_Slider posts={categories} title={""}
        renderSlide={(post) => <CategoryComponent post={post} />} />
    </div>
  );
}

export default CategorySlider;
