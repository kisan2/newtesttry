import { BaseEntity } from "../../entity/base_Entity";
import { User } from "../../user/entities/user.entity";
export declare class Withdrawal extends BaseEntity {
    amountBeforeWithdrawal: string;
    withdrawalAmount: string;
    amountAfterWithdrawal: string;
    accountHolderName: string;
    bankName: string;
    accountNo: string;
    status: string;
    statusReason: string;
    user: User;
}
