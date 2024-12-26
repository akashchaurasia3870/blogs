import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section className='h-[70vh] w-[100vw] flex flex-col items-center justify-center bg-gray-200'>
            <Link to='/' className='btn-prim m-2 p-2 rounded-md'>Go Back Home</Link>
            <h2>Page Not Found</h2>
        </section>
    )
}

export default NotFound