import { useState } from "react";
import BlogItemDetails from "./blog_item_details";

const AuthorsBlogs = ({blogs_data}) => {

  let [layout,setLayout] = useState(true);
    return (
      <div className="mt-8">
        {blogs_data.length > 0 ? (
                <>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
                        layout
                            ? 'lg:grid-cols-4'
                            : 'lg:grid-cols-3'
                    }`}>
                        {blogs_data.map((blog_data, index) => (
                            <BlogItemDetails data={blog_data} key={index} />
                        ))}
                    </div>
                </>
                
            ) : (
                <h2 className='center'>No Posts Found</h2>
            )}
      </div>
    );
  };

  export default AuthorsBlogs
  