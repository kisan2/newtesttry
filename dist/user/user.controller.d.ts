import { UserService } from './user.service';
import { UserLoginDto } from './dto/login-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    removeUserId(id: string): Promise<{
        message: string;
    }>;
}
