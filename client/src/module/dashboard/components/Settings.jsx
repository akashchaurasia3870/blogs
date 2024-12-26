import React, { useState, useContext, useEffect } from 'react';
import { BlogDataContext } from '../../../context/Blog_Context';

const Settings = () => {
    const { theme, setTheme,theme2, setTheme2, fontSize, setFontSize, fontColor, setFontColor, fontWeight, setFontWeight, fontStyle, setFontStyle, backgroundImage, setBackgroundImage , handleInputChange ,updateThemeData,getThemeData } = useContext(BlogDataContext);

    useEffect(()=>{
        getThemeData()
    },[]);

    return (
        <div className={`p-2 md:p-6 bg-${theme} text-${fontColor}-500 ${fontWeight} ${fontStyle}`}>
           
            <p className={`font-bold mb-2 text-3xl text-${fontColor}-600 ${fontWeight} ${fontStyle} ml-4 `}>Settings</p>

            <div className={`flex flex-col mb-12 md:mb-0`}>
                <div className={`w-full p-2 flex flex-wrap flex-row`}>
                    {/* Theme */}
                    <div className={`shadow-md p-2 w-full sm:w-[45%] m-2 rounded-lg`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                        <span className={`block text-lg mb-2 text-${fontColor}-600`}>Theme</span>
                        <div className={`flex flex-col items-start justify-between`}>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="white"
                                    name='theme'
                                    checked={theme === "white"}
                                    onChange={(e) => {setTheme(e.target.value), handleInputChange(e),setTheme2('200')}}
                                    className={`form-radio`}
                                />
                                <span className={`ml-2 text-${fontColor}-600`}>Light</span>
                            </p>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="black"
                                    name='theme'
                                    checked={theme === "black"}
                                    onChange={(e) => {setTheme(e.target.value), handleInputChange(e),setTheme2('800')}}
                                    className={`form-radio text-indigo-600`}
                                />
                                <span className={`ml-2 text-${fontColor}-600`}>Dark</span>
                            </p>
                        </div>
                    </div>

                    
                    {/* Font Style */}
                    <div className={`shadow-md p-2 w-full sm:w-[45%] m-2 rounded-lg`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                    <span className={`block text-lg mb-2 text-${fontColor}-600`}>Font Style</span>
                        <div className={`flex flex-col items-start justify-between`}>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="font-normal"
                                    name='fontStyle'
                                    checked={fontStyle === "font-normal"}
                                    onChange={(e) => {setFontStyle(e.target.value), handleInputChange(e)}}
                                    className={`form-radio text-indigo-600`}
                                />
                                <span className={`text-${fontColor}-600`}>Normal</span>
                            </p>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="font-italic"
                                    name='fontStyle'
                                    checked={fontStyle === "font-italic"}
                                    onChange={(e) => {setFontStyle(e.target.value), handleInputChange(e)}}
                                    className={`form-radio text-indigo-600`}
                                />
                                <span className={`text-${fontColor}-600`}>Italic</span>
                            </p>
                        </div>
                    </div>

                    {/* Font Size */}
                    {/* <div className={`shadow-md p-4 w-full`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                        <span className={`block text-lg mb-2 text-${fontColor}-600`}>Theme</span>                    <div className={`grid grid-cols-3 gap-4`}>
                        {['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'].map((sizeClass, index) => (
                        <p key={index} className={`flex items-center cursor-pointer`}>
                            <input
                            type="radio"
                            name="fontSize"
                            value={sizeClass}
                            checked={fontSize === sizeClass}
                            onChange={(e) => { setFontSize(e.target.value); handleInputChange(e); }}
                            className={`mr-2"
                            />
                            <span className={`${sizeClass}`}>Aa</span>
                        </p>
                        ))}
                    </div>
                    <div className={`mt-4 text-sm`}>Selected Font Size: <span className={`${fontSize}`}>{fontSize.replace('text-', '')}</span></div>
                    </div> */}


                    {/* Font Color */}
                    <div className={`shadow-md p-2 w-full sm:w-[45%] m-2 rounded-lg`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                    <span className={`block text-lg mb-2 text-${fontColor}-600`}>Font Color</span>
                        <div className={`flex flex-col items-start justify-between`}>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="black"
                                    name='fontColor'
                                    checked={fontColor === "black"}
                                    onChange={(e) => {setFontColor(e.target.value), handleInputChange(e)}}
                                    className={`form-radio text-black`}
                                />
                                <span className={`ml-2 text-black`}>Black</span>
                            </p>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="indigo"
                                    name='fontColor'
                                    checked={fontColor === "indigo"}
                                    onChange={(e) => {setFontColor(e.target.value), handleInputChange(e)}}
                                    className={`form-radio text-black`}
                                />
                                <span className={`ml-2 text-indigo-700`}>Indigo</span>
                            </p>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="red"
                                    name='fontColor'
                                    checked={fontColor === "red"}
                                    onChange={(e) => {setFontColor(e.target.value), handleInputChange(e)}}

                                    className={`form-radio text-red-600`}
                                />
                                <span className={`ml-2 text-red-600`}>Red</span>
                            </p>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="blue"
                                    name='fontColor'
                                    checked={fontColor === "blue"}
                                    onChange={(e) => {setFontColor(e.target.value), handleInputChange(e)}}
                                    className={`form-radio text-blue-600`}
                                />
                                <span className={`ml-2 text-blue-600`}>Blue</span>
                            </p>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="green"
                                    name='fontColor'
                                    checked={fontColor === "green"}
                                    onChange={(e) => {setFontColor(e.target.value), handleInputChange(e)}}
                                    className={`form-radio text-green-600`}
                                />
                                <span className={`ml-2 text-green-600`}>Green</span>
                            </p>
                            <p className={`inline-flex items-center my-1`}>
                                <input
                                    type="radio"
                                    value="orange"
                                    name='fontColor'
                                    checked={fontColor === "orange"}
                                    onChange={(e) => {setFontColor(e.target.value), handleInputChange(e)}}
                                    className={`form-radio text-orange-600`}
                                />
                                <span className={`ml-2 text-orange-600`}>Orange</span>
                            </p>
                        </div>
                    </div>


                    {/* Font Weight */}
                    <div className={`shadow-md p-2 w-full sm:w-[45%] m-2 rounded-lg`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>
                    <span className={`block text-lg mb-2 text-${fontColor}-600`}>Font Weight</span>
                        <div className={`flex flex-col items-start justify-between`}>
                                <p className={`inline-flex items-center my-1`}>
                                    <input
                                        type="radio"
                                        value="font-light"
                                        name='fontWeight'
                                        checked={fontWeight === "font-light"}
                                        onChange={(e) => {setFontWeight(e.target.value), handleInputChange(e)}}

                                        className={`form-radio text-indigo-600`}
                                    />
                                    <span className={`ml-2 text-${fontColor}-600`}>Light</span>
                                </p>
                                <p className={`inline-flex items-center my-1`}>
                                    <input
                                        type="radio"
                                        value="font-normal"
                                        name='fontWeight'
                                        checked={fontWeight === "font-normal"}
                                        onChange={(e) => {setFontWeight(e.target.value), handleInputChange(e)}}

                                        className={`form-radio text-indigo-600`}
                                    />
                                    <span className={`ml-2 text-${fontColor}-600`}>Normal</span>
                                </p>
                                <p className={`inline-flex items-center my-1`}>
                                    <input
                                        type="radio"
                                        value="font-semibold"
                                        name='fontWeight'
                                        checked={fontWeight === "font-semibold"}
                                        onChange={(e) => {setFontWeight(e.target.value), handleInputChange(e)}}

                                        className={`form-radio text-indigo-600`}
                                    />
                                    <span className={`ml-2 text-${fontColor}-600`}>Semi-Bold</span>
                                </p>
                                <p className={`inline-flex items-center my-1`}>
                                    <input
                                        type="radio"
                                        value="font-bold"
                                        name='fontWeight'
                                        checked={fontWeight === "font-bold"}
                                        onChange={(e) => {setFontWeight(e.target.value), handleInputChange(e)}}

                                        className={`form-radio text-indigo-600`}
                                    />
                                    <span className={`ml-2 text-${fontColor}-600`}>Bold</span>
                                </p>
                        </div>
                    </div>

                    {/* Background Image
                    <div>
                        <p className={`block text-lg font-medium mb-2 text-${fontColor}-500`}>Background Image URL</p>
                        <input
                            type="text"
                            value={backgroundImage}
                            name='backgroundStyle'
                            onChange={(e) => {setBackgroundImage(e.target.value), handleInputChange(e)}}
                            className={`border border-gray-300 rounded p-2 w-full"
                        />
                    </div> */}

                </div>

                
                <div onClick={updateThemeData} className='m-2'>
                        <button className='px-4 py-2 bg-blue-500 text-white m-2 rounded-lg'>SAVE</button>
                    </div>
                {/* <div className={`w-full lg:w-2/3 bg-gray-300`}>
                    <p className={`block text-lg font-medium mb-2 text-${fontColor}-500`}>Site Preview</p>
                    <div className={`border border-gray-300 rounded-lg overflow-hidden h-full w-full`}>
                        <iframe 
                            src={window.location.href} 
                            title="Site Preview" 
                            className={`w-full h-full"
                            frameBorder="0"
                        />
                    </div>
                </div> */}

            </div>
        </div>
    );
};

export default Settings;
