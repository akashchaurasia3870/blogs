import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    user_id: { type: String, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
        country: { type: String, required: true, default: "WANO" },
        state: { type: String, required: true, default: "ONIGASHIMA" },
        city: { type: String, required: true, default: "FLOWER CAPITAL" },
        street: { type: String, required: true, default: "NEW_STREET" },
        pincode: { type: String, required: true, default: "123-123" },
        landmark: { type: String, required: true, default: "WATER-7" }
    },
    age: { type: Number, required: true, default: '24' },
    dob: { type: Date, required: true, default: '2000-01-01' },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
    bio: { type: String, required: true, default: "Hello World 😎" },
    occupation: { type: String, required: true, default: "Student" },
    phone: { type: String, required: true, default: "0000-0000-0000" },
    google_access_token: { type: String, default: "google_access_token" },
    google_refresh_token: { type: String, default: "google_refresh_token" },
    verified: { type: Boolean, default: false},
    userImage: { type: String, default: "" },
    roles: { type: [String], default: ['user'] },
    deleted: { type: Boolean, default: false },
    blogs_count:{type:Number,default:0},
    followers_list:{type:[String],default:[]},
    following_list:{type:[String],default:[]},
    bookmark_blogs:{type:[String],default:[]}
}, { timestamps: true });

const User = model('users', userSchema);

export default User;
