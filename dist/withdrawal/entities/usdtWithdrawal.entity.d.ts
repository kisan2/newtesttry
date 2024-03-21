import { BaseEntity } from "../../entity/base_Entity";
import { User } from "../../user/entities/user.entity";
export declare class USDTWithdrawal extends BaseEntity {
    walletAddress: string;
    amountBeforeWithdrawal: string;
    withdrawalAmount: string;
    amountAfterWithdrawal: string;
    status: string;
    statusReason: string;
    user: User;
}
