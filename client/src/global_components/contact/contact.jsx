import React, { useState } from 'react'
import api_url from '../../utils/utils';

import contact_img from '../../assets/img/contact.png'
import { useTheme } from '../../context/ThemeContext';

function Contact() {

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const {themeValue} = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contactInfo = { email, subject, message };

        if (!email || !subject || !message) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

             fetch(`${api_url}/mail/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactInfo),
                credentials: "include",
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {
                alert('Message sent successfully!');
                setEmail('');
                setSubject('');
                setMessage('');
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Failed to send message. Please try again later.');
            });
        
    
    };

    return (
        <div>
            <div className={`flex flex-col md:flex-row p-2 md:p-6 rounded-lg shadow-lg text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 ${themeValue.bgvalue2}`}
            >
                <div className="md:w-1/2 md:mb-0 max-h-[50vh] flex items-center justify-center mx-1">
                
                    <img src={contact_img} alt="Contact Us" className="rounded-md mb-4 w-full h-[360px] object-contain p-0 md:p-6"/>
                    {/* <div className='absolute inset-0 flex flex-col items-center justify-center text-center hidden'>
                        <h1 className="text-3xl ">Get in Touch</h1>
                        <p className="mt-2">We would love to hear from you. Please fill out the form to reach out to us.</p>
                    </div> */}
                </div>


                <div className="md:w-1/2 mx-1">
                    <form className="space-y-4">
                        <div>
                            <label for="email" className="block text-sm ">Email</label>
                            <input type="email" id="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label for="subject" className="block text-sm">Subject</label>
                            <input type="text" id="subject" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter the subject" 
                            onChange={(e) => setSubject (e.target.value)}
                            />
                        </div>
                        <div>
                            <label for="message" className="block text-sm ">Message</label>
                            <textarea id="message" rows="4" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your message" onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={handleSubmit}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact