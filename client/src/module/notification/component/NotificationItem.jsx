import React, { useContext } from 'react';
import { BlogDataContext } from '../../../context/Blog_Context';
import api_url from '../../../utils/utils';

const NotificationItem = ({ notification, onReply }) => {    

    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);

    let img_url = api_url+notification.user_details.userImage ;    

    return (
        <div className={`shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg text-${fontColor}-600 ${fontWeight} ${fontStyle} shadow-md rounded-lg`} 
        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
            <div className="flex items-center">
                <img 
                src={`${api_url}${notification.user_details.userImage}`} 
                // src={`http://localhost:8000/data/images/2d5db27d-525c-4feb-88d0-0b353ddbc7f6.png`} 
                alt="Sender" className="w-12 h-12 rounded-full object-cover mr-4 p-1" />
                <div>
                    <h2 className="text-xl font-bold">{notification.subject}</h2>
                    <p className="text-gray-500">{notification.user_details.username} - {notification.date_created}</p>
                    <p className="text-gray-700">{notification.content}</p>
                </div>
            </div>
            <button 
                onClick={() => onReply(notification)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Reply
            </button>
        </div>
    );
};

export default NotificationItem;
