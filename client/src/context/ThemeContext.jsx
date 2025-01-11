import React ,{createContext,useContext,useEffect,useState} from 'react';
import api_url from '../utils/utils';

export const ThemeDataContext = createContext();

export const useTheme = ()=> useContext(ThemeDataContext);

export const ThemeDataProvider = ({children})=>{
    
    const [themeValue, setThemeValue] = useState({
        theme: "bg-white",
        bgvalue:'bg-gray-50',
        bgvalue1:'bg-gray-100',
        bgvalue2:'bg-gray-200',
        bgvalue3:'bg-gray-300',
        bgvalue4:'bg-gray-400',
        bgvalue5:'bg-gray-500',
        bgvalue6:'bg-gray-600',
        bgvalue7:'bg-gray-700',
        bgvalue8:'bg-gray-800',
        fontsize: "sm",
        fontweight: "bold",
        fontcolor: "blue",
        fontstyle: "normal",
    });

    const updateThemeValue = (updates) => {
        setThemeValue((prevTheme) => ({
          ...prevTheme,
          ...updates,
        }));
      };

    const refreshTheme = async ()=>{
        let url = api_url+'/theme/get' ;
         await fetch(url,{
            method:"POST",
            headers :{
                'Content-Type':'application/json',
            },
            body : JSON.stringify(),
            credentials: "include",
         }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setThemeValue(data.theme);
        })
        .catch(error => {
            console.log(error.message);  
        });
    }

    const ThemeContextValue = {
        themeValue,updateThemeValue,refreshTheme
    }

    return <ThemeDataContext.Provider value={ThemeContextValue}>
        <div className={`${themeValue.theme} ${themeValue.bgvalue} ${themeValue.fontsize} ${themeValue.fontcolor} ${themeValue.fontstyle} ${themeValue.fontweight}`}>
            {children}
        </div>
    </ThemeDataContext.Provider>

}

