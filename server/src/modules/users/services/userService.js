import { rps_getUserDetails, rps_getUsersDetails, rps_getWritersDetails, rps_resetUserCreds, rps_signIn, rps_signUp, rps_toogleFollow, rps_updateUserDetails, rps_verifyUser } from "../repository/userRepositoryMongo.js";

import CustomError from "../../../customErrors/CustomError.js";
const svc_signUp = async (username, email, password) => {
    try {
        
        const result = await rps_signUp(username, email, password);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignUp Process : '+error.message, error.statusCode || 500);
    }
};

const svc_signUpByGoogle = async (googleUserData) => {
    try {
        // Implement Google sign-up logic
        return { message: 'User signed up using Google successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const svc_signIn = async (email, password) => {
    try {   
        const result = await rps_signIn(email, password);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During SignIn Process : '+error.message, error.statusCode || 500);
    }
};

const svc_signInByGoogle = async (googleuser_id) => {
    try {
        // Implement Google sign-in logic
        return { message: 'User signed in using Google successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user using Google', error.statusCode || 500);
    }
};

const svc_signOut = async (user_id) => {
    try {
        // Implement sign-out logic
        return { message: 'User signed out successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing out user', error.statusCode || 500);
    }
};

const svc_verifyUser = async (user_id,code) => {
    try {
        
        const result = await rps_verifyUser(user_id,code);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During Verification Process : '+error.message, error.statusCode || 500);
    }
};

const svc_resetUserCreds = async (user_id, password) => {
    try {
        
        const result = await rps_resetUserCreds(user_id, password);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured During Reset Creds Process : '+error.message, error.statusCode || 500);
    }
};

const svc_getUserDetails = async (user_id) => {
    try {
        const result = await rps_getUserDetails(user_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured While Getting User Details : '+error.message, error.statusCode || 500);
    }
};

const svc_getUsersDetails = async (search,limit,page) => {
    try {
        const result = await rps_getUsersDetails(search,limit,page);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured While Getting Users Details : '+error.message, error.statusCode || 500);
    }
};

const svc_updateUserDetails = async (user_id,update_feilds) => {
    try {
        const result = await rps_updateUserDetails(user_id,update_feilds);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured While Updating User Details : '+error.message, error.statusCode || 500);
    }
};

const svc_getWriterDetails = async (user_id) => {
    try {
        const result = await svc_getWriterDetails(user_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured While Getting Writer Details : '+error.message, error.statusCode || 500);
    }
};

const svc_getWritersDetails = async (search,limit,page) => {
    try {
        const result = await rps_getWritersDetails(search,limit,page);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured While Getting Writers Details : '+error.message, error.statusCode || 500);
    }
};

const svc_toogleFollow = async (user_id,follower_id) => {
    try {
        const result = await rps_toogleFollow(user_id,follower_id);
        return result ;

    } catch (error) {
        throw new CustomError('Error Occured While Toogle Follow : '+error.message, error.statusCode || 500);
    }
};


export {
    svc_signUp,
    svc_signIn,
    svc_verifyUser,
    svc_resetUserCreds,
    svc_signUpByGoogle,
    svc_signInByGoogle,
    svc_signOut,
    svc_updateUserDetails,
    svc_getUserDetails,
    svc_getUsersDetails,
    svc_getWriterDetails,
    svc_getWritersDetails,
    svc_toogleFollow,
};
