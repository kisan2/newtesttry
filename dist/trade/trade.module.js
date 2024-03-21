"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeModule = void 0;
const common_1 = require("@nestjs/common");
const trade_service_1 = require("./trade.service");
const trade_controller_1 = require("./trade.controller");
const typeorm_1 = require("@nestjs/typeorm");
const time_stamprate_1 = require("../entity/time_stamprate");
const Amount_entities_1 = require("../Amount/entities/Amount.entities");
const user_entity_1 = require("../user/entities/user.entity");
const trade_entities_1 = require("./entities/trade.entities");
let TradeModule = class TradeModule {
};
exports.TradeModule = TradeModule;
exports.TradeModule = TradeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, time_stamprate_1.timestamprate, Amount_entities_1.Amount, trade_entities_1.Trade])],
        controllers: [trade_controller_1.TradeController],
        providers: [trade_service_1.TradeService],
    })
], TradeModule);
//# sourceMappingURL=trade.module.js.map