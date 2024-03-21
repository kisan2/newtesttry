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
exports.AmountController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Amount_dto_1 = require("./dto/Amount.dto");
const Role_decorator_1 = require("../decorator/Role.decorator");
const roles_1 = require("../util/roles");
const CanAccess_guard_1 = require("../Guard/CanAccess.guard");
const Amount_service_1 = require("./Amount.service");
let AmountController = class AmountController {
    constructor(amountService) {
        this.amountService = amountService;
    }
    async updateAmount(AmountDto) {
        try {
            return await this.amountService.updateAmount(AmountDto);
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AmountController = AmountController;
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBody)({
        type: Amount_dto_1.AmountDto,
    }),
    (0, Role_decorator_1.Roles)(roles_1.roles.admin),
    (0, common_1.UseGuards)(CanAccess_guard_1.CanAccess),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Amount_dto_1.AmountDto]),
    __metadata("design:returntype", Promise)
], AmountController.prototype, "updateAmount", null);
exports.AmountController = AmountController = __decorate([
    (0, common_1.Controller)('Amount'),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, swagger_1.ApiTags)("Amount"),
    __metadata("design:paramtypes", [Amount_service_1.AmountService])
], AmountController);
//# sourceMappingURL=Amount.controller.js.map