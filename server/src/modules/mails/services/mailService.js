import CustomError from "../../../customErrors/CustomError.js";
import { rps_createMail,rps_deleteMailInfo, rps_getMailsInfo, rps_updateMailInfo } from "../repository/MailRepositoryMongo.js";

const svc_createMail = async (email,subject,message,user_id) => {
    try {
        console.log(email,subject,message,user_id);
        
        const result = await rps_createMail(email,subject,message,user_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_createMail Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getMailsInfo = async (limit,page,search) => {
    try {
        
        const result = await rps_getMailsInfo(limit,page,search);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};

const svc_updateMailInfo = async (user_id,mailsControllerail_id,updated_fields) => {
    try {
        
        const result = await rps_updateMailInfo(user_id,Mail_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During rps_updateMailInfo Process : '+error.message, error.statusCode || 500);
    }
};

const svc_deleteMailInfo = async (user_id,mail_id) => {
    try {
        
        const result = await rps_deleteMailInfo(user_id,Mail_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};


export {
    svc_deleteMailInfo,
    svc_updateMailInfo,
    svc_getMailsInfo,
    svc_createMail
};
