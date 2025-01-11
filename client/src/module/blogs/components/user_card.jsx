import React, { useContext, useState } from "react";
import { BlogDataContext } from "../../../context/Blog_Context";
import api_url from "../../../utils/utils";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
const UserCard = ({data}) => {
  
    // data.user_id = 'b7b47927-458e-44e4-93d0-2cbac7db3c01'
    const [toggleFollow,setToggleFollow] = useState(data?.follow||true)    

    const followHandler = async (following_id) => {
        
        let url = `${api_url}/users/toggle_follow`;

        await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            credentials: "include",
        }).then(res => res.json())
        .then((data) => {
               alert(data.message)
        }).catch((e) => {
                console.log(e);
        })
    };

  let {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext)
  const {themeValue} = useTheme();

  return (
    <div className={`w-32 sm:w-56 md:w-56 lg:w-72 mx-auto shadow-md rounded-lg p-2 md:p-4 lg:p-6 text-center text-[8px] sm:text-sm md:text-md lg:text-lg ${themeValue.bgvalue2}`}>

    <Link to={`/blogs/${data?.user_id}`}>
          {/* Profile Image */}
          <div className={`relative mx-auto w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-sm bg-${themeValue.fontcolor}-500 p-[3px]`}>
            <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
              <div className="w-20 h-20 bg-${fontColor}-300 rounded-sm"></div>
            </div>
          </div>

          {/* Username and Location */}
          <p className="mt-1 md:mt-2 lg:mt-4 font-bold">
            {(data?.username).replaceAll('_',"")}<span className="text-blue-500">✔</span>
          </p>
          <p className={`text-${fontColor}-500`}>{data?.address?.country}</p>
          

          {/* Stats */}
          <div className="flex items-center justify-around md:justify-between mt-2 md:mt-4 lg:mt-6 font-semibold text-${fontColor}-700">
            <div className="text-center hidden md:block">
              <p>{data?.blogs_count}</p>
              <p className={`text-${fontColor}-500`}>posts</p>
            </div>
            <div className="text-center">
              <p>{data?.followers_list.length}</p>
              <p className={`text-${fontColor}-500`}>followers</p>
            </div>
            <div className="text-center">
              <p>{data?.following_list.length}</p>
              <p className={`text-${fontColor}-500`}>following</p>
            </div>
          </div>
    </Link>

      <div className="mt-2 md:mt-4 lg:mt-6">
        <button className={`bg-gray-500 hover:bg-blue-600 text-white font-medium px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 rounded-md`} onClick={()=>{
            followHandler(data?.user_id); setToggleFollow(!toggleFollow)
        }}>
          {toggleFollow?"Follow":"Following"}
        </button>
        {/* <button className="bg-${fontColor}-100 hover:bg-${fontColor}-200 text-${themeValue.fontcolor}-500 font-medium px-3 py-2 ml-2 rounded-md">
          ▼
        </button> */}
      </div>
    </div>
  );
};

export default UserCard;
