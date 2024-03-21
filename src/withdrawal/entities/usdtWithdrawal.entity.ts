/* eslint-disable prettier/prettier */
import { BaseEntity } from "../../entity/base_Entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class USDTWithdrawal extends BaseEntity{

    @Column()
    walletAddress:string

    @Column()
    amountBeforeWithdrawal:string

    @Column()
    withdrawalAmount:string

    @Column()
    amountAfterWithdrawal:string

    @Column({default:"pending"})
    status:string

    @Column('longtext',{nullable:true})
    statusReason:string

    @ManyToOne(()=>User,(user)=>user.USDTwithdrawal)
    user:User


}