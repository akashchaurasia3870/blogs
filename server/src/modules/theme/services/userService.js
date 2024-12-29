import CustomError from "../../../customErrors/CustomError";
import { rps_bookmarkBlog, rps_createBlog, rps_createBlogComment, rps_deleteBlogInfo, rps_getBlogInfo, rps_getBlogsInfo, rps_getTradingAuthor, rps_toggleLike, rps_updateBlogInfo } from "../repository/themeRepositoryMongo.js";

const svc_createBlog = async (user_id, images, videos, caption, hashtags, content) => {
    try {
        
        const result = await rps_createBlog(user_id, images, videos, caption, hashtags, content);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_createBlog Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getBlogInfo = async (user_id,blog_id) => {
    try {
        
        const result = await rps_getBlogInfo(user_id,blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getBlogsInfo = async (limit,page,search) => {
    try {
        
        const result = await rps_getBlogsInfo(limit,page,search);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getWritersBlogsData = async (limit,page,search,user_id) => {
    try {
        
        const result = await rps_createBlog(user_id, images, videos, caption, hashtags, content);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getSimilerBlogs = async () => {
    try {
        
        const result = await rps_createBlog();
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getTrandingBlogs = async () => {
    try {
        
        const result = await rps_createBlog();
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_createBlog Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getTradingAuthor = async () => {
    try {
        
        const result = await rps_getTradingAuthor();
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_getTradingAuthor Process : '+error.message, error.statusCode || 500);
    }
};

const svc_updateBlogInfo = async (user_id,blog_id,updated_fields) => {
    try {
        
        const result = await rps_updateBlogInfo(user_id,blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_updateBlogInfo Process : '+error.message, error.statusCode || 500);
    }
};

const svc_deleteBlogInfo = async (user_id,blog_id) => {
    try {
        
        const result = await rps_deleteBlogInfo(user_id,blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};

const svc_toggleLike = async (user_id, blog_id) => {
    try {
        
        const result = await rps_toggleLike(user_id, blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_toggleLike Process : '+error.message, error.statusCode || 500);
    }
};

const svc_createBlogComment = async (user_id, blog_id , comment_data) => {
    try {
        
        const result = await rps_createBlogComment(user_id, blog_id , comment_data);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_createBlogComment Process : '+error.message, error.statusCode || 500);
    }
};

const svc_bookmarkBlog = async (user_id,blog_id) => {
    try {
        
        const result = await rps_bookmarkBlog(user_id,blog_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_bookmarkBlog Process : '+error.message, error.statusCode || 500);
    }
};

export {
    svc_bookmarkBlog,
    svc_createBlogComment,
    svc_toggleLike,
    svc_deleteBlogInfo,
    svc_updateBlogInfo,
    svc_getTradingAuthor,
    svc_getTrandingBlogs,
    svc_getSimilerBlogs,
    svc_getWritersBlogsData,
    svc_getBlogsInfo,
    svc_getBlogInfo,
    svc_createBlog
};
