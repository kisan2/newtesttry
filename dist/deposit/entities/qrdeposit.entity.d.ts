import { BaseEntity } from "../../entity/base_Entity";
import { User } from "src/user/entities/user.entity";
export declare class QrDeposit extends BaseEntity {
    recipt: string;
    status: string;
    statusReason: string;
    user: User;
}
