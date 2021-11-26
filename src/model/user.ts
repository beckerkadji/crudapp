import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema: Schema = new Schema(
    {
        name:{type: String, require: true},
        email:{type: String, require: true, unique: true},
        gender:{type: String, require: true},
        status:{type: String}
    },
    {
        timestamps: true
    }
);



//used to avoid registering the same address twice in the database
userSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>('userdb', userSchema);



