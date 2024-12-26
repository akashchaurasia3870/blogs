import React, { useContext } from 'react';
import { BlogDataContext } from '../../context/Blog_Context';

function Footer() {

    const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);
  
    return (
        <footer className={`py-8 text-${fontColor}-600 ${fontWeight} ${fontStyle} text-sm md:text-lg lg:text-sm`}
        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Footer Links */}
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h5 className="text-lg font-bold mb-2">Follow Us</h5>
                        <ul className="flex space-x-1 md:space-x-4">
                            <li>
                                <a href="mailto:someone@example.com" className="hover:text-gray-400">
                                    <i className="fas fa-envelope"></i> Gmail
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com" className="hover:text-gray-400">
                                    <i className="fab fa-facebook"></i> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com" className="hover:text-gray-400">
                                    <i className="fab fa-instagram"></i> Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com" className="hover:text-gray-400">
                                    <i className="fab fa-youtube"></i> YouTube
                                </a>
                            </li>
                            <li>
                                <a href="https://apple.com" className="hover:text-gray-400">
                                    <i className="fab fa-apple"></i> Apple
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" className="hover:text-gray-400">
                                    <i className="fab fa-twitter"></i> Twitter
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Copyright */}
                    <div className="text-center md:text-right">
                        <p>&copy; 2024 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
