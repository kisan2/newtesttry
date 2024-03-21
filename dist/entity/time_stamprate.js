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
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamprate = void 0;
const typeorm_1 = require("typeorm");
const base_Entity_1 = require("./base_Entity");
let timestamprate = class timestamprate extends base_Entity_1.BaseEntity {
};
exports.timestamprate = timestamprate;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], timestamprate.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], timestamprate.prototype, "rate", void 0);
exports.timestamprate = timestamprate = __decorate([
    (0, typeorm_1.Entity)()
], timestamprate);
//# sourceMappingURL=time_stamprate.js.map