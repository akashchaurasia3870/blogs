import React, { useState, useEffect } from "react";
import api_url from "../../../utils/utils";

const CommentsPopup = ({ blog_id, onClose }) => {
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(""); // State for the new comment

  // Fetch comments when the component loads

  const fetchComments = async () => {
    try {
      const response = await fetch(`${api_url}/blogs/get_comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({blog_id}),
          credentials: "include",
        });
      if (response.ok) {
        const data = await response.json();        
        setComments(data || []);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [blog_id]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Prevent empty comments
    try {
      const response = await fetch(`${api_url}/blogs/add_comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ comment_data: newComment,blog_id}),
        credentials: "include",
      });

      if (response.ok) {
        // const newCommentData = await response.json();
        fetchComments();
        setNewComment(""); // Clear input field
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mx-3 text-[9px] sm:text-sm md:text-md lg:text-lg">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Comments</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* User Comments Section */}
        <div className="h-64 overflow-y-auto border rounded-lg p-3 mb-4 bg-gray-100">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start mb-4 border-b pb-3 last:border-b-0"
              >
                {/* User Details */}
                <img
                  src={comment?.userImage}
                  alt="User"
                  className="w-8 h-8 md:w-12 md:h-12 rounded-sm mr-3 bg-gray-600"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{comment?.username}</h4>
                  {/* Comment Message */}
                  <p className="text-gray-600">{comment?.comment}</p>
                  <p className=" text-gray-400">
                    {new Date(comment?.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet.</p>
          )}
        </div>

        {/* Add Comment Section */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsPopup;
