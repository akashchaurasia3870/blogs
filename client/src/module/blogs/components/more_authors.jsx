const MoreAuthors = () => {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">More Authors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Author items */}
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <img src="author-thumbnail.jpg" alt="Author Name" className="w-16 h-16 rounded-full bg-gray-200 mr-4" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Author Name</h4>
              <p className="text-gray-600">Posts: 50 | Followers: 1200</p>
            </div>
          </div>
          {/* Repeat for more authors */}
        </div>
      </div>
    );
  };
  
  export default MoreAuthors