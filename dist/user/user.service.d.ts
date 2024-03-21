/// <reference types="multer" />
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserLoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Amount } from 'src/Amount/entities/Amount.entities';
import { Cache } from 'cache-manager';
export declare class UserService {
    private userRepo;
    private jwtService;
    private AmountRepo;
    private cacheManager;
    constructor(userRepo: Repository<User>, jwtService: JwtService, AmountRepo: Repository<Amount>, cacheManager: Cache);
    getAllData(): Promise<{
        users: User[];
    }>;
    getDelData(): Promise<{
        result: User[];
    }>;
    signup(files: {
        validId?: Express.Multer.File[];
        profile?: Express.Multer.File[];
    }, createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    getAllUserData(): Promise<{
        result: User[];
    }>;
    getUserById(id: string): Promise<{
        result: User;
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
    restore(id: string): Promise<{
        message: string;
    }>;
    userlogin(UserLoginDto: UserLoginDto): Promise<{
        message: string;
        token: string;
        userId: string;
    }>;
}
