import CustomError from '../../../customErrors/CustomError.js'
import { Mail, MailVerfication } from '../models/mailsModel.js';

import { getThemeInfo } from '../../theme/controllers/themeController.js';
import User from '../../users/models/userModal.js';
import { sendEmails } from '../middlewares/mailsMiddleware.js';
import { svc_createMail, svc_deleteMailInfo, svc_getMailsInfo, svc_updateMailInfo } from '../services/mailService.js';

async function sendMail(email,subject,message,user_id) {
    try {
        
        let result  = await svc_createMail(email,subject,message,user_id)
        await sendEmails([email],subject,message);
        return result;

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}
async function sendVerificationMail(mail,code,user_id) {
    try {

        let newMails = new MailVerfication({
            user_id,
            code,
        })

        await newMails.save();

        await sendEmails(mail,"Verification Mail",`Verification Code ${code} valid for 15 min`);

        return { message: 'Mail Send Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}
async function sendMassMail(content,subject,user_id,receiver_user_id,email) {
    try {
        await sendEmails(email,subject,content);
        let newMails = new Mail({
            subject,
            content,
            sender_user_id:user_id,
            receiver_user_id:receiver_user_id
        })
        await newMails.save();
        return { message: 'Mail Send Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}
async function getMails(limit,pages,search,sort,sort_order) {
    try {
        const filter = { deleted:'0' };
        if(search!=''){
            filter = { 
                deleted:'0' ,
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
                    { content: { $regex: search, $options: 'i' } } // Case-insensitive search on content
                ]
            };
        }

        const totalItems = await Mail.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the page is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current page
        const skip = (pages - 1) * limit;


        const mails = await Mail.find(filter, { projection: {  deleted: 0, _id: 0 } }).sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        return { message: 'User Mails', success: true, statusCode: 200, data: notifications ,pagination_data}

    } catch (error) {
        console.log(error.message);
        
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}
async function getMailsById(author_id) {
    try {
        const filter = { user_id : author_id};
        const blogs_data = await Blog.find(filter, { projection: { deleted: 0, _id: 0 } });
        const user_data = await User.findOne(filter);
        return { message: 'User Mailss', success: true, statusCode: 200, data: {blogs_data,user_data} }

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function getMailsInfo(limit,page,search){  
    try {
        let result  = await svc_getMailsInfo(limit,page,search)
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}
async function updateMailInfo(user_id,mail_id,update_feilds){ 
    try {
        let result  = await svc_updateMailInfo(user_id,mail_id,update_feilds)
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    } 
}
async function deleteMailInfo(user_id,mail_id){  
    try {
        let result  = await svc_deleteMailInfo(user_id,mail_id)
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

export { getMails, sendMail, sendMassMail,getMailsById,sendVerificationMail,getMailsInfo,updateMailInfo,deleteMailInfo };