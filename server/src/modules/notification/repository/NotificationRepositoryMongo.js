import CustomError from '../../../customErrors/CustomError.js'
import { Notification } from '../models/notificationModel.js';

async function rps_createNotification(content,subject,user_id) {
    try {
        let newNotification = new Notification({
            subject,
            content,
            user_id,
        })

        await newNotification.save();

        return { message: 'New Notification Added Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_getNotificationsInfo(limit,pages,search) {
    try {
        
        const filter = { 
            deleted:false
        };

        if(search!=''){
            filter = { 
                deleted:false ,
                $or: [
                    { subject: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
                    { content: { $regex: search, $options: 'i' } } // Case-insensitive search on content
                ]
            };
        }


        const totalItems = await Notification.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the page is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current page
        const skip = (pages - 1) * limit;


        const Notifications = await Notification.aggregate([
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
                    _id: 0
                }
            }
        ]).sort({ 'date_created': -1 })
        .skip(skip)
        .limit(limit);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        return { message: 'Notifications Data', success: true, statusCode: 200, data: Notifications ,pagination_data}

    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_updateNotificationInfo(user_id,Notification_id,updated_fields) {
    try {
        const filter = { user_id, Notification_id };
        const update = { $set: { caption } };
        const Notifications = await Notification.updateOne(filter, updated_fields);
        return { message: 'Notification Updated Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function rps_deleteNotificationInfo(user_id,Notification_id) {
    try {
        const filter = { user_id, Notification_id };
        const update = { $set: { deleted: true } };
        const Notifications = await Notification.updateOne(filter, update);
        return { message: 'Notification Updated Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

export {rps_createNotification,rps_getNotificationsInfo, rps_updateNotificationInfo,rps_deleteNotificationInfo };