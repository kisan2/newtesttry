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
exports.WithdrawalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const withdrawal_entity_1 = require("./entities/withdrawal.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const Amount_entities_1 = require("../Amount/entities/Amount.entities");
const usdtWithdrawal_entity_1 = require("./entities/usdtWithdrawal.entity");
const status_1 = require("../util/status");
let WithdrawalService = class WithdrawalService {
    constructor(withdrawRepo, userRepo, amount, USDTRepo) {
        this.withdrawRepo = withdrawRepo;
        this.userRepo = userRepo;
        this.amount = amount;
        this.USDTRepo = USDTRepo;
    }
    async updateUSDTStatus(id, data) {
        try {
            const USDTwithdrawal = await this.USDTRepo.findOne({ where: { id: (0, typeorm_2.Equal)(id) }, relations: { user: { amount: true } } });
            if (!USDTwithdrawal) {
                throw new common_1.HttpException("Invalid Withdrawal id", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (USDTwithdrawal.status == status_1.status.pending && data.status == status_1.status.rejected) {
                const newAmount = ((+USDTwithdrawal.user.amount.balance) + (+USDTwithdrawal.withdrawalAmount)).toString();
                const amount = USDTwithdrawal.user.amount;
                Object.assign(amount, { balance: newAmount });
                const amountData = await this.amount.save(amount);
                if (!amountData) {
                    throw new common_1.HttpException('cannot save data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                Object.assign(USDTwithdrawal, data);
                const walletdata = await this.USDTRepo.save(USDTwithdrawal);
                if (!walletdata) {
                    throw new common_1.HttpException("cannot update", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return { message: "update successfully" };
            }
            else {
                Object.assign(USDTwithdrawal, data);
                const withdrawalData = await this.USDTRepo.save(USDTwithdrawal);
                if (!withdrawalData) {
                    throw new common_1.HttpException("cannot save data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return { message: "update sucessfully" };
            }
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUSDTwithdrwal() {
        try {
            const data = await this.USDTRepo.find({ relations: { user: true } });
            if (!data || data.length == 0) {
                throw new common_1.HttpException("cannot get data", common_1.HttpStatus.NOT_FOUND);
            }
            return { data };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async requestUSDTWithdraww(req, USDTwithdrawal) {
        try {
            const user = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(req.user.id) }, relations: { withdrawal: true, amount: true, deposit: true } });
            console.log(user);
            if (!user) {
                throw new common_1.HttpException("user not found", common_1.HttpStatus.NOT_FOUND);
            }
            if (+user.amount.balance < +USDTwithdrawal.withdrawalAmount) {
                throw new common_1.HttpException("Insuffecent balance", common_1.HttpStatus.NOT_FOUND);
            }
            Object.assign(user.amount, { balance: (+user.amount.balance - (+USDTwithdrawal.withdrawalAmount)).toString() });
            await this.amount.save(user.amount);
            const newInfo = this.USDTRepo.create({ ...USDTwithdrawal, amountAfterWithdrawal: (+user.amount.balance - (+USDTwithdrawal.withdrawalAmount)).toString(), amountBeforeWithdrawal: (user.amount.balance), user: user });
            const result = await this.USDTRepo.save(newInfo);
            if (!result) {
                return { message: "cannot save data" };
            }
            return { message: "save successfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllwithdrwal() {
        try {
            const data = await this.withdrawRepo.find({ relations: { user: true } });
            if (!data) {
                throw new common_1.HttpException("cannot data", common_1.HttpStatus.NOT_FOUND);
            }
            return { data };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateBankStatus(id, data) {
        try {
            const withdrawal = await this.withdrawRepo.findOne({ where: { id: (0, typeorm_2.Equal)(id) }, relations: { user: { amount: true } } });
            if (!withdrawal) {
                throw new common_1.HttpException("Invalid Withdrawal id", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (withdrawal.status == status_1.status.pending && data.status == status_1.status.rejected) {
                const newAmount = ((+withdrawal.user.amount.balance) + (+withdrawal.withdrawalAmount)).toString();
                const amount = withdrawal.user.amount;
                Object.assign(amount, { balance: newAmount });
                const amountData = await this.amount.save(amount);
                if (!amountData) {
                    throw new common_1.HttpException('cannot save data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                Object.assign(withdrawal, data);
                const walletdata = await this.withdrawRepo.save(withdrawal);
                if (!walletdata) {
                    throw new common_1.HttpException("cannot update wallet", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return { message: "update successfully" };
            }
            else {
                Object.assign(withdrawal, data);
                const walletdata = await this.withdrawRepo.save(withdrawal);
                if (!walletdata) {
                    throw new common_1.HttpException("canont update data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return { message: "update sucessfully" };
            }
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async requestBankWithdraww(req, withdrawalDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(req.user.id) }, relations: { withdrawal: true, amount: true, deposit: true } });
            console.log(user);
            if (!user) {
                throw new common_1.HttpException("user not found", common_1.HttpStatus.NOT_FOUND);
            }
            if (+user.amount.balance < +withdrawalDto.withdrawalAmount) {
                throw new common_1.HttpException("Insuffecent balance", common_1.HttpStatus.NOT_FOUND);
            }
            Object.assign(user.amount, { balance: (+user.amount.balance - (+withdrawalDto.withdrawalAmount)).toString() });
            await this.amount.save(user.amount);
            const newInfo = this.withdrawRepo.create({ ...withdrawalDto, amountAfterWithdrawal: (+user.amount.balance - (+withdrawalDto.withdrawalAmount)).toString(), amountBeforeWithdrawal: (user.amount.balance), user: user });
            const result = await this.withdrawRepo.save(newInfo);
            if (!result) {
                return { message: "cannot save data" };
            }
            return { message: "save successfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.WithdrawalService = WithdrawalService;
exports.WithdrawalService = WithdrawalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(withdrawal_entity_1.Withdrawal)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Amount_entities_1.Amount)),
    __param(3, (0, typeorm_1.InjectRepository)(usdtWithdrawal_entity_1.USDTWithdrawal)),
    __metadata("design:paramtypes", [typeorm_2.Repository, typeorm_2.Repository, typeorm_2.Repository, typeorm_2.Repository])
], WithdrawalService);
//# sourceMappingURL=withdrawal.service.js.map