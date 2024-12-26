import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    addPost, getPost, updatePost, deletePost,
    addComment,
    addLikes,
    deleteLike,
    getPostById,
    getBlogs
} from '../controllers/blogController.js';

import handleUploads from '../../../GlobalMiddlewares/fileUpload.js'
const blogRouter = express.Router();


blogRouter.post('/add', Logs, handleUploads, async (req, res) => {
    try {

        const result = await addPost(req.body);

        return res.status(201).json(result);
    } catch (error) {

        console.log("Erro :", error);

        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

blogRouter.post('/get', Logs, async (req, res) => {
    try {        
        const result = await getPost(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
blogRouter.post('/get_blogs', Logs, async (req, res) => {
    try {        
        const result = await getBlogs(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

blogRouter.post('/author_blogs', Logs, async (req, res) => {
    try {
        const result = await getPostById(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

blogRouter.post('/update', Logs, async (req, res) => {
    try {
        const result = await updatePost(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

blogRouter.post('/delete', Logs, async (req, res) => {
    try {
        const result = await deletePost(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

blogRouter.post('/addComment', Logs, async (req, res) => {
    try {
        const result = await addComment(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

blogRouter.post('/like', Logs, async (req, res) => {
    try {
        const result = await addLikes(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

blogRouter.post('/dislike', Logs, async (req, res) => {
    try {
        const result = await deleteLike(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


export default blogRouter;
