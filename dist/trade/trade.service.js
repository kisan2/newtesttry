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
exports.TradeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const time_stamprate_1 = require("../entity/time_stamprate");
const typeorm_2 = require("typeorm");
const Amount_entities_1 = require("../Amount/entities/Amount.entities");
const user_entity_1 = require("../user/entities/user.entity");
const trade_entities_1 = require("./entities/trade.entities");
let TradeService = class TradeService {
    constructor(timestampRepo, amountRepo, userRepo, tradeRepo) {
        this.timestampRepo = timestampRepo;
        this.amountRepo = amountRepo;
        this.userRepo = userRepo;
        this.tradeRepo = tradeRepo;
    }
    async getTradeByUser(req) {
        try {
            const data = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(req.user.id) }, relations: { trade: true } });
            if (!data) {
                throw new common_1.HttpException("Invalid user id", common_1.HttpStatus.NOT_FOUND);
            }
            return { trade: data.trade };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllTrade() {
        try {
            const trade = await this.tradeRepo.find({ relations: { user: true } });
            if (!trade || trade.length == 0) {
                throw new common_1.HttpException("no data in database", common_1.HttpStatus.NOT_FOUND);
            }
            return { trade };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async buyAndSell(req, TradeDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(req.user.id) }, relations: { amount: true } });
            if (!user) {
                throw new common_1.HttpException("wrong userid", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            if (+user.amount.balance < +TradeDto.amount) {
                throw new common_1.HttpException("Insufficent balance", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const createTrade = this.tradeRepo.create({ ...TradeDto, user: user });
            const trade = await this.tradeRepo.save(createTrade);
            if (!trade) {
                throw new common_1.HttpException("cannot buy a coin", common_1.HttpStatus.FORBIDDEN);
            }
            const newAmount = +user.amount.balance - +TradeDto.amount;
            const amt = this.amountRepo.create({ ...user.amount, balance: newAmount.toString() });
            Object.assign(user.amount, amt);
            const amount = await this.amountRepo.save(user.amount);
            if (!amount) {
                throw new common_1.HttpException("cannot update amount", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            setTimeout(async () => {
                const stamp = await this.timestampRepo.findOne({ where: { timestamp: (0, typeorm_2.Equal)(TradeDto.timestamp) } });
                const profit = (+TradeDto.amount) + (((+stamp.rate) / 100) * (+TradeDto.amount));
                const newtrade = this.tradeRepo.create({ ...trade, tradeAmount: TradeDto.amount, amountAfterTrade: profit.toString(), tradestatus: "close" });
                await this.tradeRepo.save(newtrade);
                const newAmount = +amount.balance + profit;
                const finalamount = this.amountRepo.create({ ...amount, balance: newAmount.toString() });
                Object.assign(amount, finalamount);
                await this.amountRepo.save(finalamount);
            }, 60000 * +TradeDto.timestamp);
            console.log("end");
            return { message: `successfully buy ${TradeDto.coin}` };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async gettimestamp() {
        try {
            const result = await this.timestampRepo.find({});
            if (!result || result.length == 0) {
                throw new common_1.HttpException("cannot get data", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return { result };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async timestamprate(timestampDto) {
        try {
            const result = await this.timestampRepo.findOne({ where: { timestamp: (0, typeorm_2.Equal)(timestampDto.timestamp) } });
            if (!result) {
                const result = await this.timestampRepo.save(timestampDto);
                if (!result) {
                    throw new common_1.HttpException("cannot save data", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
                return { message: "save successfully" };
            }
            else {
                Object.assign(result, timestampDto);
                const timesatmp = await this.timestampRepo.save(result);
                if (!timesatmp) {
                    throw new common_1.HttpException("cannot update", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
                return { message: "update successfulyy" };
            }
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TradeService = TradeService;
exports.TradeService = TradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(time_stamprate_1.timestamprate)),
    __param(1, (0, typeorm_1.InjectRepository)(Amount_entities_1.Amount)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(trade_entities_1.Trade)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TradeService);
//# sourceMappingURL=trade.service.js.map