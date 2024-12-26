import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api_url, { emailValidation } from '../../../utils/utils';
import { BlogDataContext } from '../../../context/Blog_Context';
function SignUp() {

    const navigate = useNavigate();
    const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);
  
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("")


    const changeInputHandler = (e) => {
        setFormData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (formData.password != '' && formData.password.length <= 6) {
            setMessage("Password Must Be Greater then 6 digits")
            setTimeout(() => {
                setMessage("")
            }, 2000)
            return;
        }


        if (formData.password !== formData.confirmPassword) {
            setMessage("Password Not Matched...")
            setTimeout(() => {
                setMessage("")
            }, 2000)
        } else {
            if (formData.username == '' || formData.password == '' || formData.email == '') {
                if (formData.username == '') {
                    setMessage("Username Required")
                } else if (formData.email == '') {
                    setMessage("Email Required")
                } else {
                    setMessage("Password Required")
                }
                setTimeout(() => {
                    setMessage("")
                }, 2000)
            } else {


                if (emailValidation(formData.email)) {
                    let data = {
                        "username": formData.username,
                        "password": formData.password,
                        "email": formData.email,
                    }

                    let url = `${api_url}/users/signup`;

                    await fetch(url, {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        }
                    }).then(res => res.json())
                        .then((data) => {

                            // setFormData({
                            //     username: "",
                            //     email: "",
                            //     password: "",
                            //     confirmPassword: "",
                            // });

                            if (data.statusCode != 201) {
                                setTimeout(() => {
                                    setMessage(data.message)
                                }, 3000);
                            } else {
                                localStorage.setItem("token", data.token);
                                navigate('/verification')
                            }
                        }).catch((e) => {
                            console.log(e);
                            localStorage.removeItem("token");
                            navigate('/signin');
                        })
                } else {
                    setMessage("Email is Not Valid");
                }

            }

        }
    };

    return (
        <section>
            <div className={`bg-${theme} text-${fontColor}-600 ${fontWeight} ${fontStyle} p-4 text-center min-h-screen flex justify-center items-center flex-col w-full`}>
                {
                    message !== "" && <span className='absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-2 mt-2 md:mt-0 rounded-xl text-sm'>{message}</span>
                }
                <form action="" method="POST" className={`register_form w-full md:w-1/3 lg:1/3 p-4 rounded-md`} style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}>

                <h1 className='font-bold mb-2'>Sign Up</h1>
                    {/* <p className="form_error_message">This is an Error Message</p> */}

                    <div className="input_container">
                        <input type="text" name='username' placeholder="Username"
                            value={formData?.username} onChange={changeInputHandler} />
                    </div>

                    <div className="input_container">
                        <input type="email" name='email' placeholder="Email" value={formData?.email} onChange={changeInputHandler} />
                    </div>
                    <div className="input_container">
                        <input type="password" name='password' placeholder="Password" value={formData?.password} onChange={changeInputHandler} />
                    </div>
                    <div className="input_container">
                        <input type="password" name='confirmPassword' placeholder="Confirm Password" value={formData?.confirmPassword} onChange={changeInputHandler} />
                    </div>

                    <div className="input_container submit_container" onClick={onSubmit}>
                        <button className=' py-3' type="submit" >Submit</button>
                    </div>

                    <div className="input_container text-left" >
                        <p >Already have an Account ? <Link to={'/signin'}> <span className={`text-${fontColor}-600`}>Sign-In</span></Link></p>
                        <p >Don't have an Account ? <Link to={'/signup'}><span className={`text-${fontColor}-600`}>Sign-Up</span></Link></p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SignUp