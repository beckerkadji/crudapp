import { Document, ObjectId } from 'mongoose';

export default interface IUser extends Document{
    _id: ObjectId;
    Name: string;
    Email: string;
    Gender: string;
    Status: string;
}