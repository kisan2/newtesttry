"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../admin/entities/admin.entity");
const user_entity_1 = require("../user/entities/user.entity");
const withdrawal_entity_1 = require("../withdrawal/entities/withdrawal.entity");
const deposit_entity_1 = require("../deposit/entities/deposit.entity");
const trade_entities_1 = require("../trade/entities/trade.entities");
const Amount_entities_1 = require("../Amount/entities/Amount.entities");
const time_stamprate_1 = require("../entity/time_stamprate");
const qrdeposit_entity_1 = require("../deposit/entities/qrdeposit.entity");
const CompanyBasicInfo_entity_1 = require("../company/entities/CompanyBasicInfo.entity");
const wallet_entity_1 = require("../company/entities/wallet.entity");
const usdtWithdrawal_entity_1 = require("../withdrawal/entities/usdtWithdrawal.entity");
let DatabaseConnection = class DatabaseConnection {
};
exports.DatabaseConnection = DatabaseConnection;
exports.DatabaseConnection = DatabaseConnection = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: "postgres://default:0zSdkW2qoKHt@ep-weathered-silence-a4d0u2v8-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
                synchronize: true,
                logging: true,
                entities: [admin_entity_1.Admin, user_entity_1.User, withdrawal_entity_1.Withdrawal, deposit_entity_1.Deposit, Amount_entities_1.Amount, trade_entities_1.Trade, time_stamprate_1.timestamprate, qrdeposit_entity_1.QrDeposit, CompanyBasicInfo_entity_1.CompanyInfo, wallet_entity_1.walletInfo, usdtWithdrawal_entity_1.USDTWithdrawal],
                autoLoadEntities: true,
            }),
        ],
    })
], DatabaseConnection);
//# sourceMappingURL=database.config.js.map