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
exports.AmountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Amount_entities_1 = require("./entities/Amount.entities");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let AmountService = class AmountService {
    constructor(AmountRepo, userRepo) {
        this.AmountRepo = AmountRepo;
        this.userRepo = userRepo;
    }
    async updateAmount(AmountDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: (0, typeorm_2.Equal)(AmountDto.userId) }, relations: { amount: true } });
            if (!user) {
                throw new common_1.HttpException("no user found", common_1.HttpStatus.NOT_FOUND);
            }
            const newAmount = user.amount;
            Object.assign(newAmount, AmountDto);
            const result = await this.AmountRepo.save(newAmount);
            if (!result) {
                throw new common_1.HttpException("cannot save data ", common_1.HttpStatus.FORBIDDEN);
            }
            return { message: "save successfully" };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AmountService = AmountService;
exports.AmountService = AmountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Amount_entities_1.Amount)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, typeorm_2.Repository])
], AmountService);
//# sourceMappingURL=Amount.service.js.map