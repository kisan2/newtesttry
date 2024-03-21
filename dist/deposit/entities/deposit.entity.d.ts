import { BaseEntity } from "../../entity/base_Entity";
import { User } from "src/user/entities/user.entity";
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
