import CustomError from '../../../customErrors/CustomError.js'
import { Comment, Location, Blog, Likes } from '../models/blogModel.js';

import { getThemeInfo } from '../../theme/controllers/themeController.js';
import User from '../../users/models/userModal.js';
import {
    svc_bookmarkBlog,
    svc_getBlogComments,
    svc_createBlogComment,
    svc_toggleLike,
    svc_toggleFollow,
    svc_deleteBlogInfo,
    svc_updateBlogInfo,
    svc_getTradingAuthor,
    svc_getTrandingBlogs,
    svc_getSimilerBlogs,
    svc_getWritersBlogsData,
    svc_getBlogsInfo,
    svc_getBlogInfo,
    svc_createBlog} from '../services/blogService.js'
import { getUserDetails } from '../../users/controllers/userController.js';

async function createBlog(user_id, images, videos, caption, hashtags, content) {
    try {
        
        const result = await svc_createBlog(user_id, images, videos, caption, hashtags, content);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During svc_createBlog Process : '+error.message, error.statusCode || 500);
    }
}

async function getBlogsHomeInfo(user_id) {
    try {   
        const blogs_data = await getBlogsInfo();
        const trending_data = await getTrandingBlogs();
        const similier_data = await getSimilerBlogs();
        const writer_data = await getTradingAuthor();
        const theme_data = await getThemeInfo(user_id);
        return {
            blogs_data,trending_data,similier_data,writer_data,theme_data
        } ;
    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
}
async function getPostsByWriterId(user_id) {
    try {   
        const user_data = await getUserDetails(user_id);
        const writer_data = await getWritersBlogsData(10,1,'',user_id);

        return {
            user_data,writer_data
        } ;
    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
}
async function getBlogInfo(user_id,blog_id) {
    try {   
        const result = await svc_getBlogInfo(user_id,blog_id);
        return result ;
    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
}

async function getBlogsInfo(limit=10,page=1,search='') {
    try {
        
        const result = await svc_getBlogsInfo(limit,page,search);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
}

async function getWritersBlogsData(limit=10,page=1,search='',user_id='') {
    try {
        
        const result = await svc_getWritersBlogsData(limit,page,search,user_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
}

async function getSimilerBlogs(limit=10,page=1,search='') {
    try {
        
        const result = await svc_getSimilerBlogs(limit,page,search);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
}

async function getTrandingBlogs(limit=10,page=1,search='') {
    try {
        
        const result = await svc_getTrandingBlogs(limit,page,search);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
}

async function getTradingAuthor(limit=10,page=1,search='') {
    try {
        
        const result = await svc_getTradingAuthor(limit,page,search);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During svc_getTradingAuthor Process : '+error.message, error.statusCode || 500);
    }
}

async function updateBlogInfo(user_id,blog_id,updated_fields) {
    try {
        
        const result = await svc_updateBlogInfo(user_id,blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During svc_updateBlogInfo Process : '+error.message, error.statusCode || 500);
    }
}

async function deleteBlogInfo(user_id,blog_id) {
    try {
        
        const result = await svc_deleteBlogInfo(user_id,blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
}

async function toggleLike(user_id,blog_id) {
    try {
        
        const result = await svc_toggleLike(user_id, blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During svc_toggleLike Process : '+error.message, error.statusCode || 500);
    }
}
async function toggleFollow(user_id,blog_id) {
    try {
        
        const result = await svc_toggleFollow(user_id, blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During svc_toggleLike Process : '+error.message, error.statusCode || 500);
    }
}

async function getBlogComments(user_id,blog_id) {
    try {     
        const result = await svc_getBlogComments(user_id, blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During svc_createBlogComment Process : '+error.message, error.statusCode || 500);
    }
}
async function createBlogComment(user_id,blog_id,comment_data) {
    try {     
        const result = await svc_createBlogComment(user_id, blog_id , comment_data);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During svc_createBlogComment Process : '+error.message, error.statusCode || 500);
    }
}

async function bookmarkBlog(user_id,blog_id) {
    try {
        
        const result = await svc_bookmarkBlog(user_id,blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During svc_bookmarkBlog Process : '+error.message, error.statusCode || 500);
    }
}




export { createBlog, getBlogInfo, getBlogsInfo, getWritersBlogsData, getSimilerBlogs, getTrandingBlogs, getTradingAuthor,updateBlogInfo,deleteBlogInfo,toggleLike,toggleFollow,getBlogComments,createBlogComment,bookmarkBlog,getBlogsHomeInfo,getPostsByWriterId };