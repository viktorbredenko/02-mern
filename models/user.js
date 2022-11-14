import mongoose, { Mongoose } from 'mongoose';
import { stringify } from 'nodemon/lib/utils';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,

        },
        vatarUrl: String
    },
    {
        timestamps: true,
    }

);


export default mongoose.model('User', UserSchema);