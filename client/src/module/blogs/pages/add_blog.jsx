import React, { useContext, useState } from "react";
import api_url from "../../../utils/utils";
import { BlogDataContext } from "../../../context/Blog_Context";

const AddBlog = () => {

    const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);
  
    const [blogData, setBlogData] = useState({
        title: "blog tile",
        content: "blog content",
        images: [],
        images_url: [],
        videos: [],
        videos_url: [],
        caption: "testing",
        hashtags: "#testing,#blog",
    });

    const [imageInputKey, setImageInputKey] = useState(Date.now());
    const [videoInputKey, setVideoInputKey] = useState(Date.now());




    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogData,
            [name]: value,
        });
    };

    // Handle image change
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + blogData.images.length <= 5) {
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBlogData((prevState) => ({
                        ...prevState,
                        images: [...prevState.images, reader.result],
                    }));
                };
                reader.readAsDataURL(file);
            });
            handleFileUpload(files, "image")
        } else {
            alert("You can only upload a maximum of 5 images.");
        }
    };

    // Handle video change
    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + blogData.videos.length <= 2) {
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBlogData((prevState) => ({
                        ...prevState,
                        videos: [...prevState.videos, reader.result],
                    }));
                };
                reader.readAsDataURL(file);
            });

            handleFileUpload(files, "video")
        } else {
            alert("You can only upload a maximum of 2 videos.");
        }
    };

    const handleFileUpload = (files, type) => {

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const binaryData = reader.result;

                fetch(`${api_url}/upload`, {
                    method: "POST",
                    headers: {
                        "Content-Type": file.type,
                        "Authorization": localStorage.getItem("token"),
                    },
                    body: binaryData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (type === "image") {
                            setBlogData((prevState) => ({
                                ...prevState,
                                images_url: [...prevState.images_url, data.fileUrl],
                            }));
                        } else if (type === "video") {
                            setBlogData((prevState) => ({
                                ...prevState,
                                videos_url: [...prevState.videos_url, data.fileUrl],
                            }));
                        }
                    })
                    .catch((error) => console.error("Error uploading file:", error));
            };
            reader.readAsArrayBuffer(file);
        });


    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let url = `${api_url}/blogs/create`;

            blogData.images = blogData.images_url;
            blogData.videos = blogData.videos_url;

            delete blogData.images_url;
            delete blogData.videos_url;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify(blogData),
            });


            if (response.ok) {
                // Clear the form
                setImageInputKey(Date.now());
                setVideoInputKey(Date.now());

                setBlogData({
                    title: "",
                    content: "",
                    images: [],
                    videos: [],
                    caption: "",
                    hashtags: "",
                });
            } else {
                console.error("Failed to create blog.");
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            localStorage.removeItem("token");
            navigate('/signin');
        }
    };

    return (
        <div className={`min-h-screen bg-${theme} flex items-center justify-center text-${fontColor}-600 ${fontWeight} ${fontStyle}`}>
            <div className="p-3 md:p-8 rounded-lg shadow-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Create A Blog Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-start justify-center p-3 rounded-lg" 
                    style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                    >
                        <span className="">Title:</span>
                        <input
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter the title of your blog"
                            className="w-full md:w-1/2 lg:w-1/3 rounded-md bg-gray-400 p-3"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                        <span className="block">Caption:</span>
                        <input
                            type="text"
                            name="caption"
                            value={blogData.caption}
                            onChange={handleChange}
                            placeholder="e.g., An unforgettable journey through the mountains."
                            className="w-full md:w-1/2 lg:w-1/3 rounded-md bg-gray-400 p-3"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                        <span className="block">Hashtags:</span>
                        <input
                            type="text"
                            name="hashtags"
                            value={blogData.hashtags}
                            onChange={handleChange}
                            placeholder="e.g., #Travel #Adventure #Nature"
                            className="w-full md:w-1/2 lg:w-1/3 rounded-md bg-gray-400 p-3"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                        <span className="">Content:</span>
                        <textarea
                            name="content"
                            value={blogData.content}
                            onChange={handleChange}
                            rows="10"
                            required
                            placeholder="Write the content of your blog..."
                            className="w-full md:w-1/2 lg:w-1/3 rounded-md bg-gray-400 p-3"
                        ></textarea>
                    </div>

                    <div className="flex flex-col items-start justify-center p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                        <span className="block  p-3 ">Post Images (Max 5):</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            key={imageInputKey}
                            onChange={(e) => { handleImageChange(e); }}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                        <div className="flex gap-2 mt-4">
                            {blogData.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Blog Image ${index + 1}`}
                                    className="rounded-md max-h-32 max-w-32 object-contain"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                        <span className="block  p-3 ">Post Videos (Max 2):</span>
                        <input
                            type="file"
                            accept="video/*"
                            multiple
                            key={videoInputKey}
                            onChange={(e) => { handleVideoChange(e); }}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                        <div className="flex gap-2 mt-4">
                            {blogData.videos.map((video, index) => (
                                <video
                                    key={index}
                                    controls
                                    className="rounded-md max-h-32 object-cover"
                                >
                                    <source src={video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
