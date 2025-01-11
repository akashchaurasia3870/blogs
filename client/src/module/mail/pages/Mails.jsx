import React, {useEffect, useState } from 'react';
import MailItem from '../component/MailItem';
import MailFilter from '../component/MailFilter';
import Pagination from '../../../global_components/pagination/pagination';
import ReplyPopup from '../component/ReplyPopup';
import MassEmailPopup from '../component/MassEmailPopup';
import api_url from '../../../utils/utils';
import { useTheme } from '../../../context/ThemeContext';

const Mails = () => {

    const [mails, setMails] = useState([]);
    const {themeValue} = useTheme();
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('date');
    const [search, setSearch] = useState('');
    const [selectedMail, setSelectedMail] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [massEmailOpen, setMassEmailOpen] = useState(false);

    
    // pagination 
    const [pages,setPages] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [limit,setLimit] = useState(5);

    const mails_cstm = [
        {
            id: 1,
            username: "John Doe",
            userImage: "https://randomuser.me/api/portraits/men/1.jpg",
            subject: "Meeting Reminder",
            date_created: "2024-08-25T09:30:00Z",
            content: "Just a reminder about our meeting tomorrow at 10 AM.",
        },
        {
            id: 2,
            username: "Jane Smith",
            userImage: "https://randomuser.me/api/portraits/women/2.jpg",
            subject: "Project Update",
            date_created: "2024-08-24T14:15:00Z",
            content: "The project is on track. Please review the attached documents.",
        },
        {
            id: 3,
            username: "Bob Johnson",
            userImage: "https://randomuser.me/api/portraits/men/3.jpg",
            subject: "Lunch Plans",
            date_created: "2024-08-23T11:45:00Z",
            content: "Are you free for lunch tomorrow? Let's discuss the new proposal.",
        },
        {
            id: 4,
            username: "Alice Williams",
            userImage: "https://randomuser.me/api/portraits/women/4.jpg",
            subject: "Invoice #12345",
            date_created: "2024-08-22T16:00:00Z",
            content: "Please find the attached invoice for your recent purchase.",
        },
        {
            id: 5,
            username: "Charlie Brown",
            userImage: "https://randomuser.me/api/portraits/men/5.jpg",
            subject: "Team Outing",
            date_created: "2024-08-21T08:30:00Z",
            content: "Looking forward to our team outing this weekend!",
        },
        {
            id: 6,
            username: "Emily Davis",
            userImage: "https://randomuser.me/api/portraits/women/6.jpg",
            subject: "Follow Up",
            date_created: "2024-08-20T12:00:00Z",
            content: "Just following up on the email I sent last week. Please respond at your earliest convenience.",
        },
        {
            id: 7,
            username: "Frank Miller",
            userImage: "https://randomuser.me/api/portraits/men/7.jpg",
            subject: "Client Feedback",
            date_created: "2024-08-19T14:45:00Z",
            content: "The client provided feedback on the recent project. Let's discuss how to proceed.",
        },
        {
            id: 8,
            username: "Grace Lee",
            userImage: "https://randomuser.me/api/portraits/women/8.jpg",
            subject: "Vacation Request",
            date_created: "2024-08-18T09:15:00Z",
            content: "I would like to request date_created off for vacation from September 1st to 10th.",
        },
        {
            id: 9,
            username: "Henry Wilson",
            userImage: "https://randomuser.me/api/portraits/men/9.jpg",
            subject: "Annual Report",
            date_created: "2024-08-17T17:30:00Z",
            content: "The annual report has been finalized. Please review and provide your feedback.",
        },
        {
            id: 10,
            username: "Isabella Martinez",
            userImage: "https://randomuser.me/api/portraits/women/10.jpg",
            subject: "Event Invitation",
            date_created: "2024-08-16T10:00:00Z",
            content: "You're invited to our upcoming event. Please RSVP by Friday.",
        },
        {
            id: 11,
            username: "Jack Robinson",
            userImage: "https://randomuser.me/api/portraits/men/11.jpg",
            subject: "Technical Support",
            date_created: "2024-08-15T13:30:00Z",
            content: "We're experiencing some technical issues. Could you please look into it?",
        },
        {
            id: 12,
            username: "Katherine Clark",
            userImage: "https://randomuser.me/api/portraits/women/12.jpg",
            subject: "New Hire Introduction",
            date_created: "2024-08-14T11:45:00Z",
            content: "Please welcome our new team member. They will be joining us next week.",
        },
        {
            id: 13,
            username: "Liam Anderson",
            userImage: "https://randomuser.me/api/portraits/men/13.jpg",
            subject: "Website Redesign",
            date_created: "2024-08-13T15:00:00Z",
            content: "We're planning to redesign the website. Let's schedule a meeting to discuss the details.",
        },
        {
            id: 14,
            username: "Mia Thompson",
            userImage: "https://randomuser.me/api/portraits/women/14.jpg",
            subject: "Thank You!",
            date_created: "2024-08-12T09:00:00Z",
            content: "Thank you for your assistance with the project. Your help was greatly appreciated!",
        },
        {
            id: 15,
            username: "Noah Garcia",
            userImage: "https://randomuser.me/api/portraits/men/15.jpg",
            subject: "Weekly Update",
            date_created: "2024-08-11T12:30:00Z",
            content: "Here's the weekly update on our ongoing projects. Let me know if you have any questions.",
        },
    ];
        

    const handleReply = (mail) => {
        setSelectedMail(mail);
        setModalOpen(true);
    };

    const handleSend = async (content) => {
    
        const mailData = {
            content: content.message,
            subject:selectedMail.subject,
            receiver_user_id:selectedMail.user_id,
            email:selectedMail.email,
        };        
    
        try {
            // API endpoint to send mail
            const response = await fetch(`${api_url}/mail/send`, {
                method: 'POST', // Assuming you are sending a POST request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mailData),
                credentials: "include",
            });
    
            if (!response.ok) {
                // Handle errors if the request was not successful
                throw new Error('Failed to send mail');
            }
    
            // Parse the response if needed
            const result = await response.json();
    
            // Handle successful mail sending (e.g., show a notification)
    
            // Close the modal
            setModalOpen(false);
        } catch (error) {
            // Handle errors (e.g., show an error message to the user)
            console.error('Error sending mail:', error);
        }
    };

    

    const handleMassEmailSend = (subject, content) => {
        // Implement mass email send functionality here
        setMassEmailOpen(false);
    };

    const filteredMails = mails
    .filter((mail) =>
        mail.subject.toLowerCase().includes(search.toLowerCase()) ||
        mail.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
        if (sortBy === 'date') {
            return sortOrder === 'asc'
                ? new Date(a.date_created) - new Date(b.date_created)
                : new Date(b.date_created) - new Date(a.date_created);
        }
        return 0;
    });

    const getMails = async () => {        

                fetch(`${api_url}/admin/get_mails_info`, {
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
                setMails(result.data)
                setTotalCount(result.pagination_data.totalCount)
                setTotalPages(result.pagination_data.totalPages)
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Failed to send message. Please try again later.');
            });
        
    
    };

        
    useEffect(()=>{
        getMails()
    },[pages,sortBy,sortOrder,search])
    

    return (
        <div className={`text-${themeValue.fontcolor}-500 font-${themeValue.fontweight} text-${themeValue.fontstyle} rounded-lg text-[9px] sm:text-xs md:text-sm lg:text-md mb-12 md:mb-0`}>
            <button 
                onClick={() => setMassEmailOpen(true)}
                className={`${themeValue.theme} px-4 py-2 rounded mb-6`}>
            
                Mass Email
            </button>
            <MailFilter 
                sortBy={sortBy} 
                setSortBy={setSortBy} 
                sortOrder={sortOrder} 
                setSortOrder={setSortOrder} 
                search={search} 
                setSearch={setSearch} 
            />
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMails.map((mail) => (
                    <MailItem 
                        key={mail.id} 
                        mail={mail} 
                        onReply={handleReply} 
                    />
                ))}

            </div> */}
            <div className="">
                    <div className="">
                        {/* <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                        </div> */}
                        <div className="overflow-x-auto">
                        <table className={`w-full leading-normal shadow-md rounded-lg overflow-hidden ${themeValue.theme}`}>
                            <thead >
                            <tr>
                                <th className="px-5 py-3 border-b-2 text-left  font-semibold  uppercase tracking-wider">
                                Sender
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left  font-semibold  uppercase tracking-wider">
                                Subject
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left  font-semibold  uppercase tracking-wider">
                                Content
                                </th>
                                <th className="px-5 py-3 border-b-2 text-left  font-semibold  uppercase tracking-wider">
                                Date Created
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredMails?.map((item) => (
                                <tr key={item.id} 
                                >
                                <td className="px-5 py-3 flex flex-col justify-center items-center">
                                    <img src={
                                        // api_url+
                                        item.userImage} alt={'img'} className="w-16 h-16 rounded-md object-cover" />
                                    <span>{item.username}</span>
                                </td>
                                <td className="px-5 py-3 ">
                                    <p className=" whitespace-no-wrap">{item.subject}</p>
                                </td>
                                <td className="px-5 py-3">
                                    <p className=" whitespace-no-wrap">{item.content}</p>
                                </td>
                                <td className="px-5 py-3">
                                    <p className=" whitespace-no-wrap">{item.date_created}</p>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
            </div>

            <Pagination 
                currentPage={pages} 
                totalPages={totalPages} 
                setPages={setPages} 
            />
            {modalOpen && (
                <ReplyPopup 
                    mail={selectedMail} 
                    onClose={() => setModalOpen(false)} 
                    onSend={handleSend} 
                />
            )}
            {massEmailOpen && (
                <MassEmailPopup 
                    onClose={() => setMassEmailOpen(false)} 
                    onSend={handleMassEmailSend} 
                />
            )}
        </div>
    );
};

export default Mails;
