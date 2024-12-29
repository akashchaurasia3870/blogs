import React, { useState } from "react";

const ShareModal = ({ isOpen, onClose, postUrl }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-80 p-5 shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share Post</h3>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>

        {/* Share Options */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
            <img
              src="https://img.icons8.com/fluency/24/facebook.png"
              alt="Facebook"
              className="h-8 w-8 rounded-full"
            />
            <span>Share on Facebook</span>
          </button>
          <button className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
            <img
              src="https://img.icons8.com/fluency/24/twitter.png"
              alt="Twitter"
              className="h-8 w-8 rounded-full"

            />
            <span>Share on Twitter</span>
          </button>
          <button className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100">
            <img
              src="https://img.icons8.com/fluency/24/instagram-new.png"
              alt="Instagram"
              className="h-8 w-8 rounded-full"

            />
            <span>Share on Instagram</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
          >
            <img
              src="https://img.icons8.com/fluency/24/link.png"
              alt="Copy Link"
              className="h-8 w-8 rounded-full"

            />
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
