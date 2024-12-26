import React, { useContext } from 'react';
import { BlogDataContext } from '../../../context/Blog_Context';

const MailItem = ({ mail, onReply }) => {

    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);


    return (
        <div className={`shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg text-${fontColor}-600 ${fontWeight} ${fontStyle} shadow-md rounded-lg`} 
        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
            <div className="flex items-center">
                <img src={mail.senderImage} alt="Sender" className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-bold">{mail.subject}</h2>
                    <p className="text-gray-500">{mail.senderName} - {mail.time}</p>
                    <p className="text-gray-700">{mail.content}</p>
                </div>
            </div>
            <button 
                onClick={() => onReply(mail)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Reply
            </button>
        </div>
    );
};

export default MailItem;
