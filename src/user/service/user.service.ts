import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';

import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) { }

    async newUser(
        firstname: string,
        lastname: string,
        email: string,
        userPassword: string
    ) {
        const created_at = Date.now();
        const password = await bcrypt.hash(userPassword, 12);
        email = email.toLocaleLowerCase();

        const newUser = new this.userModel({
            firstname,
            lastname,
            email,
            password,
            created_at
        });
        const result = await newUser.save();
        return result.id as string;
    }

    async getAllUser() {
        const users = await this.userModel.find().exec();
        return users.map(usr => ({
            id: usr.id,
            firstname: usr.firstname,
            lastname: usr.lastname,
            email: usr.email,
            password: usr.password,
            created_at: usr.created_at,
        }));
    }

    async getUserById(userId: string) {
        const user = await this.userModel.findById(userId);
        return {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            created_at: user.created_at,
        };
    }

    async getUserByEmail(userEmail: string) {

        const user = await this.userModel.findOne({ email: userEmail.toLocaleLowerCase() }).exec();
        console.log(user);
        return user ? {
            id: user._id,
            email: user.email,
            password: user.password,
        } : null;
    }

    async updateUser(
        userId: string,
        firstname: string,
        lastname: string,
        email: string,
        password: string
    ) {
        const updatedUser = await this.userModel.findById(userId);

        if (firstname) {
            updatedUser.firstname = firstname;
        }
        if (lastname) {
            updatedUser.lastname = lastname;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (password) {
            updatedUser.password = password;
        }

        updatedUser.save();
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find user.');
        }
    }
} 