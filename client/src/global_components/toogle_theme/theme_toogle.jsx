import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme} from "../../context/ThemeContext";

const ToggleTheme = () => {
  const { themeValue,updateThemeValue } = useTheme();

  const handleToggle = () => {
    if(themeValue.theme=='bg-white'){   
        updateThemeValue({
            theme: "bg-black",
            bgvalue2:'bg-gray-900',
        });
    }else{    
        updateThemeValue({
            theme: "bg-white",
            bgvalue2:'bg-gray-200',
        });
    }
  };

  return (
    <button onClick={handleToggle} className="text-2xl mt-1">
      {themeValue.theme === "bg-black" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ToggleTheme;
