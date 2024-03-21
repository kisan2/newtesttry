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
exports.WithdrawalController = void 0;
const common_1 = require("@nestjs/common");
const withdrawal_service_1 = require("./withdrawal.service");
const create_withdrawal_dto_1 = require("./dto/create-withdrawal.dto");
const swagger_1 = require("@nestjs/swagger");
const update_withdrawal_dto_1 = require("./dto/update-withdrawal.dto");
const Role_decorator_1 = require("../decorator/Role.decorator");
const roles_1 = require("../util/roles");
const CanAccess_guard_1 = require("../Guard/CanAccess.guard");
const updateUSDTwithdrawal_dto_1 = require("./dto/updateUSDTwithdrawal.dto");
const createUSDTwithdrawal_dto_1 = require("./dto/createUSDTwithdrawal.dto");
let WithdrawalController = class WithdrawalController {
    constructor(withdrawalService) {
        this.withdrawalService = withdrawalService;
    }
    async requestForWithdraww(req, withdrawalDto) {
        try {
            return await this.withdrawalService.requestBankWithdraww(req, withdrawalDto);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async requestUSDTWithdraww(req, USDTwithdrawal) {
        try {
            return await this.withdrawalService.requestUSDTWithdraww(req, USDTwithdrawal);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateBankStatus(id, data) {
        try {
            return await this.withdrawalService.updateBankStatus(id, data);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUSDTStatus(id, data) {
        try {
            return await this.withdrawalService.updateUSDTStatus(id, data);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllwithdrwal() {
        try {
            return await this.withdrawalService.getAllwithdrwal();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUSDTwithdrwal() {
        try {
            return await this.withdrawalService.getAllUSDTwithdrwal();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.WithdrawalController = WithdrawalController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.user),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_withdrawal_dto_1.CreateWithdrawalDto]),
    __metadata("design:returntype", Promise)
], WithdrawalController.prototype, "requestForWithdraww", null);
__decorate([
    (0, common_1.Post)("usdtWithdrawalReq"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.user),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createUSDTwithdrawal_dto_1.CreateUSDTWithdrawalDto]),
    __metadata("design:returntype", Promise)
], WithdrawalController.prototype, "requestUSDTWithdraww", null);
__decorate([
    (0, common_1.Patch)("updateBankStatus/:id"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_withdrawal_dto_1.UpdateWithdrawalDto]),
    __metadata("design:returntype", Promise)
], WithdrawalController.prototype, "updateBankStatus", null);
__decorate([
    (0, common_1.Patch)("updateUSDTStatus/:id"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateUSDTwithdrawal_dto_1.UpdateUSDTWithdrawalDto]),
    __metadata("design:returntype", Promise)
], WithdrawalController.prototype, "updateUSDTStatus", null);
__decorate([
    (0, common_1.Get)("getAllData"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WithdrawalController.prototype, "getAllwithdrwal", null);
__decorate([
    (0, common_1.Get)('GetAllUSDTdata'),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WithdrawalController.prototype, "getAllUSDTwithdrwal", null);
exports.WithdrawalController = WithdrawalController = __decorate([
    (0, common_1.Controller)('withdrawal'),
    (0, swagger_1.ApiTags)('withdrawal'),
    __metadata("design:paramtypes", [withdrawal_service_1.WithdrawalService])
], WithdrawalController);
//# sourceMappingURL=withdrawal.controller.js.map