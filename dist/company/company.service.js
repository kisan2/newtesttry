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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const CompanyBasicInfo_entity_1 = require("./entities/CompanyBasicInfo.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallet_entity_1 = require("./entities/wallet.entity");
let CompanyService = class CompanyService {
    constructor(companyRepo, walletRepo) {
        this.companyRepo = companyRepo;
        this.walletRepo = walletRepo;
    }
    async getWalletInfo() {
        try {
            const data = await this.walletRepo.find({});
            if (!data || data.length == 0) {
                throw new common_1.HttpException("no data in database", common_1.HttpStatus.NOT_FOUND);
            }
            return { data };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addWalletInfo(depositQr, walletInfo) {
        try {
            console.log(depositQr);
            console.log(walletInfo);
            const data = await this.walletRepo.find({});
            if (data.length > 0) {
                if (depositQr) {
                    data[0].depositQr = depositQr.filename;
                }
                Object.assign(data[0], walletInfo);
                const result = await this.walletRepo.save(data);
                if (!result) {
                    throw new common_1.HttpException("cannot update data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return { message: "update successfully" };
            }
            else {
                let depositQr;
                if (depositQr) {
                    depositQr = depositQr.filename;
                }
                const wallet = this.walletRepo.create({ ...walletInfo, depositQr: depositQr });
                const company = this.walletRepo.save(wallet);
                if (!company) {
                    throw new common_1.HttpException("cannot save data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return { message: "successfully added" };
            }
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCompanyInfo() {
        try {
            const companyInfo = await this.companyRepo.find({});
            if (!companyInfo || companyInfo.length == 0) {
                throw new common_1.HttpException("cannot find data", common_1.HttpStatus.NOT_FOUND);
            }
            return { companyInfo };
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addBasicInfo(files, companyInfo) {
        try {
            const data = await this.companyRepo.find({});
            if (data.length > 0) {
                if (files) {
                    if (files?.banner && files?.banner?.length > 0) {
                        data[0].banner = files.banner[0].filename;
                    }
                    if (files?.logo && files?.logo.length > 0) {
                        data[0].logo = files.logo[0].filename;
                    }
                }
                Object.assign(data, companyInfo);
                const result = await this.companyRepo.save(data);
                if (!result) {
                    throw new common_1.HttpException("cannot update data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return { message: "update successfully" };
            }
            let banner;
            let logo;
            if (files) {
                if (files?.banner && files?.banner?.length > 0) {
                    banner = files.banner[0].filename;
                }
                if (files?.logo && files?.logo.length > 0) {
                    logo = files.logo[0].filename;
                }
            }
            const newCompany = this.companyRepo.create({ ...companyInfo, banner: banner, logo: logo });
            const company = this.companyRepo.save(newCompany);
            if (!company) {
                throw new common_1.HttpException("cannot save data", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(CompanyBasicInfo_entity_1.CompanyInfo)),
    __param(1, (0, typeorm_1.InjectRepository)(wallet_entity_1.walletInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=company.service.js.map