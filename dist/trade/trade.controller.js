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
exports.TradeController = void 0;
const common_1 = require("@nestjs/common");
const trade_service_1 = require("./trade.service");
const swagger_1 = require("@nestjs/swagger");
const Role_decorator_1 = require("../decorator/Role.decorator");
const roles_1 = require("../util/roles");
const CanAccess_guard_1 = require("../Guard/CanAccess.guard");
const timestamp_dto_1 = require("./dto/timestamp.dto");
const trade_dto_1 = require("./dto/trade.dto");
let TradeController = class TradeController {
    constructor(tradeService) {
        this.tradeService = tradeService;
    }
    async timestampRate(timestampDto) {
        try {
            return await this.tradeService.timestamprate(timestampDto);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async gettimestamp() {
        try {
            return await this.tradeService.gettimestamp();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async buyAndSell(TradeDto, req) {
        try {
            return await this.tradeService.buyAndSell(req, TradeDto);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllTrade() {
        try {
            return await this.tradeService.getAllTrade();
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTradeByUser(req) {
        try {
            return await this.tradeService.getTradeByUser(req);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TradeController = TradeController;
__decorate([
    (0, common_1.Post)('timestampRate'),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timestamp_dto_1.TimestampDto]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "timestampRate", null);
__decorate([
    (0, common_1.Get)("timestamp"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin, roles_1.roles.user),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "gettimestamp", null);
__decorate([
    (0, common_1.Post)("buy"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.user),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trade_dto_1.tradeDto, Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "buyAndSell", null);
__decorate([
    (0, common_1.Get)('getAllTrade'),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getAllTrade", null);
__decorate([
    (0, common_1.Get)('getTradeByUser'),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    (0, Role_decorator_1.Roles)(roles_1.roles.user),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getTradeByUser", null);
exports.TradeController = TradeController = __decorate([
    (0, common_1.Controller)('trade'),
    (0, swagger_1.ApiTags)("trade"),
    __metadata("design:paramtypes", [trade_service_1.TradeService])
], TradeController);
//# sourceMappingURL=trade.controller.js.map