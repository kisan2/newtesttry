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
exports.DepositController = void 0;
const common_1 = require("@nestjs/common");
const deposit_service_1 = require("./deposit.service");
const swagger_1 = require("@nestjs/swagger");
const Role_decorator_1 = require("../decorator/Role.decorator");
const roles_1 = require("../util/roles");
const CanAccess_guard_1 = require("../Guard/CanAccess.guard");
const update_deposit_dto_1 = require("./dto/update-deposit.dto");
let DepositController = class DepositController {
    constructor(depositService) {
        this.depositService = depositService;
    }
    async getAllBankDeposit() {
        try {
            return await this.depositService.getAllBankDeposit();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateBankStatus(id, updateStatus) {
        try {
            return await this.depositService.updateBankStatus(id, updateStatus);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getQrDepositData() {
        try {
            return await this.depositService.getQrDepositData();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDepositById(id) {
        try {
            return await this.depositService.getDepositById(id);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateQrStatus(id, data) {
        try {
            return await this.depositService.updateQrStatus(id, data);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.DepositController = DepositController;
__decorate([
    (0, common_1.Get)(),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getAllBankDeposit", null);
__decorate([
    (0, common_1.Patch)("changeBankDepositStatus/:id"),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_deposit_dto_1.UpdateDepositDto]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "updateBankStatus", null);
__decorate([
    (0, common_1.Get)("getQrDeposit"),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getQrDepositData", null);
__decorate([
    (0, common_1.Get)('getQrDepositById/:id'),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin, roles_1.roles.user),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getDepositById", null);
__decorate([
    (0, common_1.Patch)("updateQrDepositStatus/:id"),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_deposit_dto_1.UpdateDepositDto]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "updateQrStatus", null);
exports.DepositController = DepositController = __decorate([
    (0, common_1.Controller)('deposit'),
    (0, swagger_1.ApiTags)('deposit'),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:paramtypes", [deposit_service_1.DepositService])
], DepositController);
//# sourceMappingURL=deposit.controller.js.map