import React from 'react';
import img from '../../assets/img/img1.jpg';
const CategoryComponent = ({post}) => {
  
  return (
    <div 
      className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.05] text-[10px] sm:text-sm md:text-md lg:text-lg"
      style={{backgroundColor:post.theme}}
    >
      {/* <img 
        src={post.imgSrc} 
        alt={post.title} 
        className="w-full h-full object-cover"
      /> */}
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-white font-bold">{post.title}</span>
      </div>
    </div>
  );
}

export default CategoryComponent;
