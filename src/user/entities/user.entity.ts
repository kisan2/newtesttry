/* eslint-disable prettier/prettier */
import { Amount } from "src/Amount/entities/Amount.entities";
import { Deposit } from "src/deposit/entities/deposit.entity";
import { QrDeposit } from "src/deposit/entities/qrdeposit.entity";
import { BaseEntity } from "src/entity/baseEntity";
import { Trade } from "src/trade/entities/trade.entities";
import { USDTWithdrawal } from "src/withdrawal/entities/usdtWithdrawal.entity";
import { Withdrawal } from "src/withdrawal/entities/withdrawal.entity";
import { Column, Entity, JoinColumn, OneToMany,  OneToOne,  Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User extends BaseEntity{
    @Column()
    fullName:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    country:string

    @Column()
    phoneNo:string

    // @Column({nullable:true})
    // greenCard:string

    @Column({nullable:true})
    validId:string

    @Column()
    profile:string

    @Column()
    address:string

    @Column({nullable:true})
    creditScore:string

    @OneToMany(()=>Deposit,(deposite)=>deposite.user)
    deposit:Deposit[]

    @OneToMany(()=>QrDeposit,(qrdeposite)=>qrdeposite.user)
    qrDeposit:QrDeposit[]

    @OneToMany(()=>Withdrawal,(withdrawal)=>withdrawal.user)
    withdrawal:Withdrawal[]

    @OneToMany(()=>USDTWithdrawal,(withdrawal)=>withdrawal.user)
    USDTwithdrawal:USDTWithdrawal[]

    @OneToOne(()=>Amount,(amount)=>amount.user)
    @JoinColumn()
    amount:Amount

    @OneToMany(()=>Trade,(trade)=>trade.user)
    trade:Trade
}

