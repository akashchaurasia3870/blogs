import CustomError from '../../../customErrors/CustomError.js'
import { Comment, Location, Blog, Likes } from '../models/blogModel.js';
import { v4 as uuidv4 } from 'uuid';

import { getThemeInfo } from '../../theme/controllers/themeController.js';
import User from '../../users/models/userModal.js';

async function rps_createBlog(user_id, images, videos, caption, hashtags='', content) {

    if(hashtags!='' && hashtags!=undefined && hashtags !=null){
        console.log(hashtags);
        hashtags = hashtags.split(',')
    }
    try {
        console.log(typeof user_id);
        let newPost = new Blog({
            blog_id:uuidv4(),
            user_id,
            filePaths: { "images": images, "videos": videos },
            caption,
            content,
            hashtags
        })

        await newPost.save();

        const user = await User.findOne({user_id,'deleted':0});
        user.blogs_count++;
        await user.save();
        
        return { message: 'New Blog Added Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_getBlogInfo(user_id,blog_id) {
    try {
       
        const filter = { user_id};
        const blogs_data = await Blog.find(filter, { projection: { comments: 0, deleted: 0, _id: 0 } });
        
        const user_data = await User.findOne(filter);
        
        return { message: 'User Posts', success: true, statusCode: 200, data: {blogs_data,user_data} }

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_getBlogsInfo(limit,pages,search) {
    try {
        
        const filter = { 
            deleted:'0'
        };

        if(search!=''){
            filter = { 
                deleted:'0' ,
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
                    { content: { $regex: search, $options: 'i' } } // Case-insensitive search on content
                ]
            };
        }


        const totalItems = await Blog.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the page is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current page
        const skip = (pages - 1) * limit;


        const blogs = await Blog.aggregate([
            {
                $match: {
                    $or: [
                        { caption: { $regex: search, $options: 'i' } },
                        // { content: { $regex: search, $options: 'i' } },
                        { hashtag: { $regex: search, $options: 'i' } }
                    ]
                }
            },
            {
                $project: {
                    comments: 0,
                    deleted: 0,
                    _id: 0
                }
            }
        ]).sort({'date_created':-1})
        .skip(skip)
        .limit(limit);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        return { message: 'Blogs Data', success: true, statusCode: 200, data: blogs ,pagination_data}

    } catch (error) {
        console.log(error.message);
        
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_getWritersBlogsData(limit,pages,search,user_id) {
    try {
        
        const filter = { 
            deleted:'0'
        };

        if(user_id!='')
            {
                filter.user_id = user_id;
            }

        if(search!=''){
            filter = { 
                deleted:'0' ,
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
                    { content: { $regex: search, $options: 'i' } } // Case-insensitive search on content
                ]
            };
        }


        const totalItems = await Blog.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the page is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current page
        const skip = (pages - 1) * limit;


        const blogs = await Blog.aggregate([
            {
                $match: {
                    $or: [
                        { caption: { $regex: search, $options: 'i' } },
                        // { content: { $regex: search, $options: 'i' } },
                        { hashtag: { $regex: search, $options: 'i' } }
                    ]
                }
            },
            {
                $project: {
                    comments: 0,
                    deleted: 0,
                    _id: 0
                }
            }
        ]).sort({'date_created':-1})
        .skip(skip)
        .limit(limit);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        return { message: 'Blogs Data', success: true, statusCode: 200, data: blogs ,pagination_data}

    } catch (error) {
        console.log(error.message);
        
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_getSimilerBlogs(limit,pages,search) {
    try {

        const blogs = await Blog.aggregate([
            // {
            //     $match: {
            //         category: { $regex: category, $options: 'i' }
            //     }
            // },
            {
                $project: {
                    comments: 0,
                    deleted: 0,
                    _id: 0
                }
            },
            {
                $sort: { "date_created": -1 }
            },
            {
                $limit: limit
            }
        ]);

        return blogs ;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching similar blogs', error.statusCode || 500);
    }
}

async function rps_getTrandingBlogs(limit,pages,search) {
    try {
        const blogs = await Blog.aggregate([
            {
                $project: {
                    comments: 0,
                    deleted: 0,
                    _id: 0
                }
            },
            {
                $sort: { likes: -1 }
            },
            {
                $limit: limit
            }
        ]);

        return blogs ;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching trending blogs', error.statusCode || 500);
    }
}

async function rps_getTradingAuthor(limit,pages,search) {
    try {
        const authors = await Blog.aggregate([
            {
                $sort: { likes: -1 }
            },
            {
                $limit: limit
            }
        ]);

        return  authors ;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching trending authors', error.statusCode || 500);
    }
}

async function rps_updateBlogInfo(user_id,blog_id,updated_fields) {
    try {
        const filter = { user_id, blog_id };
        const update = { $set: { caption } };
        const blogs = await Blog.updateOne(filter, update);
        return { message: 'Blog Updated Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_deleteBlogInfo(user_id,blog_id) {
    try {
        const filter = { user_id, blog_id };
        const update = { $set: { deleted: true } };
        const blogs = await Blog.updateOne(filter, update);
        return { message: 'Blog Updated Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_toggleLike(user_id,blog_id) {
    try {

        let filter = { user_id, blog_id ,deleted: 0};
        const update = { $set: { deleted: 1 } };
        let likeObj = await Likes.findOne(filter);
        let blog = await Blog.findOne({blog_id,"deleted":0});
    
        if(likeObj){
            likeObj = await Likes.updateOne(filter,update);
            filter = { blog_id };
            blog.likes--;
            let updatedPost = await blog.save();
    
        }else{
            likeObj = new Likes({
                blog_id,
                user_id
             });
             likeObj.save();
             blog.likes++;
             let updatedPost = await blog.save();
     
        }

        return { message: 'Toggle Like Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

function toggleStringInArray(array, string) {
    // Find the index of the string in the array
    const index = array.indexOf(string);
  
    if (index > -1) {
      // If the string is present, remove it
      array.splice(index, 1);
    } else {
      // If the string is not present, add it
      array.push(string);
    }
  
    return array;
}

async function rps_toggleFollow(user_id,blog_id) {
    try {

        console.log(user_id,blog_id);
        
        let blog = await Blog.findOne({blog_id,"deleted":0});
    
        console.log("blog_data : ",blog);
        
        let parent_id = blog.user_id ;
        let child_id = user_id ;

        let user1 = await User.findOne({user_id:child_id,"deleted":false});
        console.log("users data : 1",user1);
        let user1_following_list = user1.following_list ;
        console.log(user1_following_list,parent_id);
        toggleStringInArray(user1_following_list,parent_id);
        await user1.save();


        let user2 = await User.findOne({user_id:parent_id,"deleted":false});
        console.log("users data : 2",user2);
        let user2_followers_list = user2.followers_list ;
        console.log(user2_followers_list,child_id);
        toggleStringInArray(user2_followers_list,child_id);
        await user2.save();

        return { message: 'Toggle Follow Successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_getBlogComments(user_id,blog_id) {
    try {

        const comment_data = await Comment.find({blog_id});
        return comment_data ;

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_createBlogComment(user_id,blog_id,comment_data) {
    try {

        const newComments = new Comment({
           comment_id:uuidv4(), user_id, blog_id, comment:comment_data
        });

        await newComments.save();

        let comment_id = newComments.comment_id;

        const filter = { blog_id };
        // const update = { $set: { comment: comment.push(newComments.comment_id) } };
        const blog = await Blog.findOne(filter);

        if (!blog) {
            return { message: 'Blog Not Found' };
        }

        blog.comments.push(comment_id);

        const updatedPost = await blog.save();

        return { message: 'Comment Added Successfully'};

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_bookmarkBlog(user_id,blog_id) {
    try {
        const user = await User.findOne({user_id});
        toggleStringInArray(user.bookmark_blogs,blog_id);
        await user.save();
        return { message: 'Bookmark Toogle Successfully'};
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}




export {rps_createBlog,rps_getBlogInfo,rps_getBlogsInfo,rps_getWritersBlogsData,rps_getSimilerBlogs,rps_getTrandingBlogs,rps_getTradingAuthor, rps_updateBlogInfo,rps_deleteBlogInfo, rps_toggleLike, rps_toggleFollow,rps_getBlogComments,rps_createBlogComment,rps_bookmarkBlog };