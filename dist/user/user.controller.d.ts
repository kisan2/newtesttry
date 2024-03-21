/// <reference types="multer" />
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(files: {
        validId?: Express.Multer.File[];
        profile?: Express.Multer.File[];
    }, createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    userlogin(userDto: UserLoginDto): Promise<{
        message: string;
        token: string;
        userId: string;
    }>;
    getAllUserData(): Promise<{
        result: import("./entities/user.entity").User[];
    }>;
    getDelData(): Promise<{
        result: import("./entities/user.entity").User[];
    }>;
    getAllData(): Promise<{
        users: import("./entities/user.entity").User[];
    }>;
    restore(id: string): Promise<{
        message: string;
    }>;
    getUserById(id: string): Promise<{
        result: import("./entities/user.entity").User;
    }>;
    updateUserById(files: {
        validId?: Express.Multer.File[];
        profile?: Express.Multer.File[];
    }, id: string, updateUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    removeUserId(id: string): Promise<{
        message: string;
    }>;
}
