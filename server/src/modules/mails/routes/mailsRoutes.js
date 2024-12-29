import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    getMails, sendMail, sendMassMail,
    getMailsById,
    getMailsInfo,
    updateMailInfo,
    deleteMailInfo
} from '../controllers/mailsController.js';

const mailRouter = express.Router();

mailRouter.post('/send', Logs, async (req, res) => {
    try {
        const {email,subject,message,user_id} = req.body;
        const result = await sendMail(email,subject,message,user_id);
        
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
mailRouter.post('/send_mass_mail', Logs, async (req, res) => {
    try {
        let {content,subject,user_id,receiver_user_id,email} = req.body;

        const result = await sendMassMail(content,subject,user_id,receiver_user_id,email);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
mailRouter.post('/get', Logs, async (req, res) => {
    try {
        let {limit,pages,search,sort,sort_order} = req.body;

        const result = await getMails(limit,pages,search,sort,sort_order);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
mailRouter.post('/author_mail', Logs, async (req, res) => {
    try {
        let { author_id } = req.body;
        const result = await getMailsById(author_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

mailRouter.post('/get_mails_info', Logs, async (req, res) => {
    try {
        const {search,limit,page} = req.body;
        const result = await getMailsInfo(search,limit,page);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
mailRouter.post('/update_mail_info', Logs, async (req, res) => {
    try {
        const {user_id,mail_id,update_feilds} = req.body;
        const result = await updateMailInfo(user_id,mail_id,update_feilds);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});
mailRouter.post('/delete_mail_info', Logs, async (req, res) => {
    try {
        const {user_id,mail_id} = req.body;
        const result = await deleteMailInfo(user_id,mail_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default mailRouter;
