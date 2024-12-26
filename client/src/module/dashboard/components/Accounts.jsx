import React, { useContext, useEffect, useState } from 'react';
import { BlogDataContext } from '../../../context/Blog_Context';
import api_url from '../../../utils/utils';
const AccountPage = () => {
    // Initial user details
    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);
    let [isLoading, setIsLoading] = useState(true);


    const [userDetails, setUserDetails] = useState({
        username: 'admin',
        email: 'admin@example.com',
        phone: '123-456-7890',
        address: '123 Admin St, Admin City',
        profilePic: '', // URL or file path to profile picture
        password: ''
    });

    let [image_url, setImageUrl] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [originalData, setOriginalData] = useState({});

    const fetchUserDetails = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${api_url}/users/get_user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
            }); // Replace with actual API endpoint
            const data = await response.json();

            let data_c = {
                username: data.data?.username,
                email: data.data?.email,
                password: data.data?.password,
                blogsNo: 0,
                mobileNo: data.data?.phone,
                address: data.data?.address.country,
                userImage: data.data?.userImage,
            }
            setImageUrl(api_url + data_c.userImage);
            setProfileData(data_c);
            setOriginalData(data_c);
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally{
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // setProfileData({ ...profileData, userImage: reader.result });
                setImageUrl(reader.result)
            };
            reader.readAsDataURL(file);


            handleFileUpload(file, "image");
        }
    };

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditable(!isEditable);
        if (!isEditable) {
            setOriginalData(profileData); // Save current data before editing
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setImageUrl(api_url + originalData.userImage)
        setProfileData(originalData); // Revert to original data
        setIsEditable(false);
    };

    const handleFileUpload = (file, type) => {

        setIsLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            const binaryData = reader.result;

            fetch(`${api_url}/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": file.type,
                    "Authorization": localStorage.getItem("token"),
                },
                body: binaryData,
            })
                .then((response) => response.json())
                .then((data) => {

                    setProfileData({ ...profileData, userImage: data.fileUrl });

                })
                .catch((error) => console.error("Error uploading file:", error)).finally(()=>{
                        setIsLoading(false);
                });
        };
        reader.readAsArrayBuffer(file);



    };

    // Update user details
    const updateUserDetails = async () => {
        try {
            setIsLoading(true);

            let url = api_url + '/users/update_user';

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify(profileData),
            });
            if (response.ok) {
                let data_c = {
                    username: response.data?.username,
                    email: response.data?.email,
                    password: response.data?.password,
                    blogsNo: 0,
                    mobileNo: response.data?.phone,
                    address: response.data?.address.country,
                    userImage: response.data?.userImage,
                }
                setProfileData(data_c);
                setOriginalData(data_c);
                setImageUrl(api_url + originalData.userImage)
                setIsEditable(false);
            } else {
                console.error("Failed to update user details.");
            }
        } catch (error) {
            console.error("Error updating user details:", error);
        } finally{
                setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (

        <>
        <div className="p-6 max-w-screen-lg mx-auto text-[9px] sm:text-xs md:text-sm lg:text-md mb-12 md:mb-0">
            <form className="space-y-6" 
            >
                {/* Profile Picture */}
                <div className={`flex items-center justify-center space-x-4 mb-6 bg-${theme} cursor-pointer text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>
                    <div className="relative w-32 h-32">
                        <img
                            src={image_url}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        {isEditable && 
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={!isEditable}
                                    className="absolute bottom-0 right-0 opacity-0"
                                    id="profilePic"
                                />
                                <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer">
                                    Change
                                </label>
                            </>
                        }
                    </div>
                    {/* <div>
                        <h2 className="">Profile Picture</h2>
                    </div> */}
                </div>

                {/* Username */}
                <div  className={`flex flex-col mb-6 bg-${theme} cursor-pointer text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>
                    <label htmlFor="username" className=" mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        disabled={!isEditable}
                        value={profileData.username}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>

                {/* Email */}
                <div className={`flex flex-col mb-6 bg-${theme} cursor-pointer text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>
                    <label htmlFor="email" className=" mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        disabled={!isEditable}
                        value={profileData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>

                {/* Phone */}
                <div className={`flex flex-col mb-6 bg-${theme} cursor-pointer text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>
                    <label htmlFor="phone" className=" mb-2">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        disabled={!isEditable}
                        value={profileData.mobileNo}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>

                {/* Address */}
                <div className={`flex flex-col mb-6 bg-${theme} cursor-pointer text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>
                    <label htmlFor="address" className=" mb-2">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        disabled={!isEditable}
                        value={profileData.address}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4 mt-4 p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                            >
                                {isEditable ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={updateUserDetails}
                                            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={toggleEdit}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                )}
                </div>
            </form>
        </div>
        </>
    );
};

export default AccountPage;
