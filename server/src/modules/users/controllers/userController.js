import CustomError from '../../../customErrors/CustomError.js';
import { svc_getUserDetails, svc_getUsersDetails, svc_getWriterDetails, svc_getWritersDetails, svc_resetUserCreds, svc_signIn, svc_signUp, svc_toogleFollow, svc_updateUserDetails, svc_verifyUser } from '../services/userService.js';
import pc from "picocolors"

const signUp = async (username, email, password) => {
    try {
        const result =await svc_signUp(username, email, password);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
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
        const result =await svc_signIn(email, password);
        return result;
    } catch (error) {
        console.log(
            pc.green(error.message),'\n',pc.red(error.stack)
        )
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
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
        const result =await svc_verifyUser(user_id,code);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const resetUserCreds = async (user_id, password) => {
    try {
        const result =await svc_resetUserCreds(user_id, password);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const getUserDetails = async (user_id) => {
    try {
        const result =await svc_getUserDetails(user_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const getUsersDetails = async (search,limit,page) => {
    try {
        const result =await svc_getUsersDetails(search,limit,page);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const updateUserDetails = async (user_id,update_feilds) => {
    try {
        const result =await svc_updateUserDetails(user_id,update_feilds);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const getWriterDetails = async (user_id) => {
    try {
        const result =await svc_getWriterDetails(user_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const getWritersDetails = async (search,limit,page) => {
    try {
        const result =await svc_getWritersDetails(search,limit,page);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const toogleFollow = async (user_id,follower_id) => {
    try {
        const result =await svc_toogleFollow(user_id,follower_id);
        return result;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
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
