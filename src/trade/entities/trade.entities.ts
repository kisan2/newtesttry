/* eslint-disable prettier/prettier */

import { BaseEntity } from "../../entity/base_Entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity()
export class Trade extends BaseEntity{
    // @Column()
    // tradetype:string

    @Column()
    tradeAmount:string

    @Column()
    timestamp:string

    @Column()
    amountAfterTrade:string

    @Column({default:"open"})
    tradestatus:string

    @Column()
    coin:string

    @ManyToOne(()=>User,(user)=>user.trade)
    user:User
}