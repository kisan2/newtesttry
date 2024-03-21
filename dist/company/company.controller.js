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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const Role_decorator_1 = require("../decorator/Role.decorator");
const roles_1 = require("../util/roles");
const CanAccess_guard_1 = require("../Guard/CanAccess.guard");
const swagger_1 = require("@nestjs/swagger");
const create_CompanyInfo_dto_1 = require("./dto/create_CompanyInfo.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_g_config_1 = require("../config/multer_g.config");
const createWallet_dto_1 = require("./dto/createWallet.dto");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async addBasicInfo(files, companyInfo) {
        try {
            return await this.companyService.addBasicInfo(files, companyInfo);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addWalletInfo(depositQr, walletInfo) {
        try {
            return await this.companyService.addWalletInfo(depositQr, walletInfo);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCompanyInfo() {
        try {
            return await this.companyService.getCompanyInfo();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWalletInfo() {
        try {
            return await this.companyService.getWalletInfo();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Post)('postCompanyInfo'),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, swagger_1.ApiBody)({ type: create_CompanyInfo_dto_1.CompanyInfoDto }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'depositQr', maxCount: 1 },
        { name: "banner", maxCount: 1 },
        { name: "logo", maxCount: 1 }
    ], multer_g_config_1.multerOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_CompanyInfo_dto_1.CompanyInfoDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "addBasicInfo", null);
__decorate([
    (0, common_1.Post)('postWalletInfo'),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, swagger_1.ApiBody)({ type: createWallet_dto_1.createWalletDto }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('depositQr', multer_g_config_1.multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createWallet_dto_1.createWalletDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "addWalletInfo", null);
__decorate([
    (0, common_1.Get)('getCompanyInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyInfo", null);
__decorate([
    (0, common_1.Get)('getWalletInfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getWalletInfo", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)('company'),
    (0, swagger_1.ApiTags)("CompanyInfo"),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map