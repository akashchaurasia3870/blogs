import React, { useState } from 'react';

const NotificationPopup = ({ mail, onClose, onSend }) => {
    const [content, setContent] = useState('');

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Reply to {mail.senderName}</h2>
                <p className="mb-2">Subject: {mail.subject}</p>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your reply..."
                ></textarea>
                <button
                    onClick={() => onSend(content)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default NotificationPopup;
