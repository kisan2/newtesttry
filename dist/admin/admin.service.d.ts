import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { changePassword } from './dto/ChangeAdminPassword.dto';
import { Cache } from 'cache-manager';
export declare class AdminService {
    private adminRepo;
    private jwtService;
    private cacheManager;
    constructor(adminRepo: Repository<Admin>, jwtService: JwtService, cacheManager: Cache);
    login(createAdminDto: CreateAdminDto): Promise<{
        message: string;
        token: string;
    }>;
    signup(adminData: CreateAdminDto): Promise<{
        message: string;
    }>;
    changePassword(adminDto: changePassword): Promise<{
        message: string;
    }>;
}
