import React, {useEffect, useState } from 'react';
import api_url from '../../../utils/utils';
const AccountPage = () => {
  
    let [image_url, setImageUrl] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {



            const response = await fetch(`${api_url}/users/get_user_info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }); 
            const data = await response.json();

            let data_c = {
                username: data.data?.username,
                email: data.data?.email,
                password: data.data?.password,
                blogsNo: 0,
                phone: data.data?.phone,
                country: data.data?.address.country,
                state: data.data?.address.state,
                city: data.data?.address.city,
                pincode: data.data?.address.pincode,
                userImage: data.data?.userImage,
            }
            setImageUrl(api_url + data_c.userImage);
            setProfileData(data_c);
            setOriginalData(data_c);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Handle input change
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


        const reader = new FileReader();
        reader.onloadend = () => {
            const binaryData = reader.result;

            fetch(`${api_url}/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": file.type,
                },
                body: binaryData,
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {

                    setProfileData({ ...profileData, userImage: data.fileUrl });

                })
                .catch((error) => console.error("Error uploading file:", error));
        };
        reader.readAsArrayBuffer(file);



    };

    // function getNonMatchingKeys(obj1, obj2) {
    //     const result = {};
      
    //     for (const key in obj1) {
    //       // Check if obj1 has the key and it doesn't match with obj2
    //       if (obj1[key] !== obj2[key]) {
    //         result[key] = obj1[key]; // Add the differing value from obj1 to the result
    //       }
    //     }
      
    //     return result;
    // }

    function transformAndCompare(obj1, obj2) {
        const result = {};
        const addressKeys = ["city", "state", "pincode", "country"];
        const address = {};
      
        for (const key in obj1) {
          if (addressKeys.includes(key)) {
            // Compare and add to address if the value differs or is relevant
            if (obj1[key] !== obj2[key]) {
              address[key] = obj1[key];
            }
          } else {
            // Add to result if the value differs
            if (obj1[key] !== obj2[key]) {
              result[key] = obj1[key];
            }
          }
        }
      
        // Only add address to result if it has any differences
        if (Object.keys(address).length > 0) {
          result.address = address;
        }
      
        return result;
      }

    // Update user details
    const updateUserDetails = async () => {
        try {
            let url = api_url + '/users/update_user_info';

            const update_feilds = transformAndCompare(profileData, originalData);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"update_feilds":update_feilds}),
                credentials: "include",
            });
            if (response.ok) {
                let data_c = {
                    username: response.data?.username,
                    email: response.data?.email,
                    phone: response.data?.phone,
                    country: response.data?.address.country,
                    state: response.data?.address.state,
                    city: response.data?.address.city,
                    pincode: response.data?.address.pincode,                    userImage: response.data?.userImage,
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
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen bg-${theme} text-${themeValue.fontcolor}-500 font-${themeValue.fontweight} text-${themeValue.fontstyle} p-4`} 
        >
            <div className="p-0 md:p-6 rounded-lg shadow-md w-full">
                <div className="flex flex-col justify-center items-center ">
                    {/* User Image Section */}
                    <div className="w-full flex flex-col items-center justify-center"             
                    >
                        <img
                            src={image_url}
                            alt=""
                            className="rounded-sm h-32 w-32 object-cover mb-4 shadow-md p-1 bg-gray-500"
                        />
                        {isEditable && (
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="p-2 rounded-lg  text-sm
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-sm file:border-0
                                           file:text-sm file:font-semibold
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-gray-400"
                            />
                        )}
                    </div>

                    {/* Profile Details Section */}
                    <div className="w-full">
                        <form className="space-y-4">
                            <div className="input_container p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                            >
                                <label className="block ">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={profileData.username}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    className={`mt-1 block w-full rounded-md shadow-sm bg-${theme} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                />
                            </div>
                            <div className="input_container p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                            >
                                <label className="block ">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    className={`mt-1 block w-full rounded-md shadow-sm bg-${theme} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                />
                            </div>
                            <div className="input_container p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                            >
                                <label className="block ">Mobile No:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    className={`mt-1 block w-full rounded-md shadow-sm bg-${theme} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                />
                            </div>
                            {/* <div className="input_container p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                            >
                                <label className="block">Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                    className={`mt-1 block w-full rounded-md shadow-sm bg-${theme} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                />
                            </div> */}

                            <div
                            className="address_container p-5 rounded-lg"
                            style={{ backgroundColor: theme === "black" ? "#1e293b" : "#e2e8f0" }}
                            >
                            <h3 className="text-lg font-semibold mb-3">Address</h3>

                            {/* Street */}
                            <div className="input_container p-3 rounded-lg mb-3">
                                <label className="block">City:</label>
                                <input
                                type="text"
                                name="city"
                                value={profileData?.city}
                                onChange={handleChange}
                                disabled={!isEditable}
                                className={`mt-1 block w-full rounded-md shadow-sm bg-${theme} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                />
                            </div>

                            {/* City */}
                            <div className="input_container p-3 rounded-lg mb-3">
                                <label className="block">State:</label>
                                <input
                                type="text"
                                name="state"
                                value={profileData?.state}
                                onChange={handleChange}
                                disabled={!isEditable}
                                className={`mt-1 block w-full rounded-md shadow-sm bg-${theme} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                />
                            </div>

                            {/* Country */}
                            <div className="input_container p-3 rounded-lg mb-3">
                                <label className="block">Country:</label>
                                <input
                                type="text"
                                name="country"
                                value={profileData?.country}
                                onChange={handleChange}
                                disabled={!isEditable}
                                className={`mt-1 block w-full rounded-md shadow-sm bg-${theme} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                />
                            </div>

                            {/* Pincode */}
                            <div className="input_container p-3 rounded-lg">
                                <label className="block">Pincode:</label>
                                <input
                                type="text"
                                name="pincode"
                                value={profileData?.pincode}
                                onChange={handleChange}
                                disabled={!isEditable}
                                className={`mt-1 block w-full rounded-md shadow-sm bg-${theme} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                                />
                            </div>
                            </div>

                            <div className="flex space-x-4 mt-4 input_container p-3 rounded-lg" style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
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
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
