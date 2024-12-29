import CustomError from "../../../customErrors/CustomError.js";
import { rps_createNotification,rps_deleteNotificationInfo, rps_getNotificationsInfo, rps_updateNotificationInfo } from "../repository/NotificationRepositoryMongo.js";

const svc_createNotification = async (content,subject,user_id) => {
    try {
        
        const result = await rps_createNotification(content,subject,user_id,receiver_user_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_createNotification Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getNotificationsInfo = async (limit,pages,search) => {
    try {
        
        const result = await rps_getNotificationsInfo(limit,pages,search);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};

const svc_updateNotificationInfo = async (user_id,notification_id,updated_fields) => {
    try {
        
        const result = await rps_updateNotificationInfo(user_id,notification_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_updateNotificationInfo Process : '+error.message, error.statusCode || 500);
    }
};

const svc_deleteNotificationInfo = async (user_id,notification_id) => {
    try {
        
        const result = await rps_deleteNotificationInfo(user_id,notification_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};


export {
    svc_deleteNotificationInfo,
    svc_updateNotificationInfo,
    svc_getNotificationsInfo,
    svc_createNotification
};
