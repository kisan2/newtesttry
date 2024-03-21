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
exports.USDTWithdrawal = void 0;
const base_Entity_1 = require("../../entity/base_Entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let USDTWithdrawal = class USDTWithdrawal extends base_Entity_1.BaseEntity {
};
exports.USDTWithdrawal = USDTWithdrawal;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], USDTWithdrawal.prototype, "walletAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], USDTWithdrawal.prototype, "amountBeforeWithdrawal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], USDTWithdrawal.prototype, "withdrawalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], USDTWithdrawal.prototype, "amountAfterWithdrawal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "pending" }),
    __metadata("design:type", String)
], USDTWithdrawal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], USDTWithdrawal.prototype, "statusReason", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.USDTwithdrawal),
    __metadata("design:type", user_entity_1.User)
], USDTWithdrawal.prototype, "user", void 0);
exports.USDTWithdrawal = USDTWithdrawal = __decorate([
    (0, typeorm_1.Entity)()
], USDTWithdrawal);
//# sourceMappingURL=usdtWithdrawal.entity.js.map