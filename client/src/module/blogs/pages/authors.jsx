import React, { useContext, useEffect, useState } from 'react'
import dummy_data from '../../../assets/data/data.json';
import authors_dummy_data from '../../../assets/data/authos_data.json';
import img5 from '../../../assets/img/img5.jpg'
import { Link } from 'react-router-dom';
import { BlogDataContext } from '../../../context/Blog_Context';
import Filter from '../../../global_components/filter/filter';
import UserCard from '../components/user_card';
import Pagination from '../../../global_components/pagination/pagination';
import api_url from '../../../utils/utils';

function Authors() {

    const { theme,theme2,fontColor,fontStyle,fontWeight } = useContext(BlogDataContext);

    const [layout, setLayout] = useState(true); // true for grid, false for list
    const [loading, setLoading] = useState(true); // true for grid, false for list


    const handleSearch = (searchTerm) => {
        // Handle search logic
        setFilterData(prevState=>({
            ...prevState,
            search:searchTerm
        }))
    };

    const handleSort = (sortOption) => {
        // Handle sort logic
        setFilterData(prevState=>({
            ...prevState,
            option:sortOption
        }))
    };

    const handleLayoutChange = (isGrid) => {
        setLayout(isGrid);
        // Handle layout change logic
    };

    const [filter_data,setFilterData] = useState({
        option:'',
        search:''
    });
  

    let [authorData, setAuthorsData] = useState(null);

    useEffect(()=>{
        const fetchWritersData = async ()=>{
            try {
                let response = await fetch(`${api_url}/users/get_users_info`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":localStorage.getItem("token")
                    },
                    body:JSON.stringify({
                        search:'',
                        limit:10,
                        page:1
                    })
                })
    
                if(response.ok){
                    const data = await response.json();                    
                    setAuthorsData(data.data);
                    setLoading(false)

                }else{
                    console.error("Failed To Fetch Blog Data");
                }
            } catch (error) {
                console.log("Something Went Wrong : ",error);
            }finally{
                setLoading(false)
            }
        }

        fetchWritersData();
    },[setLoading])

    const loadData = ()=>{
         alert("Loading More Authors")
    }


    if(authorData==null){
        return <>
        <h1>Loading</h1>
        </>
    }

    return (
        <section className={`min-h-[100vh] authors w-full bg-${theme} px-2 md:px-4 flex flex-col justify-start items-center text-[9px] sm:text-sm md:text-md lg:text-lg`}>

            <Filter onSearch={handleSearch} onSort={handleSort} onLayoutChange={handleLayoutChange} />
        
            {authorData.length > 0 ?

                <div className={`py-2 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 rounded-lg min-h-[80vh]`}
                style={{backgroundColor:theme=='black'?'#1e293b':'#e2e8f0'}}
                >
                    {authorData.map((author) => {
                        return (

                            <div className='flex flex-row justify-center items-start py-1 rounded-md my-2 mx-2 hover:scale-[1.025] duration-300 ease-in-out'>
                                <UserCard data={author}/> 
                            </div>
                        )
                    })}
                </div>
                :
                <div className="authors_container container">
                    <h2>No blogs Present For Author</h2>
                </div>

            }  

            <button className={`px-3 py-2 bg-gray-600 rounded-lg my-4 font-bold text-white`} onClick={loadData}>Load More</button>

        </section >
    )
}

export default Authors