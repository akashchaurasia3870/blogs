import React from 'react'

const Hashtag = ({ hashtag }) => {
    return (
        <span className="hashtag mr-2 bg-blue-500 text-white px-2 rounded-lg cursor-pointer">
            {hashtag}
        </span >
    )
}

export default Hashtag