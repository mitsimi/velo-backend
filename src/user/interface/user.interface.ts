import { Date, Document } from 'mongoose';

export interface User extends Document {
    id: string;
    firstname: string; 
    lastname?: string; 
    email: string;
    password: string;
    created_at: Date;
}