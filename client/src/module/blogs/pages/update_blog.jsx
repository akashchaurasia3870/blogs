import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        image: null,
    });

    const { id } = useParams(); // Assuming you're using React Router and the blog ID is passed in the URL
    // const history = useHistory();

    // Fetch the existing blog data when the component mounts
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`https://api.example.com/blogs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBlogData({
                        title: data.title,
                        content: data.content,
                        image: data.image || null,
                    });
                } else {
                    console.error("Failed to fetch blog data.");
                    navigate('/signin');
                }
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchBlogData();
    }, [id]);

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
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBlogData({ ...blogData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api.example.com/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });

            if (response.ok) {
                history.push(`/blogs/${id}`); // Redirect to the updated blog blog page
            } else {
                console.error("Failed to update blog blog.");
            }
        } catch (error) {
            console.error("Error updating blog blog:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6">Update Blog Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Content:</label>
                        <textarea
                            name="content"
                            value={blogData.content}
                            onChange={handleChange}
                            rows="10"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700">Post Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-sm file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                        />
                        {blogData.image && (
                            <img
                                src={blogData.image}
                                alt="Blog Post"
                                className="mt-4 rounded-md max-h-64 w-full object-cover"
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBlog;
