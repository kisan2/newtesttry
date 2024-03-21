import { Amount } from "src/Amount/entities/Amount.entities";
import { Deposit } from "src/deposit/entities/deposit.entity";
import { QrDeposit } from "src/deposit/entities/qrdeposit.entity";
import { BaseEntity } from "../../entity/base_Entity";
import { Trade } from "src/trade/entities/trade.entities";
import { USDTWithdrawal } from "src/withdrawal/entities/usdtWithdrawal.entity";
import { Withdrawal } from "src/withdrawal/entities/withdrawal.entity";
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
