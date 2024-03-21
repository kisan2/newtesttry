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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const swagger_1 = require("@nestjs/swagger");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
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