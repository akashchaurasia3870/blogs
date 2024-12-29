import User from '../models/userModal.js';
import {MailVerfication} from '../../mails/models/mailsModel.js'
import { createTheme } from '../../theme/controllers/themeController.js';
import { sendEmails } from '../../mails/middlewares/mailsMiddleware.js';
import { sendVerificationMail } from '../../mails/controllers/mailsController.js';

import CustomError from '../../../customErrors/CustomError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const jwtExpiresIn = '30m';

const rps_signUp = async (username, email, password) => {
    try {
        
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                message: "User Already Exists With This Mail Please Login",
                success: true,
                statusCode: 204
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 11);

        // Create new user
        const newUser = new User({
            user_id:uuidv4(),
            username,
            email,
            password: hashedPassword,
            roles: ['user'] // Default role
        });

        // Save user to database
        await newUser.save();
        createTheme(newUser.user_id);
        sendVerificationMail([newUser.email],'123456',newUser.user_id)
        // sendEmails([newUser.email],`Greetings ${newUser.username}`,'<h1>Welcome</h1>')

        const token = jwt.sign({ user_id: newUser.user_id }, jwtSecret, { expiresIn: jwtExpiresIn });

        return { message: 'User Signed Up successfully', success: true, statusCode: 201, token };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
};

const rps_signUpByGoogle = async (googleUserData) => {
    try {
        // Implement Google sign-up logic
        return { message: 'User signed up using Google successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const rps_signIn = async (email, user_password) => {
    try {
        // Find user by email
        const user = await User.findOne({ email },{
            "google_access_token": 0,
            "google_refresh_token": 0,
            "verified": 0,
            "deleted": 0,
            "roles": 0,
            "_id":0,
            "__v":0
        });
        console.log(user);
        
        if (!user) {
            return {
                message: "User Not Found For This Email",
                success: true,
                statusCode: 404
            }
        }

        const { password } = user;

        const user_data  = {
            address: user.address,
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            age: user.age,
            gender: user.gender,
            bio: user.bio,
            occupation: user.occupation,
            phone: user.phone,
            userImage: user.userImage,
            blogs_count: user.blogs_count,
            followers_list: user.followers_list,
            following_list: user.following_list,
            createdAt: user.createdAt,
          }


        // Compare passwords
        const passwordMatch = await bcrypt.compare(user_password, password);
        if (!passwordMatch) {
            return { message: 'Incorrect Password', success: true, statusCode: 204 }
        }

        const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: jwtExpiresIn });

        createTheme(user.user_id);

        return { message: 'User SignIn Successfully', success: true, statusCode: 200, token, data: user_data }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const rps_signInByGoogle = async (googleuser_id) => {
    try {
        // Implement Google sign-in logic
        return { message: 'User signed in using Google successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user using Google', error.statusCode || 500);
    }
};

const rps_signOut = async (user_id) => {
    try {
        // Implement sign-out logic
        return { message: 'User signed out successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing out user', error.statusCode || 500);
    }
};

const rps_verifyUser = async (user_id,code) => {
    try {
        // Implement verification logic
         // Find the record with the user's ID
        const result = await MailVerfication.findOne({ user_id }).sort({ created_at: -1 }).limit(1);

        if (result) {
                const storedCode = result.code;
                const createdAt = result.created_at;

                // Check if the input code matches the stored code
                if (code === storedCode) {
                    // Check if the code is expired (e.g., 15 minutes expiry)
                    const expirationTime = new Date(createdAt.getTime() + 15 * 60 * 1000); // 15 minutes from creation
                    if (new Date() < expirationTime) { 
                        const filter = { user_id };
                        const update = { $set: { verified: true } };
                        await User.updateOne(filter, update)
                        return { message: 'User verified successfully' };
                    } else {
                        return "Code expired";
                    }
                } else {
                    return "Invalid code";
                }
        } else {
        return "No code found for this user";
        }
    } catch (error) {
        throw new CustomError(error.message || 'Error verifying user', error.statusCode || 500);
    }
};

const rps_resetUserCreds = async (user_id, password) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 11);

        const filter = { user_id };
        const update = { $set: { password: hashedPassword } };
        await User.updateOne(filter, update)
        return { message: 'Password updated successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error resetting password', error.statusCode || 500);
    }
};

