import React, { createContext, useEffect, useState } from 'react';
import api_url from '../utils/utils';

// Create a BlogContext with default values
export const BlogDataContext = createContext();

export const BlogDataProvider = ({ children }) => {
    // State for managing various data types
    const [user_data, setUserData] = useState(null);
    const [blog_data, setBlogData] = useState(null);
    const [authors_data, setAuthorsData] = useState(null);
    const [similier_data, setSimilierData] = useState(null);
    const [trainding_data, setTrandingData] = useState(null);

    const [theme, setTheme] = useState('white');
    const [theme2, setTheme2] = useState('200');
    const [fontSize, setFontSize] = useState('text-sm');
    const [fontColor, setFontColor] = useState('blue');
    const [fontWeight, setFontWeight] = useState('font-normal');
    const [fontStyle, setFontStyle] = useState('font-normal');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [updatedValues, setUpdatedValues] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedValues(prevValues => ({
            ...prevValues,
            [name]: value,  // Dynamically update the corresponding key in the state
        }));
    };

    const themeStyles = {
        light: {
            backgroundColor: 'white',
            color: fontColor,
        },
        dark: {
            backgroundColor: 'black',
            color: fontColor,
        },
    };

    const currentThemeStyles = themeStyles[theme] || themeStyles.light;

    const getThemeData = async ()=>{
        let url = api_url+'/theme/get' ;
         await fetch(url,{
            method:"POST",
            headers :{
                'Content-Type':'application/json',
                "Authorization": localStorage.getItem("token"),

            },
            body : JSON.stringify()
         }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            setTheme(data.theme);
            if(data.theme=='white'){
                setTheme2('200');
            }else{
                setTheme2('800');
            }
            setFontColor(data.fontColor);
            setFontSize(data.fontSize);
            setFontStyle(data.fontStyle);
            setFontWeight(data.fontWeight);
            setBackgroundImage(data.backgroundStyle)

            // setBlogs(data.data);
            // setLoading(false);
        })
        .catch(error => {
            // setError(error.message);
            // setLoading(false);
            // localStorage.removeItem("token");
            // navigate('/signin');
        });
    }

    const updateThemeData = async ()=>{
        let url = api_url+'/theme/update' ;
        await fetch(url,{
           method:"POST",
           headers :{
               'Content-Type':'application/json',
               "Authorization": localStorage.getItem("token"),

           },
           body : JSON.stringify({updatedValues})
        }).then(response => {
           if (!response.ok) {
               throw new Error('Network response was not ok');
           }
           return response.json();
       })
       .then(data => {
            setTheme(data.theme);
            setFontColor(data.fontColor);
            setFontSize(data.fontSize);
            setFontStyle(data.fontStyle);
            setFontWeight(data.fontWeight);
            setBackgroundImage(data.backgroundStyle)
       })
       .catch(error => {
            console.log(error);
           // setError(error.message);
           // setLoading(false);
           // localStorage.removeItem("token");
           // navigate('/signin');
       });
   }

   useEffect(()=>{
    getThemeData()
   },[])

    const BlogContextValue = {
        theme,
        setTheme,
        theme2, 
        setTheme2,
        fontSize,
        setFontSize,
        fontColor,
        setFontColor,
        fontWeight,
        setFontWeight,
        fontStyle,
        setFontStyle,
        backgroundImage,
        setBackgroundImage,
        handleInputChange,
        currentThemeStyles,
        currentFontSize: fontSize,
        currentFontWeight: fontWeight,
        currentFontStyle: fontStyle,
        getThemeData,
        updateThemeData,
        user_data, 
        setUserData,
        blog_data, 
        setBlogData,
        authors_data, 
        setAuthorsData,
        similier_data, 
        setSimilierData,
        trainding_data, 
        setTrandingData
    };

    // #1e293b 800
   // #e2e8f0 200

    return (
        <BlogDataContext.Provider value={BlogContextValue}>
            <div className={`${fontWeight} ${fontStyle} text-${fontColor} bg-slate-200 `}>
              {children}
            </div>
        </BlogDataContext.Provider>
    );
};

