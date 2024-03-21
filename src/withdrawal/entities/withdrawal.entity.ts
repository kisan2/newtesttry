/* eslint-disable prettier/prettier */
import { BaseEntity } from "../../entity/base_Entity";

import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Withdrawal extends BaseEntity{

    @Column()
    amountBeforeWithdrawal:string

    @Column()
    withdrawalAmount:string

    @Column()
    amountAfterWithdrawal:string

    @Column()
    accountHolderName:string

    @Column()
    bankName:string

    @Column()
    accountNo:string

    @Column({default:"pending"})
    status:string

    @Column({nullable:true})
    statusReason:string

    @ManyToOne(()=>User,(user)=>user.withdrawal)
    user:User


}
