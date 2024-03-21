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
exports.UserService = void 0;
const roles_1 = require("./../util/roles");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const Amount_entities_1 = require("../Amount/entities/Amount.entities");
const cache_manager_1 = require("@nestjs/cache-manager");
let UserService = class UserService {
    constructor(userRepo, jwtService, AmountRepo, cacheManager) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.AmountRepo = AmountRepo;
        this.cacheManager = cacheManager;
    }
    async getAllData() {
        try {
            const users = await this.userRepo.find({});
            if (!users || users.length == 0) {
                throw new common_1.HttpException("cannot get data", common_1.HttpStatus.NOT_FOUND);
            }
            return { users };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDelData() {
        try {
            const result = await this.userRepo.find({ where: { deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) }, withDeleted: true });
            if (!result || result.length == 0) {
                throw new common_1.HttpException("No data in database", common_1.HttpStatus.FORBIDDEN);
            }
            return { result };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async signup(files, createUserDto) {
        try {
            if (files) {
                if (files.profile) {
                    createUserDto.profile = files.profile[0].filename;
                }
                if (files.validId) {
                    createUserDto.validId = files.validId[0].filename;
                }
            }
            const amount = await this.AmountRepo.save(this.AmountRepo.create({ balance: "0" }));
            const newpassword = await bcrypt.hash(createUserDto.password, 10);
            createUserDto.password = newpassword;
            const newuser = this.userRepo.create({ ...createUserDto, amount: amount });
            const user = await this.userRepo.save(newuser);
            if (!user) {
                throw new common_1.HttpException("cannot save user", common_1.HttpStatus.FORBIDDEN);
            }
            return { message: "Save successfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUserData() {
        try {
            const result = await this.userRepo.find({ relations: { deposit: true, withdrawal: true, amount: true } });
            if (!result || result.length == 0) {
                throw new common_1.HttpException("no data in database", common_1.HttpStatus.NO_CONTENT);
            }
            return { result };
        }
        catch (err) {
            throw new common_1.HttpException("something went wrong" + err, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserById(id) {
        try {
            const result = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(id) }, relations: { withdrawal: true, deposit: true, amount: true, trade: true } });
            if (!result) {
                throw new common_1.HttpException("no data found", common_1.HttpStatus.NOT_FOUND);
            }
            return { result };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUserById(files, id, updateUserDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
            if (!user) {
                throw new common_1.HttpException("user not found", common_1.HttpStatus.NO_CONTENT);
            }
            if (files) {
                if (files.profile) {
                    updateUserDto.profile = files.profile[0].filename;
                }
                if (files.validId) {
                    updateUserDto.validId = files.validId[0].filename;
                }
            }
            Object.assign(user, updateUserDto);
            const result = await this.userRepo.save(user);
            if (!result) {
                throw new common_1.HttpException("cannot save data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return { message: "update successfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeUserId(id) {
        try {
            const user = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(id) }, relations: { deposit: true, withdrawal: true, amount: true } });
            if (+user.amount.balance > 0) {
                throw new common_1.HttpException("cannot delete user, amount is more then 0", common_1.HttpStatus.FORBIDDEN);
            }
            if (!user) {
                throw new common_1.HttpException("Invalid Id", common_1.HttpStatus.NOT_FOUND);
            }
            const result = await this.userRepo.softRemove(user);
            if (!result) {
                throw new common_1.HttpException("cannot save data", common_1.HttpStatus.FORBIDDEN);
            }
            return { message: "remove succesffully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restore(id) {
        try {
            const data = await this.userRepo.findOne({ where: { deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()), id: (0, typeorm_2.Equal)(id) }, withDeleted: true });
            if (!data) {
                throw new common_1.HttpException("Invalid user id", common_1.HttpStatus.FORBIDDEN);
            }
            data.deletedAt = null;
            const result = await this.userRepo.save(data);
            if (!result) {
                throw new common_1.HttpException("cannot restore data", common_1.HttpStatus.FORBIDDEN);
            }
            return { message: "restore data" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async userlogin(UserLoginDto) {
        try {
            const user = await this.userRepo.findOne({ where: { email: UserLoginDto.email } });
            if (!user) {
                throw new common_1.HttpException("user not found", common_1.HttpStatus.UNAUTHORIZED);
            }
            if (!await bcrypt.compare(UserLoginDto.password, user.password)) {
                throw new common_1.HttpException("username or password is incorrect", common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = this.jwtService.sign({ username: user.email, id: user.id, role: roles_1.roles.user }, { expiresIn: "1d", secret: process.env.JWTSECRET });
            await this.cacheManager.set(`token:${token}`, token, 86400000);
            return { message: "sucessfully login", token: token, userId: user.id };
        }
        catch (err) {
            throw new common_1.HttpException("err" + err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Amount_entities_1.Amount)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService, typeorm_2.Repository, Object])
], UserService);
//# sourceMappingURL=user.service.js.map