import { Amount } from "../../Amount/entities/Amount.entities";
import { Deposit } from "../../deposit/entities/deposit.entity";
import { QrDeposit } from "../../deposit/entities/qrdeposit.entity";
import { BaseEntity } from "../../entity/base_Entity";
import { Trade } from "../../trade/entities/trade.entities";
import { USDTWithdrawal } from "../../withdrawal/entities/usdtWithdrawal.entity";
import { Withdrawal } from "../../withdrawal/entities/withdrawal.entity";
export declare class User extends BaseEntity {
    fullName: string;
    email: string;
    password: string;
    country: string;
    phoneNo: string;
    validId: string;
    profile: string;
    address: string;
    creditScore: string;
    deposit: Deposit[];
    qrDeposit: QrDeposit[];
    withdrawal: Withdrawal[];
    USDTwithdrawal: USDTWithdrawal[];
    amount: Amount;
    trade: Trade;
}
