"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const roles_1 = require("../util/roles");
const cache_manager_1 = require("@nestjs/cache-manager");
let AdminService = class AdminService {
    constructor(adminRepo, jwtService, cacheManager) {
        this.adminRepo = adminRepo;
        this.jwtService = jwtService;
        this.cacheManager = cacheManager;
    }
    async login(createAdminDto) {
        try {
            const adminData = await this.adminRepo.findOne({ where: { email: createAdminDto.email } });
            if (!adminData) {
                throw new common_1.HttpException("no user found", common_1.HttpStatus.NOT_FOUND);
            }
            if (!await bcrypt.compare(createAdminDto.password, adminData.password)) {
                throw new common_1.HttpException("username or password is incorrect", common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = this.jwtService.sign({ email: adminData.email, id: adminData.id, role: roles_1.roles.admin }, { expiresIn: "1d", secret: process.env.JWTSECRET });
            console.log(token);
            await this.cacheManager.set(`token:${token}`, token, 86400000);
            return { message: 'login successfully', token: token };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async signup(adminData) {
        try {
            adminData.password = await bcrypt.hash(adminData.password, 10);
            const result = await this.adminRepo.save(adminData);
            if (!result) {
                throw new common_1.HttpException("cannot save data", common_1.HttpStatus.FORBIDDEN);
            }
            return { message: "save sucessfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changePassword(adminDto) {
        try {
            const admin = await this.adminRepo.findOne({ where: { email: adminDto.email } });
            if (!admin) {
                throw new common_1.HttpException('Admin not found', common_1.HttpStatus.NOT_FOUND);
            }
            const passwordMatch = await bcrypt.compare(adminDto.oldPassword, admin.password);
            if (!passwordMatch) {
                throw new common_1.HttpException('Old password is incorrect', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            admin.password = await bcrypt.hash(adminDto.newPassword, 10);
            const result = await this.adminRepo.save(admin);
            if (!result) {
                throw new common_1.HttpException("cannot save data", common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: "change succesfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService, Object])
], AdminService);
//# sourceMappingURL=admin.service.js.map