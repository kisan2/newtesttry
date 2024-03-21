import { BaseEntity } from "../../entity/base_Entity";
import { User } from "../../user/entities/user.entity";
export declare class Trade extends BaseEntity {
    tradeAmount: string;
    timestamp: string;
    amountAfterTrade: string;
    tradestatus: string;
    coin: string;
    user: User;
}
