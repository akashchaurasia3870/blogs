import { useContext } from "react";
import { BlogDataContext } from "../../../context/Blog_Context";
import api_url from "../../../utils/utils";

const AuthorBio = ({author_data}) => {

  const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);
  

  let img_path = author_data?.userImage;
  img_path = api_url + img_path;

    // return (
    //   <div className="p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center"
    //   style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
    //   >
    //     <div className="md:w-1/4 mb-4 md:mb-0">
    //       <img src={img_path} alt="Author" className="rounded-full h-32 w-32" />
    //     </div>
    //     <div className="md:w-3/4 md:ml-6 text-center md:text-left">
    //       <h2 className="text-2xl">{author_data?.username}</h2>
    //       <p className="">Posts : 13 | Followers: 1313</p>
    //       <div className="mt-4 flex justify-center md:justify-start space-x-4">
    //         <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
    //           Copy Profile
    //         </button>
    //         <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
    //           Follow
    //         </button>
    //       </div>
    //       <p className="mt-4">
    //       {author_data?.bio}
    //       </p>
    //     </div>
    //   </div>
    // );

    return (
      <div
        className="p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start"
        style={{
          backgroundColor: theme === "black" ? "#1e293b" : "#e2e8f0",
        }}
      >
        {/* Author Image Section */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/4 flex justify-center md:justify-start">
          <img
            src={img_path}
            alt="Author"
            className="rounded-full h-32 w-32 md:h-40 md:w-40 border-4 border-gray-300 object-cover"
          />
        </div>
    
        {/* Author Info Section */}
        <div className="md:w-3/4 md:ml-6 text-center md:text-left">
          {/* Username */}
          <h2
            className={`text-xl md:text-3xl font-semibold ${
              theme === "black" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {author_data?.username}
          </h2>
    
          {/* Posts and Followers */}
          <p
            className={`text-sm md:text-base ${
              theme === "black" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Posts: 13 | Followers: 1,313
          </p>
    
          {/* Action Buttons */}
          <div className="mt-4 flex justify-center md:justify-start space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm md:text-base font-medium hover:bg-indigo-700">
              Copy Profile
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm md:text-base font-medium hover:bg-green-700">
              Follow
            </button>
          </div>
    
          {/* Bio */}
          <p
            className={`mt-4 text-sm md:text-base ${
              theme === "black" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {author_data?.bio}
          </p>
        </div>
      </div>
    );
    
  };

  export default AuthorBio ;
  