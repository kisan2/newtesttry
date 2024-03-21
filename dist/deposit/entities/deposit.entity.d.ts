import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../entity/base_Entity";
export declare class Deposit extends BaseEntity {
    amount: string;
    bankName: string;
    accountNO: string;
    accountHolderName: string;
    receipt: string;
    status: string;
    statusReason: string;
    user: User;
}
