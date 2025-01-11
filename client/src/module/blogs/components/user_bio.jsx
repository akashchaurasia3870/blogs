import React, { useContext } from "react";
import api_url from "../../../utils/utils";
import { useTheme } from "../../../context/ThemeContext";

const UserBio = ({author_data}) => {
  
  const {themeValue} = useTheme();

  return (
    <div className={`w-full mx-auto shadow-md rounded-lg p-6 text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 ${themeValue.bgvalue2} text-[8px] sm:text-sm md:text-md lg:text-lg`}>
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-around">
        {/* Profile Image with Gradient */}
        <div className="flex flex-col md:flex-row items-center justify-center md:items-center md:justify-start">    
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-sm bg-gradient-to-tr from-red-400 via-green-500 to-blue-500 p-[2px]">
            <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
                <img
                src={`${api_url+author_data?.userImage||'https://via.placeholder.com/80'}`}
                alt=""
                className="w-full h-full rounded-sm object-cover"
                />
            </div>
            
            </div>
            <div className="mt-2 md:ml-5 text-center">
                    <h2 className="xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold">{author_data.username}</h2>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-500">{author_data.occupation}</p>
            </div>
        </div>

        {/* Stats Section */}
        <div className="mt-4 sm:ml-4 flex flex-col items-center justify-center">
          <div className="flex space-x-6 lg:space-x-12">
            <div className="text-center">
              <p className="font-bold text-xl md:text-2xl lg:text-4xl">{author_data?.blogs_count}</p>
              <p className="text-gray-500  text-xl md:text-xl lg:text-2xl">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl md:text-2xl lg:text-3xl">{author_data?.followers_list?.length}</p>
              <p className="text-gray-500 text-xl md:text-xl lg:text-2xl">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl md:text-2xl lg:text-3xl">{author_data?.following_list?.length}</p>
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
