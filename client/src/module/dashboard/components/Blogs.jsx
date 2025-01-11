import React, { useContext, useEffect, useState } from 'react';
import Pagination from '../../../global_components/pagination/pagination';
import { CSVDownload } from "react-csv";
import api_url, { exportPdf } from '../../../utils/utils';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useTheme } from '../../../context/ThemeContext';

const Blogs = () => {

    const {themeValue} = useTheme();
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('name');
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [download, setDownload] = useState(false);
    const [blogs, setBlogsData] = useState([]);
    const [search, setSearch] = useState('');

        
    // pagination 
    const [pages,setPages] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [limit,setLimit] = useState(5);

    
    const sortedBlogs = [...blogs].sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc'
                ? a.caption.localeCompare(b.caption)
                : b.caption.localeCompare(a.caption);
        } else if (sortBy === 'date') {
            return sortOrder === 'asc'
                ? new Date(a.date_created) - new Date(b.date_created)
                : new Date(b.date_created) - new Date(a.date_created);
        } else if (sortBy === 'likes') {
            return sortOrder === 'asc' ? a.likes - b.likes : b.likes - a.likes;
        }
        return 0;
    });

    const openModal = (blog) => {
        setSelectedBlog(blog);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedBlog(null);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDownload = () => {
        setDownload(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else {
            return `${diffDays} days ago`;
        }
    };

    const getBlogs = async ()=>{

        fetch(`${api_url}/blogs/get_blogs_info`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    pages,
                    limit,
                    "sort":sortBy,
                    "sort_order":sortOrder,
                    "search":search
                }),
                credentials: "include",
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {            
            setBlogsData(data.data);
            setTotalCount(data.pagination_data.totalCount)
            setTotalPages(data.pagination_data.totalPages)
        }).catch(error => {
            setTimeout(() => {
                // setIsLoading(false);
            }, 2000)
            console.log(error.message);
            
        });
    }

    useEffect(()=>{
        getBlogs();
    },[pages,sortBy,sortOrder,search])


    return (
        <div className="p-0 md:px-4 min-h-[86vh] flex flex-col justify-between pb-4 text-[9px] sm:text-xs md:text-sm lg:text-md mb-16 md:mb-0">
            <div className='w-full'>
                <div className="flex justify-between items-center mb-2">
                    <h3 className={` text-${themeValue.fontcolor}-600 text-${themeValue.fontstyle} font-${themeValue.fontweight}`}>Blogs</h3>
                    <div className="flex space-x-2">
                        <span className={`p-1 md:p-2 rounded cursor-pointer text-${themeValue.fontcolor}-600 text-${themeValue.fontstyle} font-${themeValue.fontweight} text-center ${themeValue.theme}`} onClick={()=>{
                            exportPdf(blogs)
                        }}>Export PDF</span>

                        <span className={` rounded p-1 md:p-2 cursor-pointer text-${themeValue.fontcolor}-600 text-${themeValue.fontstyle} font-${themeValue.fontweight} ${themeValue.theme}`} onClick={handleDownload}>Export Excel</span>
                         {download && (
                            <CSVDownload
                            data={blogs}
                            onComplete={() => setDownload(false)} // Reset after download
                            />
                        )}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={`rounded p-1 md:p-2 text-${themeValue.fontcolor}-600 text-${themeValue.fontstyle} font-${themeValue.fontweight} `}
                        >
                            <option value="name">Sort by Name</option>
                            <option value="date">Sort by Date</option>
                            <option value="likes">Sort by Likes</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className={`rounded p-1 md:p-2 text-${themeValue.fontcolor}-600 text-${themeValue.fontstyle} font-${themeValue.fontweight}`}
                        >
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                    </div>
                </div>
                <div className="">
                        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                        </div>
                        <div className="overflow-x-auto">
                        <table className={`min-w-full leading-normal shadow-md rounded-lg overflow-hidden ${themeValue.theme}`}
                        
                        >
                            <thead className={`text-${themeValue.fontcolor}-600 text-${themeValue.fontstyle} font-${themeValue.fontweight}`}>
                            <tr>
                                <th className="px-5 py-3 border-b-2 text-left font-semibold uppercase tracking-wider">
                                Image
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left  font-semibold uppercase tracking-wider">
                                Title
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left  font-semibold uppercase tracking-wider">
                                Date Created
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left font-semibold uppercase tracking-wider">
                                Action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {blogs.map((item) => (
                                <tr key={item.id} className={`text-${themeValue.fontcolor}-600 text-${themeValue.fontstyle} font-${themeValue.fontweight}`}
                                >
                                <td className="px-5 py-5">
                                    <img src={api_url+item?.filePaths?.images} alt={'img'} className="w-16 h-16 rounded-md object-cover" />
                                </td>
                                <td className="px-5 py-5">
                                    <p className=" whitespace-no-wrap">{item.caption}</p>
                                </td>
                                <td className="px-5 py-5">
                                    <p className=" whitespace-no-wrap">{new Date(item.date_created).toLocaleDateString('en-GB')}</p>
                                </td>
                                <td className="px-5 py-5">
                                    <p className="whitespace-no-wrap space-x-2 flex items-center justify-start">
                                        <button onClick={()=>{openModal(item)}} className={`bg-gray-500 px-2 rounded text-white`}>View</button>
                                        <button className={`bg-gray-500 px-2 rounded text-white`}>Delete</button>
                                    </p>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
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
                <div className={`font-bold  text-${themeValue.fontcolor}-600 text-${themeValue.fontstyle} font-${themeValue.fontweight} fixed inset-0 flex items-center justify-center text-[9px] sm:text-xs md:text-sm lg:text-md`}>
                <div className={` p-6 rounded-lg shadow-lg w-full max-w-lg relative`}>
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                    >
                        &times;
                    </button>
                    {selectedBlog && (
                        <>
                            <h2 className="font-bold mb-4">{selectedBlog.title}</h2>
                            <img
                                src={selectedBlog.filePaths?.images}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <p className="mb-2">
                                <span className="font-semibold">Ttile:</span> {selectedBlog.caption}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Date:</span>{new Date(selectedBlog.date_created).toLocaleDateString('en-GB')}
                            </p>
                            <p className="mb-2">
                                <span className="font-semibold">Description:</span> {selectedBlog.content}
                            </p>
                            <p className=" mb-2">
                                <span className="font-semibold">Likes:</span> {selectedBlog.likes}
                            </p>
                            <p>{selectedBlog.hashtags}</p>
                        </>
                    )}
                </div>
            </div>
            
            )}
        </div>
    );
};

export default Blogs;
