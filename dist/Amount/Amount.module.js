"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountModule = void 0;
const common_1 = require("@nestjs/common");
const Amount_service_1 = require("./Amount.service");
const Amount_controller_1 = require("./Amount.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Amount_entities_1 = require("./entities/Amount.entities");
const user_entity_1 = require("../user/entities/user.entity");
let AmountModule = class AmountModule {
};
exports.AmountModule = AmountModule;
exports.AmountModule = AmountModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Amount_entities_1.Amount, user_entity_1.User])],
        controllers: [Amount_controller_1.AmountController],
        providers: [Amount_service_1.AmountService],
    })
], AmountModule);
//# sourceMappingURL=Amount.module.js.map