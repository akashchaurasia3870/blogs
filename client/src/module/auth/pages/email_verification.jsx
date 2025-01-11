import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api_url from '../../../utils/utils';
import { useTheme } from '../../../context/ThemeContext';

const EmailVerification = () => {

  const {themeValue} = useTheme()
  const [code, setCode] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e, index) => {
  const value = e.target.value;

    if (/^\d?$/.test(value)) { // Allow only digits
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus to next input field
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    try {
      const response = await fetch(`${api_url}/auth/verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: fullCode }),
        credentials: "include",
      });

      if (response.ok) {
        // Redirect to sign-in if successful
        navigate('/signin');
      } else {
        const result = await response.json();
        setError(result.message || 'Invalid verification code.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={`text-${themeValue.fontcolor}-500 font-${themeValue.fontweight} text-${themeValue.fontstyle} p-4 text-center min-h-screen flex justify-center items-center flex-col  w-full`}>
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit} className={`register_form max-w-[25em] md:w-1/2 lg:1/2 p-2 rounded-md flex flex-col items-center justify-center`}>
        <div className={'flex flex-row items-center justify-between'}>
          {code.map((value, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
            className={` p-2 text-${themeValue.fontcolor}-500 border w-10 h-10 inline-block`}
            />
          ))}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <span  className={` px-6 py-2 w-full`}>Submit
        </span>
      </form>
    </div>
  );
};

export default EmailVerification;
