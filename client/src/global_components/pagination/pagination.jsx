import React from 'react';

const Pagination = ({ currentPage, totalPages, setPages }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {/* First Button */}
      {currentPage > 1 && (
        <button
          onClick={() => setPages(1)}
          className="bg-blue-500 text-white py-2 px-4 rounded-l"
        >
          &laquo;&laquo;
        </button>
      )}

      {/* Previous Button */}
      {currentPage > 1 && (
        <button
          onClick={() => setPages(currentPage - 1)}
          className="bg-blue-500 text-white py-2 px-4"
        >
          &laquo;
        </button>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPages(pageNumber)}
          className={`${
            pageNumber === currentPage
              ? 'bg-blue-700'
              : 'bg-blue-500'
          } text-white py-2 px-4`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          onClick={() => setPages(currentPage + 1)}
          className="bg-blue-500 text-white py-2 px-4"
        >
          &raquo;
        </button>
      )}

      {/* Last Button */}
      {currentPage < totalPages && (
        <button
          onClick={() => setPages(totalPages)}
          className="bg-blue-500 text-white py-2 px-4 rounded-r"
        >
          &raquo;&raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
