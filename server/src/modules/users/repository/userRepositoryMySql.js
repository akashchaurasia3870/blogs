import bcrypt from 'bcrypt';
import User from '../models/userModal.js';
import CustomError from '../../../customErrors/CustomError.js'; // 
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import { createTheme } from '../../theme/controllers/themeController.js';
import { sendEmails } from '../../mails/middlewares/mailsMiddleware.js';
import {MailVerfication} from '../../mails/models/mailsModel.js'
import { sendVerificationMail } from '../../mails/controllers/mailsController.js';
const jwtSecret = process.env.ACCESS_TOKEN_SECRET; // Replace with your actual JWT secret key
const jwtExpiresIn = '60m'; // JWT expiration time, e.g., '1d' for 1 day

const signUp = async (username, email, password) => {
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

const signUpByGoogle = async (googleUserData) => {
    try {
        // Implement Google sign-up logic
        return { message: 'User signed up using Google successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const signIn = async (email, password) => {
    try {
        // Find user by email
        const user = await User.findOne({ email }, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } });
        if (!user) {
            return {
                message: "User Not Found For This Email",
                success: true,
                statusCode: 404
            }
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { message: 'Incorrect Password', success: true, statusCode: 204 }
        }

        const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: jwtExpiresIn });

        createTheme(user.user_id);



        // Return user or token for authentication
        return { message: 'User SignIn Successfully', success: true, statusCode: 200, token, data: user }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const signInByGoogle = async (googleuser_id) => {
    try {
        // Implement Google sign-in logic
        return { message: 'User signed in using Google successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user using Google', error.statusCode || 500);
    }
};

const signOut = async (user_id) => {
    try {
        // Implement sign-out logic
        return { message: 'User signed out successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing out user', error.statusCode || 500);
    }
};

const verifyUser = async (user_id,code) => {
    try {
        // Implement verification logic
         // Find the record with the user's ID
        const result = await MailVerfication.findOne({ user_id }).sort({ created_at: -1 }).limit(1);

        if (result) {
                const storedCode = result.code;
                const createdAt = result.created_at;

                // Check if the input code matches the stored code
                if (inputCode === storedCode) {
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

const resetUserCreds = async (user_id, password) => {
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

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ user_id: req.body.user_id }, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } });
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

const getUsersDetails = async (req, res) => {
    try {
        // Find user by email

        let {limit,pages,search,sort,sort_order} = req.body;

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

        // Ensure the page is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current page
        const skip = (pages - 1) * limit;

        const users = await User.find(filter, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } }).sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
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

const updateUserDetails = async (req, res) => {
    try {
        // Assuming user_data contains a unique identifier like email or userId
        const filter = { email: req.body.email }; // Replace with userId or another unique field if needed

        const update = {
            username: req.body.username,
            blogsNo: 0,
            mobileNo: req.body.phone,
            address: req.body.address.country,
            userImage: req.body.userImage,
        };

        const updatedUser = await User.findOneAndUpdate(filter, update, {
            new: true, // Returns the updated document
            upsert: true, // Creates a new document if no match is found
        });

        // return updatedUser;

        // Return user or token for authentication
        return { message: 'User Details Updated Successfully', success: true, statusCode: 200, data: updatedUser }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const getWriterDetails = async (req, res) => {
    try {
        // Extract limit from the request body
        const limit = req.body.limit || 10; // Default limit to 10 if not provided

        // Retrieve users based on the provided limit
        const users = await User.find({ deleted: 0 }, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } })
            .limit(limit)
            .exec();

        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                success: false,
                statusCode: 404
            });
        }

        // Return the list of users
        return {
            message: 'Users retrieved successfully',
            success: true,
            statusCode: 200,
            data: users
        };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const getWritersDetails = async (req, res) => {
    try {
        // Extract limit from the request body
        const limit = req.body.limit || 10; // Default limit to 10 if not provided

        // Retrieve users based on the provided limit
        const users = await User.find({ deleted: 0 }, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } })
            .limit(limit)
            .exec();

        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                success: false,
                statusCode: 404
            });
        }

        // Return the list of users
        return {
            message: 'Users retrieved successfully',
            success: true,
            statusCode: 200,
            data: users
        };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const toogleFollow = async (req, res) => {
    try {
        // Extract limit from the request body
        const limit = req.body.limit || 10; // Default limit to 10 if not provided

        // Retrieve users based on the provided limit
        const users = await User.find({ deleted: 0 }, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } })
            .limit(limit)
            .exec();

        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                success: false,
                statusCode: 404
            });
        }

        // Return the list of users
        return {
            message: 'Users retrieved successfully',
            success: true,
            statusCode: 200,
            data: users
        };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};


export {
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
};
