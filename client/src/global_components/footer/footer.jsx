import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function Footer() {

    const {themeValue} = useTheme();

  
    return (
        <footer className={`py-4 md:py-8 text-${themeValue.fontsize} text-${themeValue.fontcolor}-500 ${themeValue.bgvalue2} text-sm md:text-lg lg:text-sm`}
>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Footer Links */}
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h5 className=" font-bold mb-2">Follow Us</h5>
                        <ul className="flex flex-wrap  items-center justify-center space-x-2 md:space-x-4">
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
