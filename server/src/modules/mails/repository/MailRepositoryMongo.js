import CustomError from '../../../customErrors/CustomError.js'
import {Mail} from '../models/mailsModel.js';

async function rps_createMail(email,subject,message,user_id) {
    try {
        let newMail = new Mail({
            subject,
            content:message,
            sender_user_id:user_id,
            receiver_user_id:'admin'
        })

        await newMail.save();

        return { message: 'New Mail Added Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_getMailsInfo(limit,pages,search) {
    try {
        
        const filter = { 
            deleted:false
        };

        if(search!=''){
            filter = { 
                deleted:false ,
                $or: [
                    { subject: { $regex: search, $options: 'i' } }, 
                    { content: { $regex: search, $options: 'i' } } 
                ]
            };
        }


        const totalItems = await Mail.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the pages is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current pages
        const skip = (pages - 1) * limit;


        const Mails = await Mail.aggregate([
            {
                $match: {
                    $or: [
                        { subject: { $regex: search, $options: 'i' } }, 
                        { content: { $regex: search, $options: 'i' } } 
                    ]
                }
            },
            {
                $project: {
                    deleted: false,
                    _id: 0,
                    __v:0,
                    receiver_user_id:0
                }
            }
        ]).sort({ 'date_created':-1 })
        .skip(skip)
        .limit(limit);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        return { message: 'Mails Data', success: true, statusCode: 200, data: Mails ,pagination_data}

    } catch (error) {
        console.log(error.message);
        
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_updateMailInfo(user_id,mail_id,updated_fields) {
    try {
        const filter = { user_id, mail_id };
        const update = { $set: { caption } };
        const Mails = await Mail.updateOne(filter, updated_fields);
        return { message: 'Mail Updated Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_deleteMailInfo(user_id,mail_id) {
    try {
        const filter = { user_id, mail_id };
        const update = { $set: { deleted: true } };
        const Mails = await Mail.updateOne(filter, update);
        return { message: 'Mail Updated Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

export {rps_createMail,rps_getMailsInfo, rps_updateMailInfo,rps_deleteMailInfo };