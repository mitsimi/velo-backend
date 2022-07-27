import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async addUser(
        @Body('firstname') firstname: string,
        @Body('lastname') lastname: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const generatedId = await this.userService.newUser(
            firstname,
            lastname,
            email,
            password
        );
        return { id: generatedId };
    }

    @Get()
    async listAllUser() {
        return await this.userService.getAllUser();
    }

    @Get(':id')
    listUser(@Param('id') userId: string) {
        return this.userService.getUserById(userId);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') userId: string,
        @Body('firstname') userFirstname: string,
        @Body('lastname') userLastname: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
    ) {
        await this.userService.updateUser(userId, userFirstname, userLastname, userEmail, userPassword);
        return null;
    }

    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        await this.userService.deleteUser(userId);
        return null;
    }
}