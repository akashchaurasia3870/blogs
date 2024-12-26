import React, { useState } from 'react';

// Sample FAQ data
const faqs = [
    { id: 1, question: 'How do I reset my password?', answer: 'You can reset your password by going to the settings page and clicking on "Reset Password".' },
    { id: 2, question: 'Where can I find my account settings?', answer: 'Your account settings can be found under the "Profile" tab in the main menu.' },
    { id: 3, question: 'How do I contact support?', answer: 'You can contact support via the "Help" section or by emailing support@example.com.' },
    { id: 4, question: 'What is the maximum file size for uploads?', answer: 'The maximum file size for uploads is 10 MB.' },
    { id: 5, question: 'How can I delete my account?', answer: 'You can delete your account by going to the "Account Settings" page and selecting "Delete Account".' },
    { id: 6, question: 'How do I update my email address?', answer: 'To update your email address, go to the "Profile" section and click on "Update Email".' },
    { id: 7, question: 'Can I change my username?', answer: 'Yes, you can change your username in the "Profile" settings.' },
    { id: 8, question: 'How do I enable two-factor authentication?', answer: 'Two-factor authentication can be enabled in the "Security" settings under "Two-Factor Authentication".' },
    { id: 9, question: 'Where can I find the privacy policy?', answer: 'The privacy policy is available in the footer of every page under "Privacy Policy".' },
    { id: 10, question: 'How do I subscribe to the newsletter?', answer: 'You can subscribe to the newsletter by entering your email address in the "Subscribe" section on the homepage.' },
    { id: 11, question: 'What is the refund policy?', answer: 'Our refund policy can be found in the "Refund Policy" section of the website.' },
    { id: 12, question: 'How do I change my password?', answer: 'You can change your password in the "Account Settings" under "Change Password".' },
];

const FAQ = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('question');
    const [currentPage, setCurrentPage] = useState(1);

    // Sort and paginate the FAQs
    const sortedFAQs = [...faqs].sort((a, b) => {
        if (sortBy === 'question') {
            return sortOrder === 'asc'
                ? a.question.localeCompare(b.question)
                : b.question.localeCompare(a.question);
        }
        return 0;
    });

    const faqsPerPage = 9;
    const totalPages = Math.ceil(sortedFAQs.length / faqsPerPage);
    const paginatedFAQs = sortedFAQs.slice(
        (currentPage - 1) * faqsPerPage,
        currentPage * faqsPerPage
    );

    return (
        <div className="p-6">
            {/* Navbar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">FAQ</h1>
                <div className="flex space-x-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    >
                        <option value="question">Sort by Question</option>
                    </select>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border border-gray-300 rounded p-2"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="space-y-6">
                {paginatedFAQs.map((faq) => (
                    <div key={faq.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-2">{faq.question}</h2>
                        <p className="text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white py-2 px-4 rounded-l disabled:opacity-50"
                >
                    Previous
                </button>
                <div className="bg-blue-500 text-white py-2 px-4">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white py-2 px-4 rounded-r disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FAQ;
