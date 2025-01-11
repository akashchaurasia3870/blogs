import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    signUp,
    signIn,
    verifyUser,
    resetUserCreds,
    signUpByGoogle,
    signInByGoogle,
    signOut,
    updateUserDetails,
    getUserDetails,
    getUsersDetails,
    getWriterDetails,
    getWritersDetails,
    toogleFollow,
} from '../controllers/userController.js';
import { authMiddleware } from '../../../GlobalMiddlewares/tokenVerification.js';

const userRouter = express.Router();

userRouter.post('/signup', Logs, async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const result = await signUp(username, email, password);
        
        res.cookie('token',result.token,{httpOnly:true,secure:false})
        res.status(201).json({message: 'User Signed Up successfully', success: true,statusCode:201});
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/signin', Logs, async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await signIn(email, password);
                
        res.cookie('token',result.token,{httpOnly:true,secure:false})
        res.status(200).json({message: 'User Signed In successfully', success: true,statusCode:200});
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/verification', Logs, async (req, res) => {
    try {
        const {user_id,code} = req.body;
        const result = await verifyUser(user_id,code);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/reset_creds', Logs, async (req, res) => {
    try {
        const { user_id, password } = req.body;
        const result = await resetUserCreds(user_id, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/signup/google', Logs, async (req, res) => {
    try {
        const googleUserData = req.body;
        const result = await signUpByGoogle(googleUserData);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/signin/google', Logs, async (req, res) => {
    try {
        const { googleuser_id } = req.body;
        const result = await signInByGoogle(googleuser_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/signout/:user_id', Logs, async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const result = await signOut(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/get_user_info', Logs, authMiddleware, async (req, res) => {
    try {
        const {user_id} = req.body
        const result = await getUserDetails(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/get_users_info', Logs, authMiddleware, async (req, res) => {
    try {

        const {search,limit,page} = req.body;
        const result = await getUsersDetails(search,limit,page);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/update_user_info', Logs, authMiddleware, async (req, res) => {
    try {
        const {user_id,update_feilds} = req.body        
        const result = await updateUserDetails(user_id,update_feilds);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/get_writer_info', Logs, authMiddleware, async (req, res) => {
    try {
        const {user_id} = req.body
        const result = await getWriterDetails(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/get_writers_info', Logs, authMiddleware, async (req, res) => {
    try {
        const {search,limit,page} = req.body ;
        const result = await getWritersDetails(search,limit,page);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/toggle_follow', Logs, authMiddleware, async (req, res) => {
    try {
        const {user_id,follower_id} = req.body;
        const result = await toogleFollow(user_id,follower_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


export default userRouter;
