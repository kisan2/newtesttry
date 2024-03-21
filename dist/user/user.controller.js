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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const login_user_dto_1 = require("./dto/login-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_g_config_1 = require("../config/multer_g.config");
const CanAccess_guard_1 = require("../Guard/CanAccess.guard");
const Role_decorator_1 = require("../decorator/Role.decorator");
const roles_1 = require("../util/roles");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(files, createUserDto) {
        try {
            return await this.userService.signup(files, createUserDto);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async userlogin(userDto) {
        try {
            return await this.userService.userlogin(userDto);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUserData() {
        try {
            return await this.userService.getAllUserData();
        }
        catch (err) {
            throw new common_1.HttpException("something went wrong" + err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDelData() {
        try {
            return await this.userService.getDelData();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllData() {
        try {
            return await this.userService.getAllData();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restore(id) {
        try {
            return await this.userService.restore(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserById(id) {
        try {
            return await this.userService.getUserById(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUserById(files, id, updateUserDto) {
        try {
            return await this.userService.updateUserById(files, id, updateUserDto);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeUserId(id) {
        try {
            return await this.userService.removeUserId(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'validId', maxCount: 1 },
        { name: 'profile', maxCount: 1 }
    ], multer_g_config_1.multerOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userlogin", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUserData", null);
__decorate([
    (0, common_1.Get)("getDelData"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDelData", null);
__decorate([
    (0, common_1.Get)("getAllUser"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllData", null);
__decorate([
    (0, common_1.Post)("restore/:id"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "restore", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.user, roles_1.roles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: update_user_dto_1.UpdateUserDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'validId', maxCount: 1 },
        { name: 'profile', maxCount: 1 },
    ], multer_g_config_1.multerOptions)),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.user, roles_1.roles.admin),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeUserId", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map