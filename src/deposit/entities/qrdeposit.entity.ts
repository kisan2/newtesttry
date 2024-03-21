/* eslint-disable prettier/prettier */

import { BaseEntity } from "../../entity/base_Entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class QrDeposit extends BaseEntity{
    @Column()
    recipt:string

    @Column({default:"pending"})
    status:string

    @Column()
    statusReason:string

    @ManyToOne(()=>User,(user)=>user.deposit)
    user:User
}