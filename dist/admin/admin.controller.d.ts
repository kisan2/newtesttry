import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { changePassword } from './dto/ChangeAdminPassword.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    signup(createAdminDto: CreateAdminDto): Promise<{
        message: string;
    }>;
    login(createAdminDto: CreateAdminDto): Promise<{
        message: string;
        token: string;
    }>;
    changeAdminPassword(adminDto: changePassword): Promise<{
        message: string;
    }>;
}
