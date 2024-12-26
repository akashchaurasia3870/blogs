import React, { useContext, useState } from 'react';
import Pagination from '../../../global_components/pagination/pagination';
import { BlogDataContext } from '../../../context/Blog_Context';

const Notifications = () => {
    const {theme,theme2,fontColor,fontStyle,fontWeight} = useContext(BlogDataContext);

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('date');
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Sample notification data
    const notifications = [
        { id: 1, title: 'Password Updated', date: '2024-08-01', description: 'Your password has been successfully updated.', raisedBy: 'Admin' },
        { id: 2, title: 'New Friend Request', date: '2024-08-02', description: 'You have a new friend request.', raisedBy: 'John Doe' },
        { id: 3, title: 'Profile Picture Changed', date: '2024-08-03', description: 'Your profile picture has been changed.', raisedBy: 'Admin' },
        { id: 4, title: 'New Title Awarded', date: '2024-08-04', description: 'You have been awarded a new title.', raisedBy: 'Admin' },
        { id: 5, title: 'Blog Approved', date: '2024-08-05', description: 'Your blog has been approved.', raisedBy: 'Editor' },
        { id: 6, title: 'Comment Reply', date: '2024-08-06', description: 'Your comment received a reply.', raisedBy: 'Jane Smith' },
        { id: 7, title: 'Mentioned in Blog', date: '2024-08-07', description: 'You have been mentioned in a blog.', raisedBy: 'Blog Author' },
        { id: 8, title: 'Account Upgraded', date: '2024-08-08', description: 'Your account has been upgraded.', raisedBy: 'Admin' },
        { id: 9, title: 'Subscription Renewed', date: '2024-08-09', description: 'Your subscription has been renewed.', raisedBy: 'Admin' },
        { id: 10, title: 'New Updates Available', date: '2024-08-10', description: 'New updates are available.', raisedBy: 'System' },
        { id: 11, title: 'New Follower', date: '2024-08-11', description: 'You have a new follower.', raisedBy: 'User' },
        { id: 12, title: 'Profile Settings Saved', date: '2024-08-12', description: 'Your profile settings have been saved.', raisedBy: 'Admin' },
        { id: 13, title: 'New Message', date: '2024-08-13', description: 'You have received a new message.', raisedBy: 'Alice Brown' },
        { id: 14, title: 'Password Reset Request', date: '2024-08-14', description: 'A password reset request has been initiated.', raisedBy: 'System' },
        { id: 15, title: 'Account Verification', date: '2024-08-15', description: 'Your account has been verified successfully.', raisedBy: 'Admin' },
        { id: 16, title: 'New Comment on Blog', date: '2024-08-16', description: 'Your blog received a new comment.', raisedBy: 'User' },
        { id: 17, title: 'Profile Update', date: '2024-08-17', description: 'Your profile has been updated.', raisedBy: 'Admin' },
        { id: 18, title: 'New Blog Post', date: '2024-08-18', description: 'A new blog post has been published.', raisedBy: 'Author' },
        { id: 19, title: 'Event Reminder', date: '2024-08-19', description: 'Reminder for upcoming event.', raisedBy: 'System' },
        { id: 20, title: 'System Maintenance', date: '2024-08-20', description: 'Scheduled system maintenance alert.', raisedBy: 'Admin' }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Fetch data for the new page or update the displayed content
    };

    // Sort and paginate the notifications
    const sortedNotifications = [...notifications].sort((a, b) => {
        if (sortBy === 'date') {
            return sortOrder === 'asc'
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        }
        return 0;
    });

    

    const openModal = (notification) => {
        setSelectedNotification(notification);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedNotification(null);
    };

    return (
        <div className="p-6">
            {/* Navbar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold  text-${fontColor}-600 ${fontStyle} ${fontWeight}`}>Mails</h1>
                <div className="flex space-x-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`border border-gray-300 rounded p-2 bg-${theme} text-${fontColor}-600 ${fontStyle} ${fontWeight} `}
                    >
                        <option value="date">Sort by Date</option>
                    </select>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className={`border border-gray-300 rounded p-2 bg-${theme} text-${fontColor}-600 ${fontStyle} ${fontWeight} `}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            {/* Notification Content */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={` text-${fontColor}-600 ${fontWeight} ${fontStyle} shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg`}
                        // onClick={() => openModal(notification)} 
                        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                    >
                    
                        <h2 className="text-2xl mb-4">{notification.title}</h2>
                                <p className=" mb-2">Date: {notification.date}</p>
                                <p className=" mb-2">Raised By: {notification.raisedBy}</p>
                                <p>{notification.description}</p>
                    </div>
                ))}
            </div> */}

                <div className="">
                    <div className="pb-4">
                        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                        </div>
                        <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden" 
                        style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                        >
                            <thead >
                            <tr>
                                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Sender
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Subject
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Content
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date Created
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredNotifications?.map((item) => (
                                <tr key={item.id} 
                                >
                                <td className="px-5 py-5 text-sm flex flex-col justify-center items-center">
                                    <img src={api_url+item.user_details.userImage} alt={'img'} className="w-20 h-20 rounded-md object-cover" />
                                    <span>{item.user_details.username}</span>
                                </td>
                                <td className="px-5 py-5 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{item.subject}</p>
                                </td>
                                <td className="px-5 py-5 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{item.content}</p>
                                </td>
                                <td className="px-5 py-5 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{item.date_created}</p>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

            {/* Pagination */}
            <Pagination className=''
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
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
                        {selectedNotification && (
                            <>
                                <h2 className="text-2xl font-bold mb-4">{selectedNotification.title}</h2>
                                <p className="text-gray-500 mb-2">Date: {selectedNotification.date}</p>
                                <p className="text-gray-500 mb-2">Raised By: {selectedNotification.raisedBy}</p>
                                <p>{selectedNotification.description}</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
