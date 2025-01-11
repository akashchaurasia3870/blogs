import React, { useContext, useEffect, useState } from 'react';
import NotificationItem from '../component/NotificationItem';
import NotificationFilter from '../component/NotificationFilter';
import Pagination from '../../../global_components/pagination/pagination';
import NotificationPopup from '../component/NotificationPopup';
import MassNotificationPopup from '../component/MassNotificationPopup';
import api_url from '../../../utils/utils';
import { useTheme } from '../../../context/ThemeContext';

const Notification = () => {

    const {themeValue} = useTheme();
    const [notifications, setNotifications] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('date_entered');
    const [search, setSearch] = useState('');
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [massNotificationOpen, setMassNotificationOpen] = useState(false);

    // pagination 
    const [pages,setPages] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [limit,setLimit] = useState(5);


    const getNotification = async () => {        

             fetch(`${api_url}/admin/get_notifications_info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pages,
                    limit,
                    "sort":sortBy,
                    "sort_order":sortOrder,
                    "search":search
                }),
                credentials: "include",
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {                
                setNotifications(result.data)
                setTotalCount(result.pagination_data.totalItems)
                setTotalPages(result.pagination_data.totalPages)
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Failed to send message. Please try again later.');
            });
        
    
    };
        

    const handleNotification = (notification) => {
        setSelectedNotification(notification);
        setModalOpen(true);
    };

    const handleSend = (content) => {
        // Implement send notification functionality here
        setModalOpen(false);
    };

    const handleMassNotificationSend = (subject, content) => {
        // Implement mass notification send functionality here
        setMassNotificationOpen(false);
    };

    const filteredNotifications = notifications
        ?.filter((notification) =>
            notification.subject.toLowerCase().includes(search.toLowerCase()) ||
            notification.user_details.username.toLowerCase().includes(search.toLowerCase())
        )
        ?.sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'asc'
                    ? new Date(a.date_created) - new Date(b.date_created)
                    : new Date(b.date_created) - new Date(a.date_created);
            }
            return 0;
        });

    useEffect(()=>{
        getNotification()
    },[pages,sortBy,sortOrder,search])

    return (
        <div className={`text-${themeValue.fontcolor}-500 font-${themeValue.fontweight} text-${themeValue.fontstyle} rounded-lg text-[9px] sm:text-xs md:text-sm lg:text-md mb-16 md:mb-0`}>
            <button 
                onClick={() => setMassNotificationOpen(true)}
                className={`px-4 py-2 rounded mb-6 ${themeValue.theme}`}>
                Mass Notification
            </button>
            <NotificationFilter 
                sortBy={sortBy} 
                setSortBy={setSortBy} 
                sortOrder={sortOrder} 
                setSortOrder={setSortOrder} 
                search={search} 
                setSearch={setSearch} 
            />
            <div className="">
                {/* <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                </div> */}
                <div className="overflow-x-auto">
                <table className={`min-w-full leading-normal shadow-md rounded-lg overflow-hidden ${themeValue.theme}`} 
                >
                    <thead >
                    <tr>
                        <th className="px-5 py-3 border-b-2 text-left font-semibold  uppercase tracking-wider">
                        Sender
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left font-semibold  uppercase tracking-wider">
                        Subject
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left font-semibold  uppercase tracking-wider">
                        Content
                        </th>
                        <th className="px-5 py-3 border-b-2 text-left font-semibold  uppercase tracking-wider">
                        Date Created
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredNotifications?.map((item) => (
                        <tr key={item.id} 
                        >
                        <td className="px-5 py-5 flex flex-col justify-center items-center">
                            <img src={api_url+item?.user_details?.userImage} alt={'img'} className="w-16 h-16 rounded-md object-cover" />
                            <span>{item?.user_details?.username}</span>
                        </td>
                        <td className="px-5 py-5">
                            <p className="whitespace-no-wrap">{item.subject}</p>
                        </td>
                        <td className="px-5 py-5">
                            <p className=" whitespace-no-wrap">{item.content}</p>
                        </td>
                        <td className="px-5 py-5">
                            <p className=" whitespace-no-wrap">{item.date_created}</p>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>            
            <Pagination 
                currentPage={pages} 
                totalPages={totalPages} 
                setPages={setPages} 
            />
            {modalOpen && (
                <NotificationPopup 
                    notification={selectedNotification} 
                    onClose={() => setModalOpen(false)} 
                    onSend={handleSend} 
                />
            )}
            {massNotificationOpen && (
                <MassNotificationPopup 
                    onClose={() => setMassNotificationOpen(false)} 
                    onSend={handleMassNotificationSend} 
                />
            )}
        </div>
    );
};

export default Notification;
