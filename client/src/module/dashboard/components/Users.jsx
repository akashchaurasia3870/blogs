import React, { useContext, useEffect, useState } from 'react';
import Pagination from '../../../global_components/pagination/pagination';
import image_ref_c from '../../../assets/img/img1.jpg'; 
import DashBlogItem from './DashBlogItem/DashBlogItem';
import { BlogDataContext } from '../../../context/Blog_Context';
import api_url from '../../../utils/utils';

const Users = () => {

    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);

    const [users, setUsers] = useState([]);

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('name');
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');


        // pagination 
        const [pages,setPages] = useState(1);
        const [totalPages,setTotalPages] = useState(0);
        const [totalCount,setTotalCount] = useState(0);
        const [limit,setLimit] = useState(5);
    
    const sortedUsers = [...users].sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc'
                ? a.username.localeCompare(b.username)
                : b.username.localeCompare(a.username);
        }
        return 0;
    });

    const openModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    const getUsers = async () => {        

             fetch(`${api_url}/users/get_users_info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    pages,
                    limit,
                    "sort":sortBy,
                    "sort_order":sortOrder,
                    "search":search
                }),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {                
                setUsers(result.data)
                setTotalCount(result.pagination_data.totalCount)
                setTotalPages(result.pagination_data.totalPages)
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Failed to send message. Please try again later.');
            });
        
    
    };

    useEffect(()=>{
        getUsers()
    },[pages,sortBy,sortOrder,search])




    return (
        <div className="p-0 md:px-4 min-h-[80vh] flex flex-col justify-between pb-4 text-[9px] sm:text-xs md:text-sm lg:text-md mb-16 md:mb-0">
            {/* Navbar */}
            <div>
                <div className={`flex justify-between items-center mb-2`}>
                    <h3 className={`font-bold text-${fontColor}-600 {fontStyle} ${fontWeight}`}>Users</h3>
                    <div className="flex space-x-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={` bg-gray-${theme2} rounded p-1 md:p-2 text-${fontColor}-600`}
                        >
                            <option value="name">Sort by Name</option>
                            {/* Add more sort options if necessary */}
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className={`bg-gray-${theme2} rounded p-1 md:p-2 text-${fontColor}-600`}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                {/* User Content */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedUsers.map((user) => (
                        <div key={user.id} className={`bg-white p-4 rounded-lg shadow-md cursor-pointer text-${fontColor}-600`} 
                        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                        // onClick={() => openModal(user)}
                        >
                            <img src={user.image} alt={user.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="my-2">
                                    <span className="">Email:</span> {user.email}
                                </p>
                                <p className=" mb-2">
                                    <span className="">Phone:</span> {user.phone}
                                </p>
                                <p className=" mb-2">
                                    <span className="">Followers:</span> {user.followers}
                                </p>
                                <p className=" mb-0">
                                    <span className="">Posts:</span> {user.posts}
                                </p>
                        </div>
                    ))}
                </div> */}
            </div>

            <div className="pb-4 min-h-[60vh]">
                {/* <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                </div> */}
                <div className="overflow-x-auto">
                        <table className={`min-w-full leading-normal shadow-md rounded-lg overflow-hidden bg-gray-${theme2}`} 
                        >
                            <thead className={`text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>
                            <tr>
                                <th className="px-2 py-1 md:px-5 md:py-3 border-b-2 text-left  font-semibold uppercase md:tracking-wider">
                                User
                                </th>
                                <th className="px-2 py-1 md:px-5 md:py-3 border-b-2 text-left  font-semibold  uppercase md:tracking-wider">
                                Email
                                </th>
                                <th className="px-2 py-1 md:px-5 md:py-3 border-b-2 text-left  font-semibold  uppercase md:tracking-wider">
                                Date Created
                                </th>
                                <th className="px-2 py-1 md:px-5 md:py-3 border-b-2 text-left  font-semibold  uppercase md:tracking-wider">
                                Verified
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedUsers?.map((item) => (
                                <tr key={item.id} className={`text-${fontColor}-600 ${fontStyle} ${fontWeight}`}
                                >
                                <td className="p-2 md:p-5 flex flex-col justify-center items-center">
                                    <img src={api_url+item.userImage} alt={'img'} className="w-8 h-8 md:w-16 md:h-16 rounded-full object-cover" />
                                    <span className='text-center mt-2'>{item.username}</span>
                                </td>
                                <td className="p-2 md:p-5">
                                    <p className=" whitespace-no-wrap">{item.email}</p>
                                </td>
                                <td className="p-2 md:p-5">
                                    <p className=" whitespace-no-wrap">{item.createdAt}</p>
                                </td>
                                <td className="p-2 md:p-5">
                                    <p className=" whitespace-no-wrap">{item.verified?'True':'False'}</p>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                </div>
            </div>

            {/* Pagination */}
            <Pagination 
                currentPage={pages} 
                totalPages={totalPages} 
                setPages={setPages} 
            />

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4  hover:text-gray-900 text-2xl"
                        >
                            &times;
                        </button>
                        {selectedUser && (
                            <>
                                <h2 className="text-2xl font-bold mb-4">{selectedUser.name}</h2>
                                <img
                                    src={selectedUser.image || image_ref_c}
                                    alt={selectedUser.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <p className="text-gray-500 mb-2">
                                    <span className="font-semibold">Email:</span> {selectedUser.email}
                                </p>
                                <p className="text-gray-500 mb-2">
                                    <span className="font-semibold">Phone:</span> {selectedUser.phone}
                                </p>
                                <p className="text-gray-500 mb-2">
                                    <span className="font-semibold">Followers:</span> {selectedUser.followers}
                                </p>
                                <p className="text-gray-500 mb-4">
                                    <span className="font-semibold">Posts:</span> {selectedUser.posts}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;

