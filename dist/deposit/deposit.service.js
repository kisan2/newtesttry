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
exports.DepositService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const deposit_entity_1 = require("./entities/deposit.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const qrdeposit_entity_1 = require("./entities/qrdeposit.entity");
const status_1 = require("../util/status");
let DepositService = class DepositService {
    constructor(depositRepo, userRepo, QrDepositRepo) {
        this.depositRepo = depositRepo;
        this.userRepo = userRepo;
        this.QrDepositRepo = QrDepositRepo;
    }
    async getQrDepositData() {
        try {
            const data = await this.QrDepositRepo.find({ relations: { user: true } });
            if (!data) {
                throw new common_1.HttpException("no data in database", common_1.HttpStatus.NOT_FOUND);
            }
            return { data };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateQrStatus(id, updateStatus) {
        try {
            const getDeposit = await this.QrDepositRepo.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
            if (!getDeposit) {
                throw new common_1.HttpException("Invalid Deposit Id", common_1.HttpStatus.NOT_FOUND);
            }
            if (getDeposit.status == status_1.status.complete) {
                throw new common_1.HttpException("sorry you can't update staus", common_1.HttpStatus.FORBIDDEN);
            }
            Object.assign(getDeposit, updateStatus);
            const result = await this.QrDepositRepo.save(getDeposit);
            if (!result) {
                throw new common_1.HttpException("cannot update status", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return { message: "sucessfully update status" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addQrDeposit(req, receipt) {
        try {
            const user = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(req.user.id) }, relations: { deposit: true } });
            if (!user) {
                throw new common_1.HttpException('Invalid user id', common_1.HttpStatus.NOT_FOUND);
            }
            let deposit;
            if (receipt) {
                deposit = this.QrDepositRepo.create({ user: user, recipt: receipt.filename });
            }
            const data = await this.QrDepositRepo.save(deposit);
            if (!data) {
                throw new common_1.HttpException("cannot save data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return { message: "save sucessfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateBankStatus(id, data) {
        try {
            const deposit = await this.depositRepo.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
            if (!deposit) {
                throw new common_1.HttpException("no data in database", common_1.HttpStatus.NO_CONTENT);
            }
            if (deposit.status == status_1.status.complete) {
                throw new common_1.HttpException("sorry you can't update status", common_1.HttpStatus.FORBIDDEN);
            }
            Object.assign(deposit, data);
            const result = await this.depositRepo.save(deposit);
            if (!result) {
                throw new common_1.HttpException("cannot save data", common_1.HttpStatus.NOT_FOUND);
            }
            return { message: "data update successfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDepositById(id) {
        try {
            const result = await this.depositRepo.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
            if (!result) {
                throw new common_1.HttpException('no data found in database', common_1.HttpStatus.NO_CONTENT);
            }
            return { result };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllBankDeposit() {
        try {
            const result = await this.depositRepo.find({ relations: { user: true } });
            if (!result || result.length == 0) {
                throw new common_1.HttpException("no data in database", common_1.HttpStatus.NO_CONTENT);
            }
            return { result };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addDepositInfo(req, receipt, createDepositDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(req.user.id) } });
            if (!user) {
                throw new common_1.HttpException("user not found", common_1.HttpStatus.NOT_FOUND);
            }
            const deposit = this.depositRepo.create({ ...createDepositDto, user: user, receipt: receipt.filename });
            return await this.depositRepo.save(deposit);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DepositService = DepositService;
exports.DepositService = DepositService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deposit_entity_1.Deposit)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(qrdeposit_entity_1.QrDeposit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DepositService);
//# sourceMappingURL=deposit.service.js.map