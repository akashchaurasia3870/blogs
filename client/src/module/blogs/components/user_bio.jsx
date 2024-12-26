import React, { useContext } from "react";
import { BlogDataContext } from "../../../context/Blog_Context";

const UserBio = () => {

    let {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext)
  return (
    <div className={`w-full mx-auto shadow-md rounded-lg p-6 bg-gray-800 text-${fontColor}-600 ${fontWeight} ${fontStyle} text-[8px] sm:text-sm md:text-md lg:text-lg`}>
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-around">
        {/* Profile Image with Gradient */}
        <div className="flex flex-col md:flex-row items-center justify-center md:items-center md:justify-start">    
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <img
                src="https://via.placeholder.com/80"
                alt="Karen Richards"
                className="w-18 h-18 rounded-full object-cover"
                />
            </div>
            
            </div>
            <div className="mt-2 md:ml-5 text-center">
                    <h2 className="xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold">Karen Richards</h2>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-500">Photographer</p>
            </div>
        </div>

        {/* Stats Section */}
        <div className="mt-4 sm:ml-4 flex flex-col items-center justify-center">
          <div className="flex space-x-6 lg:space-x-12">
            <div className="text-center">
              <p className="font-bold text-xl md:text-2xl lg:text-4xl">109</p>
              <p className="text-gray-500  text-xl md:text-xl lg:text-2xl">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl md:text-2xl lg:text-3xl">2163</p>
              <p className="text-gray-500 text-xl md:text-xl lg:text-2xl">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl md:text-2xl lg:text-3xl">258</p>
              <p className="text-gray-500 text-xl md:text-xl lg:text-2xl">Following</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex space-x-2">
            <button className={`bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-32 md:px-32 lg:px-52 py-2 rounded-md lg:text-xl`}>
              Follow
            </button>
            {/* <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md">
              Message
            </button> */}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default UserBio;
