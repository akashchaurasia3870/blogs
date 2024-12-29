import CustomError from '../../../customErrors/CustomError.js'
import { Comment, Location, Blog, Likes } from '../models/blogModel.js';

import { getThemeInfo } from '../controllers/themeController.js';
import User from '../../users/models/userModal.js';

async function rps_createBlog(user_id, images, videos, caption, hashtags, content) {
    try {
        let newPost = new Blog({
            user_id,
            filePaths: { "images": images, "videos": videos },
            caption,
            content,
            hashtags: hashtags.split(',')
        })

        await newPost.save();

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

// async function getBlogInfo(user_id,blog_id) {
//     try {

//         const blogs = await Blog.aggregate([
//             {
//                 $match: {
//                     $or: [
//                         { caption: { $regex: search, $options: 'i' } },
//                         { hashtag: { $regex: search, $options: 'i' } }
//                     ]
//                 }
//             },
//             {
//                 $sort: {'date_created':-1}
//             }
//         ]);        

//         const category_blog = await getSimilerBlogs();
//         const trending_blog = await getTrandingBlogs();
//         const trending_author = await getTradingAuthor();
//         const theme_data = await getThemeInfo(req.body.user_id);

//         return { message: 'User Posts', success: true, statusCode: 200, data: blogs , data_c : {category_blog,trending_blog,trending_author,theme_data} }

//     } catch (error) {
//         throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
//     }
// }

async function rps_getBlogsInfo(limit,page,search) {
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
        ]).sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
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

async function rps_getWritersBlogsData(limit,page,search,user_id) {
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
        ]).sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
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

async function rps_getSimilerBlogs() {
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
                $sort: { date_created: -1 }
            },
            {
                $limit: 7
            }
        ]);

        return blogs ;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching similar blogs', error.statusCode || 500);
    }
}

async function rps_getTrandingBlogs() {
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
                $limit: 7
            }
        ]);

        return blogs ;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching trending blogs', error.statusCode || 500);
    }
}

async function rps_getTradingAuthor() {
    try {
        const authors = await Blog.aggregate([
            {
                $sort: { likes: -1 }
            },
            {
                $limit: 7
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

        let filter = { user_id, blog_id };
        const update = { $set: { deleted: true } };
        const like = await Likes.updateOne(filter, update);


        filter = { blog_id };
        // const update = { $set: { comment: comment.push(newComments.comment_id) } };
        const blog = await Blog.findOne(filter);

        if (!blog) {
            return { message: 'Blog Not Found' };
        }

        blog.likes--;
        const updatedPost = await blog.save();

        return { message: 'Delete Like Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_createBlogComment(user_id,blog_id,comment_data) {
    try {

        const newComments = new Comment({
            user_id, blog_id, comment_data
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

        return { message: 'Comment Added Successfully', blog: updatedPost };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_bookmarkBlog(user_id,blog_id) {
    try {

        const newComments = new Comment({
            user_id, blog_id, comment_data
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

        return { message: 'Comment Added Successfully', blog: updatedPost };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}




export {rps_createBlog,rps_getBlogInfo,rps_getBlogsInfo,rps_getWritersBlogsData,rps_getSimilerBlogs,rps_getTrandingBlogs,rps_getTradingAuthor, rps_updateBlogInfo,rps_deleteBlogInfo, rps_toggleLike,rps_createBlogComment,rps_bookmarkBlog };