import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    createBlog, getBlogInfo, getBlogsInfo, getWritersBlogsData, getSimilerBlogs, getTrandingBlogs, getTradingAuthor,updateBlogInfo,deleteBlogInfo,toggleLike,toggleFollow,createBlogComment,bookmarkBlog,getBlogsHomeInfo,getPostsByWriterId,
    getBlogComments
} from '../controllers/blogController.js';

import handleUploads from '../../../GlobalMiddlewares/fileUpload.js'
const blogRouter = express.Router();

blogRouter.post('/create', Logs, handleUploads, async (req, res) => {
    try {
        let { user_id, images, videos, caption, hashtags, content } = req.body;

        const result = await createBlog(user_id, images, videos, caption, hashtags, content);
        return res.status(201).json(result);
    } catch (error) {
        console.log("Error :", error);
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/get_blogs_home', Logs, async (req, res) => {
    try {    
        
        const {user_id}=req.body;
        const result = await getBlogsHomeInfo(user_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/get_blog_info', Logs, async (req, res) => {
    try {    
        
        const {user_id,blog_id}=req.body;
        const result = await getBlogInfo(user_id,blog_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/get_blogs_info', Logs, async (req, res) => {
    try {  
        const {search,limit,page,type}=req.body;      
        const result = await getBlogsInfo(limit,page,search);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/author_blogs', Logs, async (req, res) => {
    try {
        const {author_id} = req.body;
        const result = await getPostsByWriterId(author_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/update_blog_info', Logs, async (req, res) => {
    try {

        let {user_id,blog_id,updated_fields}  = req.body;
        const result = await updateBlogInfo(user_id,blog_id,updated_fields);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/delete_blog_info', Logs, async (req, res) => {
    try {

        const {user_id,blog_id} = req.body ;
        const result = await deleteBlogInfo(user_id,blog_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/get_comment', Logs, async (req, res) => {
    try {

        const {user_id,blog_id} = req.body;
        const result = await getBlogComments(user_id,blog_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/add_comment', Logs, async (req, res) => {
    try {

        const {user_id,blog_id,comment_data} = req.body;
        const result = await createBlogComment(user_id,blog_id,comment_data);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/toggle_bookmark', Logs, async (req, res) => {
    try {

        const {user_id,blog_id} = req.body;
        const result = await bookmarkBlog(user_id,blog_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/toggle_like', Logs, async (req, res) => {
    try {
        let { user_id, blog_id } = req.body;
        const result = await toggleLike(user_id, blog_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/toggle_follow', Logs, async (req, res) => {
    try {
        let { user_id, blog_id } = req.body;
        const result = await toggleFollow(user_id, blog_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/get_writer_blogs_info', Logs, async (req, res) => {
    try {  
        const {search,limit,page,user_id}=req.body;      
        const result = await getWritersBlogsData(limit,page,search,user_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default blogRouter;
