import React, { useContext, useEffect, useState } from 'react'

import ViewBlogs from '../../module/blogs/pages/view_blogs'
import Filter from '../filter/filter'
import Pagination from '../pagination/pagination'
import HomeSlider from '../home_slider/home_slider'
import CategorySlider from '../../global_components/category_slider/category_slider'
import api_url from '../../utils/utils'
import { BlogDataContext } from '../../context/Blog_Context'
import { useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading'
function Home() {

    let [isLoading, setIsLoading] = useState(true);

    const slides = [
        {
            title: "One Piece",
            description: "Join Luffy and the Straw Hat Pirates on their epic adventure.",
            image: "", // No image, will show theme color
            theme: "#471069",
        },
        {
            title: "Naruto",
            description: "Follow Naruto Uzumaki on his quest to become Hokage.",
            image: "", // Image present, will show image
            theme: "#ffb88e",
        },
        {
            title: "Dragon Ball Z",
            description: "Watch Goku and his friends defend Earth from powerful foes.",
            image: "",
            theme: "#f74c06",
        },
        {
            title: "Attack on Titan",
            description: "Humanity fights for survival against the fearsome Titans.",
            image: "",
            theme: "#7c65a9",
        },
        {
            title: "My Hero Academia",
            description: "In a world of heroes, young Midoriya aims to be the best.",
            image: "",
            theme: "#9bafd9",
        },
        {
            title: "Fullmetal Alchemist",
            description: "The Elric brothers embark on a journey to restore their bodies.",
            image: "",
            theme: "#bf0fff",
        },
        {
            title: "Demon Slayer",
            description: "Tanjiro battles demons to save his sister and avenge his family.",
            image: "",
            theme: "#0061ff",
        },
    ];

    let navigate = useNavigate();

    let {user_data, setUserData,blog_data, setBlogData,
         authors_data, setAuthorsData,similier_data, 
         setSimilierData,trainding_data, setTrandingData,setFontStyle,setFontWeight,setTheme,setTheme2,setBackgroundImage,setFontSize,theme,theme2,fontColor,fontStyle,fontWeight}  = useContext(BlogDataContext);

    const [blogs_data, setBlogsData] = useState([]);
    const [layout, setLayout] = useState(true); // true for grid, false for list

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
    
    useEffect(() => {

        let url = `${api_url}/blogs/get`;

        fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify(filter_data),

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
            setSimilierData(data.data_c.category_blog);
            setTrandingData(data.data_c.trending_blog);
            setAuthorsData(data.data_c.trending_author);
            setFontStyle(data.data_c.theme_data.fontColor);
            setFontSize(data.data_c.theme_data.fontSize);
            setFontWeight(data.data_c.theme_data.fontWeight);
            setTheme(data.data_c.theme_data.theme);
            if(data.theme=='white'){
                setTheme2('200');
            }else{
                setTheme2('800');
            }
            setBackgroundImage(data.data_c.backgroundStyle)

            setTimeout(() => {
                setIsLoading(false);
            }, 2000)
        })
        .catch(error => {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000)
        
            localStorage.removeItem("token");
            navigate('/signin');
        });
    }, [filter_data]);

    return (
        <>
            {
                isLoading === true && <div className='loader'>
                    <Loading />
                </div>
            }
        <div className={`bg-${theme} text-${fontColor}-600 ${fontWeight} ${fontStyle}`}>
            <div className="pt-2 md:pt-6">
                <HomeSlider slides={slides} />
            </div>
            <CategorySlider />
            <ViewBlogs handleSearch={handleSearch} handleLayoutChange={handleLayoutChange} handleSort={handleSort} blogs_data={blogs_data} layout={layout} trainding_data={trainding_data} authors_data={authors_data} similier_data={similier_data} />
            <Pagination />
            
        </div>
        </>
    )
}

export default Home