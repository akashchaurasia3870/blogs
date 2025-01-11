import React, { useState } from "react";
import api_url from "../../../utils/utils";

const AddBlog = () => {
    const [blogData, setBlogData] = useState({
        title: "blog title",
        content: "blog content",
        images: [],
        videos: [],
        caption: "testing",
        hashtags: "#testing,#blog",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogData,
            [name]: value,
        });
    };

    const handleFileUpload = (files, type) => {
        const maxFiles = type === "image" ? 2 : 2;

        if (files.length > maxFiles) {
            alert(`Please upload exactly ${maxFiles} ${type}s.`);
            return;
        }

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
                                images: [...prevState.images, data.fileUrl],
                            }));
                        } else if (type === "video") {
                            setBlogData((prevState) => ({
                                ...prevState,
                                videos: [...prevState.videos, data.fileUrl],
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

        if (blogData.images.length < 1) {
            alert("Please upload at least 1 image.");
            return;
        }

        // if (blogData.images.length !== 2 || blogData.videos.length !== 2) {
        //     alert("Please upload exactly 2 images and 2 videos before submitting.");
        //     return;
        // }

        try {
            const response = await fetch(`${api_url}/blogs/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
                credentials: "include",
            });

            if (response.ok) {
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
                navigate('/signin');
            }
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Create a New Blog Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-start justify-center">
                        <span className="text-gray-700 py-3">Title:</span>
                        <input
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter the title of your blog"
                            className="w-full md:w-1/2 lg:w-1/3 rounded-md bg2 p-3"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <span className="block text-gray-700 p-3">Caption:</span>
                        <input
                            type="text"
                            name="caption"
                            value={blogData.caption}
                            onChange={handleChange}
                            placeholder="e.g., An unforgettable journey through the mountains."
                            className="w-full md:w-1/2 lg:w-1/3 rounded-md bg2 p-3"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <span className="block text-gray-700 p-3">Hashtags:</span>
                        <input
                            type="text"
                            name="hashtags"
                            value={blogData.hashtags}
                            onChange={handleChange}
                            placeholder="e.g., #Travel #Adventure #Nature"
                            className="w-full md:w-1/2 lg:w-1/3 rounded-md bg2 p-3"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <span className="text-gray-700 p-3">Content:</span>
                        <textarea
                            name="content"
                            value={blogData.content}
                            onChange={handleChange}
                            rows="10"
                            required
                            placeholder="Write the content of your blog..."
                            className="w-full md:w-1/2 lg:w-1/3 rounded-md bg2 p-3"
                        ></textarea>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <span className="block text-gray-700 p-3">Post Images (2 required):</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileUpload(Array.from(e.target.files), "image")}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-sm file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <span className="block text-gray-700 p-3">Post Videos (2 required):</span>
                        <input
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={(e) => handleFileUpload(Array.from(e.target.files), "video")}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-sm file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
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
