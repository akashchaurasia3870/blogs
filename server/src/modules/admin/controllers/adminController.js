import User from "../../users/models/userModal.js";
import { Blog } from "../../blogs/models/blogModel.js";
import { Mail } from "../../mails/models/mailsModel.js";
import { Notification } from "../../notification/models/notificationModel.js";
import { getUsersDetails, updateUserDetails } from "../../users/controllers/userController.js";
import { getBlogsInfo ,updateBlogInfo,deleteBlogInfo} from "../../blogs/controllers/blogController.js";
import { getMailsInfo,updateMailInfo,deleteMailInfo } from "../../mails/controllers/mailsController.js";
import { getNotificationsInfo,deleteNotificationInfo,updateNotificationInfo,getReportsInfo,updateReportInfo,deleteReportInfo } from "../../notification/controllers/notificationController.js";
import {getThemeInfo,updateThemeInfo,deleteThemeInfo} from '../../theme/controllers/themeController.js'
import CustomError from "../../../customErrors/CustomError.js";


const getDashData = async (user_id)=> {
    try {
        
        const filter = {deleted:0};
        const blogs = await Blog.find(filter, { projection: {  deleted: 0, _id: 0 } })
        .sort({ 'date_entered':-1 })
        .limit(5);
        const totalBlogCount = await Blog.countDocuments(filter);


        const users = await User.find(filter,{ projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } })
        .sort({ 'date_entered': -1 })
        .limit(5);
        const totalUserCount = await User.countDocuments(filter);


        const notifications = await Notification.find(filter, { projection: {  deleted: 0, _id: 0 } })
        .sort({ 'date_entered': -1 })
        .limit(5);
        const totalNotificationCount = await Notification.countDocuments(filter);


        const mails = await Mail.find(filter, { projection: {  deleted: 0, _id: 0 } })
        .sort({ 'date_entered': -1 })
        .limit(5);
        const totalMailCount = await Mail.countDocuments(filter);

        return { message: 'Blogs Data', success: true, statusCode: 200, data: [{blogs,totalBlogCount},{users,totalUserCount},{notifications,totalNotificationCount},{mails,totalMailCount}] }

    } catch (error) {
        console.log(error.message);
        
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}


const adm_getUsersInfo = async (search='',limit=5,page=1)=>{
    try {
        const result =await getUsersDetails(search,limit,page);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_updateUserInfo = async (user_id,update_feilds)=>{
    try {
        const result =await updateUserDetails(user_id,update_feilds);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_deleteUserInfo = async (user_id,update_feilds)=>{
    try {
        const result =await updateUserDetails(user_id,update_feilds);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}


const adm_getBlogsInfo = async (search='',limit=5,page=1)=>{
    try {
        const result =await getBlogsInfo(search,limit,page);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_updateBlogInfo = async (user_id,blog_id,update_feilds)=>{
    try {
        const result =await updateBlogInfo(user_id,blog_id,update_feilds);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_deleteBlogInfo = async (user_id,blog_id)=>{
    try {
        const result =await deleteBlogInfo(user_id,blog_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}


const adm_getMailsInfo = async (limit=5,page=1,search='')=>{
    try {
        const result =await getMailsInfo(limit,page,search);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_updateMailInfo = async (user_id,mail_id,update_feilds)=>{
    try {
        const result =await updateMailInfo(user_id,mail_id,update_feilds);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_deleteMailInfo = async (user_id,mail_id)=>{
    try {
        const result =await deleteMailInfo(user_id,mail_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}


const adm_getNotificationsInfo = async (limit=5,pages=1,search='')=>{
    try {
        const result =await getNotificationsInfo(limit,pages,search);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_updateNotificationInfo = async (user_id,notification_id,update_feilds)=>{
    try {
        const result =await updateNotificationInfo(user_id,notification_id,update_feilds);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_deleteNotificationInfo = async (user_id,notification_id)=>{
    try {
        const result =await deleteNotificationInfo(user_id,notification_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}


const adm_getReportsInfo = async (search='',limit=5,page=1)=>{
    try {
        const result =await getReportsInfo(search,limit,page);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_updateReportInfo = async (user_id,report_id,update_feilds)=>{
    try {
        const result =await updateReportInfo(user_id,report_id,update_feilds);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_deleteReportInfo = async (user_id,report_id)=>{
    try {
        const result =await deleteReportsInfo(user_id,notification_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}


const adm_getThemeInfo = async (user_id)=>{
    try {
        const result =await getThemeInfo(user_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_updateThemeInfo = async (user_id,update_feilds)=>{
    try {
        const result =await updateThemeInfo(user_id,update_feilds);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}
const adm_deleteThemeInfo = async (user_id)=>{
    try {
        const result =await deleteThemeInfo(user_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
}


export {getDashData,adm_getUsersInfo,adm_updateUserInfo,adm_deleteUserInfo,adm_getBlogsInfo,adm_updateBlogInfo,adm_deleteBlogInfo,adm_getMailsInfo,adm_updateMailInfo,adm_deleteMailInfo,adm_getNotificationsInfo,adm_deleteNotificationInfo,adm_updateNotificationInfo,adm_getReportsInfo,adm_updateReportInfo,adm_deleteReportInfo,adm_getThemeInfo,adm_updateThemeInfo,adm_deleteThemeInfo};