const rps_getUserDetails = async (user_id) => {
    try {
        const user = await User.findOne({ user_id})
        .select(
            {
                google_access_token:0,
                google_refresh_token:0,
                verified:0,
                deleted:0,
                roles:0,
                password:0,
                __v:0,
                _id:0,
                updatedAt:0
            }
        );

        if (!user) {
            return {
                message: "User Not Found For This Email",
                success: true,
                statusCode: 404
            }
        }
        // Return user or token for authentication
        return { message: 'User Data', success: true, statusCode: 200, data: user }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const rps_getUsersDetails = async (search,limit,pages) => {
    try {
        // Find user by email

        const filter = { 
            deleted:'0'
        };

        if(search!=''){
            filter = { 
                deleted:'0' ,
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
                    { content: { $regex: search, $options: 'i' } } // Case-insensitive search on content
                ]
            };
        }

        const totalItems = await User.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the pages is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current pages
        const skip = (pages - 1) * limit;

        const users = await User.find(filter)
        .select(
            {
                google_access_token:0,
                google_refresh_token:0,
                verified:0,
                deleted:0,
                roles:0,
                password:0,
                __v:0,
                _id:0,
                updatedAt:0
            }
        ).sort({ 'date_entered': -1 })
        .skip(skip)
        .limit(limit);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        return { message: 'User Data', success: true, statusCode: 200, data: users ,pagination_data}

    } catch (error) {
        
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const rps_updateUserDetails = async (user_id,update_feilds) => {
    try {
        const filter = {user_id};
        // const update = {
        //     username: req.body.username,
        //     blogsNo: 0,
        //     mobileNo: req.body.phone,
        //     address: req.body.address.country,
        //     userImage: req.body.userImage,
        // };

        console.log(update_feilds);
        

        const updatedUser = await User.findOneAndUpdate(filter, update_feilds, {
            new: true,
            upsert: true, 
        })
        .select(
            {
                google_access_token:0,
                google_refresh_token:0,
                verified:0,
                deleted:0,
                roles:0,
                password:0,
                __v:0,
                _id:0,
                updatedAt:0
            }
        );

        return { message: 'User Details Updated Successfully', success: true, statusCode: 200, data: updatedUser }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const rps_getWriterDetails = async (user_id) => {
    try {
        const user = await User.findOne({ user_id})
        .select(
            {
                google_access_token:0,
                google_refresh_token:0,
                verified:0,
                deleted:0,
                roles:0,
                password:0,
                __v:0,
                _id:0,
                updatedAt:0
            }
        );
        if (!user) {
            return {
                message: "User Not Found For This Email",
                success: true,
                statusCode: 404
            }
        }

        // Return user or token for authentication
        return { message: 'User Data', success: true, statusCode: 200, data: user }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const rps_getWritersDetails = async (req, res) => {
    try {
        // Find user by email

        const filter = { 
            deleted:'0'
        };

        if(search!=''){
            filter = { 
                deleted:'0' ,
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
                    { content: { $regex: search, $options: 'i' } } // Case-insensitive search on content
                ]
            };
        }

        const totalItems = await User.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the pages is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current pages
        const skip = (pages - 1) * limit;

        const users = await User.find(filter)
        .select(
            {
                google_access_token:0,
                google_refresh_token:0,
                verified:0,
                deleted:0,
                roles:0,
                password:0,
                __v:0,
                _id:0,
                updatedAt:0
            }
        )
        .sort({ 'date_entered': -1 })
        .skip(skip)
        .limit(limit);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        return { message: 'User Data', success: true, statusCode: 200, data: users ,pagination_data}

    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const rps_toogleFollow = async (user_id, follower_id) => {
    try {
        const user = await User.findById(user_id,{deleted:0}).select(
            {
                google_access_token:0,
                google_refresh_token:0,
                verified:0,
                deleted:0,
                roles:0,
                password:0,
                __v:0,
                _id:0,
                updatedAt:0
            }
        );

        if (!user) {
            throw new CustomError(error.message || 'User Not Found', error.statusCode || 500);
        }

        const isFollower = user.followers_list.includes(follower_id);

        if (isFollower) {
            user.followers_list = user.followers_list.filter(id => id !== follower_id);
            console.log(`Removed ${follower_id} from followers_list.`);
        } else {
            user.followers_list.push(follower_id);
        console.log(`Added ${follower_id} to followers_list.`);
        }

        await user.save();

        const follower = await User.findById(user_id,{deleted:0}).select(
            {
                google_access_token:0,
                google_refresh_token:0,
                verified:0,
                deleted:0,
                roles:0,
                password:0,
                __v:0,
                _id:0,
                updatedAt:0
            }
        );

        if (!follower) {
            throw new CustomError(error.message || 'User Not Found', error.statusCode || 500);
        }

        const isFollowing = user.following_list.includes(user_id);

        if (isFollowing) {
            user.following_list = user.following_list.filter(id => id !== user_id);
            console.log(`Removed ${user_id} from following_list.`);
        } else {
            user.following_list.push(user_id);
            console.log(`Added ${user_id} to following_list.`);
        }

        await user.save();

        return {
            success: true,
            statusCode: 200,
            data: user
        };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

export {
    rps_signUp,
    rps_signIn,
    rps_verifyUser,
    rps_resetUserCreds,
    rps_signUpByGoogle,
    rps_signInByGoogle,
    rps_signOut,
    rps_updateUserDetails,
    rps_getUserDetails,
    rps_getUsersDetails,
    rps_getWriterDetails,
    rps_getWritersDetails,
    rps_toogleFollow,
};
