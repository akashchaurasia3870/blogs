import express from 'express';
import {
    getDashData,adm_getUsersInfo,adm_updateUserInfo,adm_deleteUserInfo,adm_getBlogsInfo,adm_updateBlogInfo,adm_deleteBlogInfo,adm_getMailsInfo,adm_updateMailInfo,adm_deleteMailInfo,adm_getNotificationsInfo,adm_deleteNotificationInfo,adm_updateNotificationInfo,adm_getReportsInfo,adm_updateReportInfo,adm_deleteReportInfo,adm_getThemeInfo,adm_updateThemeInfo,adm_deleteThemeInfo
} from '../controllers/adminController.js'; 

const adminRouter = express.Router();

adminRouter.post('/get_dash_data', async (req, res) => {
    try {
        const {user_id} = req.body;
        const result = await getDashData(user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

adminRouter.post('/get_users_info', async (req, res) => {
    try {
        const {user_id} = req.body;
        const result = await adm_getUsersInfo(user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

adminRouter.post('/update_user_info', async (req, res) => {
    try {
        const {user_id,user_data} = req.body;
        const result = await adm_updateUserInfo(user_id,user_data);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

adminRouter.post('/delete_user_info', async (req, res) => {
    try {
        const {user_id} = req.body;
        const result = await adm_deleteUserInfo(user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

adminRouter.post('/get_blogs_info', async (req, res) => {
    try {
        const {user_id,blog_id} = req.body;
        const result = await adm_getBlogsInfo(user_id,blog_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

adminRouter.post('/update_blog_info', async (req, res) => {
    try {
        const {user_id,blog_id,blog_data} = req.body;
        const result = await adm_updateBlogInfo(user_id,blog_id,blog_data);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/delete_blog_info', async (req, res) => {
    try {
        const {user_id,blog_id} = req.body;
        const result = await adm_deleteBlogInfo(user_id,blog_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/get_mails_info', async (req, res) => {
    try {
        let {limit,pages,search} = req.body;
        const result = await adm_getMailsInfo(limit,pages,search);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/update_mail_info', async (req, res) => {
    try {
        const {user_id,mail_id,mail_data} = req.body;
        const result = await adm_updateMailInfo(user_id,mail_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/delete_mail_info', async (req, res) => {
    try {
        const {user_id,mail_id} = req.body;
        const result = await adm_deleteMailInfo(user_id,mail_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/get_notifications_info', async (req, res) => {
    try {
        let {limit,pages,search} = req.body;
        const result = await adm_getNotificationsInfo(limit,pages,search);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/update_notification_info', async (req, res) => {
    try {
        const {user_id,notification_id,notification_data} = req.body;
        const result = await adm_updateNotificationInfo(user_id,notification_id,notification_data);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/delete_notification_info', async (req, res) => {
    try {
        const {user_id,notification_id} = req.body;
        const result = await adm_deleteNotificationInfo(user_id,notification_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/get_reports_info', async (req, res) => {
    try {
        const {user_id} = req.body;
        const result = await adm_getReportsInfo(user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/update_report_info', async (req, res) => {
    try {
        const {user_id,report_id,report_data} = req.body;
        const result = await adm_getUpdateInfo(user_id,report_id,report_data);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/delete_report_info', async (req, res) => {
    try {
        const {user_id,report_id} = req.body;
        const result = await adm_deleteReportInfo(user_id,report_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/get_theme_info', async (req, res) => {
    try {
        const {user_id} = req.body;
        const result = await adm_getThemeInfo(user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/update_theme_info', async (req, res) => {
    try {
        const {user_id,theme_data} = req.body;

        const result = await adm_updateThemeInfo(user_id,theme_data);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
adminRouter.post('/delete_theme_info', async (req, res) => {
    try {
        const {user_id} = req.body;
        const result = await adm_deleteThemeInfo(user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default adminRouter;
