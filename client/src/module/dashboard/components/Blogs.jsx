import React, { useContext, useEffect, useState } from 'react';
import Pagination from '../../../global_components/pagination/pagination';
import image_ref_c from '../../../assets/img/img1.jpg'
import DashBlogItem from './DashBlogItem/DashBlogItem';
import { BlogDataContext } from '../../../context/Blog_Context';
import { CSVDownload } from "react-csv";
import api_url, { exportPdf } from '../../../utils/utils';



const Blogs = () => {

    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);
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

        fetch(`${api_url}/blogs/get_blogs`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    pages,
                    limit,
                    "sort":sortBy,
                    "sort_order":sortOrder,
                    "search":search
                }),

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
                    <h3 className={`font-bold  text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>Blogs</h3>
                    <div className="flex space-x-2">
                        <span className={`p-1 md:p-2 rounded bg-gray-${theme2} cursor-pointer text-${fontColor}-600 ${fontStyle} ${fontWeight} text-center `} onClick={()=>{
                            exportPdf(blogs)
                        }}>Export PDF</span>

                        <span className={` rounded p-1 md:p-2 bg-gray-${theme2} cursor-pointer text-${fontColor}-600 ${fontStyle} ${fontWeight} `} onClick={handleDownload}>Export Excel</span>
                         {download && (
                            <CSVDownload
                            data={blogs}
                            onComplete={() => setDownload(false)} // Reset after download
                            />
                        )}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={`rounded p-1 md:p-2 bg-gray-${theme2} text-${fontColor}-600 ${fontStyle} ${fontWeight} `}
                        >
                            <option value="name">Sort by Name</option>
                            <option value="date">Sort by Date</option>
                            <option value="likes">Sort by Likes</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className={`rounded p-1 md:p-2 bg-gray-${theme2} text-${fontColor}-600 ${fontStyle} ${fontWeight}`}
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
                        <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden" 
                        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                        >
                            <thead className={`text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>
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
                                Likes
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {blogs.map((item) => (
                                <tr key={item.id} className={`text-${fontColor}-600 ${fontStyle} ${fontWeight}`}
                                >
                                <td className="px-5 py-5">
                                    <img src={api_url+item.filePaths.images} alt={'img'} className="w-16 h-16 rounded-md object-cover" />
                                </td>
                                <td className="px-5 py-5">
                                    <p className=" whitespace-no-wrap">{item.caption}</p>
                                </td>
                                <td className="px-5 py-5">
                                    <p className=" whitespace-no-wrap">{item.date_created}</p>
                                </td>
                                <td className="px-5 py-5">
                                    <p className=" whitespace-no-wrap">{item.likes}</p>
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                    >
                        &times;
                    </button>
                    {selectedBlog && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
                            <img
                                src={image_ref_c || "https://via.placeholder.com/150"}
                                alt={selectedBlog.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <p className="text-gray-500 mb-2">
                                <span className="font-semibold">Author:</span> {selectedBlog.author || "John Doe"}
                            </p>
                            <p className="text-gray-500 mb-2">
                                <span className="font-semibold">Date:</span> {selectedBlog.date || "2024-08-25"}
                            </p>
                            <p className="text-gray-500 mb-2">
                                <span className="font-semibold">Likes:</span> {selectedBlog.likes || 0}
                            </p>
                            <p className="text-gray-500 mb-4">
                                <span className="font-semibold">Views:</span> {selectedBlog.views || 0}
                            </p>
                            <p>{selectedBlog.content || "This is the blog content."}</p>
                        </>
                    )}
                </div>
            </div>
            
            )}
        </div>
    );
};

export default Blogs;
