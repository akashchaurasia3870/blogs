import React, { useContext, useState } from "react";
import api_url from "../../../utils/utils";
import { useTheme } from "../../../context/ThemeContext";

const AddBlog = () => {

    const {themeValue} = useTheme();
    
  
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogData,
            [name]: value,
        });
    };

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
                    },
                    body: binaryData,
                    credentials: "include",
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
                },
                body: JSON.stringify(blogData),
                credentials: "include",
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
            navigate('/signin');
        }
    };

    return (
        <div className={`flex items-center justify-center ${themeValue.theme} text-${themeValue.fontsize} text-${themeValue.fontcolor}-500`}>
            <div className="p-3 md:p-8 w-full">
                <h2 className="text-2xl font-semibold mb-6">Create A Blog Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className={`flex flex-col items-start justify-center p-3 rounded-lg ${themeValue.bgvalue2}`}>
                        <span className="">Title:</span>
                        <input
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter the title of your blog"
                            className={`w-full md:w-1/2 lg:w-1/3 rounded-md  p-3 ${themeValue.theme}`}
                        />
                    </div>
                    <div className={`flex flex-col items-start justify-center p-3 rounded-lg ${themeValue.bgvalue2}`} >
                        <span className="block">Caption:</span>
                        <input
                            type="text"
                            name="caption"
                            value={blogData.caption}
                            onChange={handleChange}
                            placeholder="e.g., An unforgettable journey through the mountains."
                            className={`w-full md:w-1/2 lg:w-1/3 rounded-md  p-3 ${themeValue.theme}`}
                        />
                    </div>
                    <div className={`flex flex-col items-start justify-center p-3 rounded-lg ${themeValue.bgvalue2}`} >
                        <span className="block">Hashtags:</span>
                        <input
                            type="text"
                            name="hashtags"
                            value={blogData.hashtags}
                            onChange={handleChange}
                            placeholder="e.g., #Travel #Adventure #Nature"
                            className={`w-full md:w-1/2 lg:w-1/3 rounded-md  p-3 ${themeValue.theme}`}
                        />
                    </div>
                    <div className={`flex flex-col items-start justify-center p-3 rounded-lg ${themeValue.bgvalue2}`} >
                        <span className="">Content:</span>
                        <textarea
                            name="content"
                            value={blogData.content}
                            onChange={handleChange}
                            rows="10"
                            required
                            placeholder="Write the content of your blog..."
                            className={`w-full md:w-1/2 lg:w-1/3 rounded-md  p-3 ${themeValue.theme}`}
                        ></textarea>
                    </div>

                    <div className={`flex flex-col items-start justify-center p-3 rounded-lg ${themeValue.bgvalue2}`} >
                        <span className="block  p-3 ">Post Images (Max 5):</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            key={imageInputKey}
                            onChange={(e) => { handleImageChange(e); }}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-sm file:border-0
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
                    <div className={`flex flex-col items-start justify-center p-3 rounded-lg ${themeValue.bgvalue2}`} >
                        <span className="block  p-3 ">Post Videos (Max 2):</span>
                        <input
                            type="file"
                            accept="video/*"
                            multiple
                            key={videoInputKey}
                            onChange={(e) => { handleVideoChange(e); }}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-sm file:border-0
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
                        className={`px-5 py-4 rounded-md ${themeValue.bgvalue2}`}
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
