import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user'

const userSchema: Schema = new Schema(
    {
        name:{ type: String, require: true},
        email:{ type: String, require: true, unique: true},
        gender:{type: String,require: true},
        status:{type: String}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('userdb', userSchema);


