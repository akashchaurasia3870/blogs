import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
// Define the UserLogs schema
const userLogsSchema = new Schema({
    log_id: {
        type: String,
        default: uuidv4()
    },
    method: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    query: {
        type: Object,
        required: true
    },
    headers: {
        type: Object,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    protocol: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    IpAddress: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    userId: {
        type: String,
        ref: 'User'
    },
    date_entered: {
        type: Date,
        default: new Date().toISOString()
    }
});

// Create the UserLogs model using the schema
export const UserLogs = mongoose.model('logs', userLogsSchema);

