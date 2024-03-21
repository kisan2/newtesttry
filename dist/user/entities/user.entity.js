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
exports.User = void 0;
const Amount_entities_1 = require("../../Amount/entities/Amount.entities");
const deposit_entity_1 = require("../../deposit/entities/deposit.entity");
const qrdeposit_entity_1 = require("../../deposit/entities/qrdeposit.entity");
const base_Entity_1 = require("../../entity/base_Entity");
const trade_entities_1 = require("../../trade/entities/trade.entities");
const usdtWithdrawal_entity_1 = require("../../withdrawal/entities/usdtWithdrawal.entity");
const withdrawal_entity_1 = require("../../withdrawal/entities/withdrawal.entity");
const typeorm_1 = require("typeorm");
let User = class User extends base_Entity_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phoneNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "validId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "creditScore", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deposit_entity_1.Deposit, (deposite) => deposite.user),
    __metadata("design:type", Array)
], User.prototype, "deposit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => qrdeposit_entity_1.QrDeposit, (qrdeposite) => qrdeposite.user),
    __metadata("design:type", Array)
], User.prototype, "qrDeposit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => withdrawal_entity_1.Withdrawal, (withdrawal) => withdrawal.user),
    __metadata("design:type", Array)
], User.prototype, "withdrawal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usdtWithdrawal_entity_1.USDTWithdrawal, (withdrawal) => withdrawal.user),
    __metadata("design:type", Array)
], User.prototype, "USDTwithdrawal", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Amount_entities_1.Amount, (amount) => amount.user),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Amount_entities_1.Amount)
], User.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trade_entities_1.Trade, (trade) => trade.user),
    __metadata("design:type", trade_entities_1.Trade)
], User.prototype, "trade", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["email"])
], User);
//# sourceMappingURL=user.entity.js.map