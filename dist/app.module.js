"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = require("./config/database.config");
const user_module_1 = require("./user/user.module");
const admin_module_1 = require("./admin/admin.module");
const withdrawal_module_1 = require("./withdrawal/withdrawal.module");
const deposit_module_1 = require("./deposit/deposit.module");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const trade_module_1 = require("./trade/trade.module");
const Amount_module_1 = require("./Amount/Amount.module");
const jwt_1 = require("@nestjs/jwt");
const company_module_1 = require("./company/company.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            admin_module_1.AdminModule,
            withdrawal_module_1.WithdrawalModule,
            deposit_module_1.DepositModule,
            database_config_1.DatabaseConnection,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            jwt_1.JwtModule.register({
                secret: process.env.JWTSECRET,
                global: true,
                signOptions: {
                    expiresIn: "1d"
                }
            }),
            cache_manager_1.CacheModule.register({ isGlobal: true }),
            Amount_module_1.AmountModule,
            trade_module_1.TradeModule,
            company_module_1.CompanyModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map