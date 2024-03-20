/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/entity/baseEntity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Deposit extends BaseEntity{

    @Column()
    amount:string

    @Column()
    bankName:string

    @Column()
    accountNO:string

    @Column()
    accountHolderName:string

    @Column()
    receipt:string

    @Column({default:"pending"})
    status:string

    @Column({default:null,nullable:true})
    statusReason:string

    @ManyToOne(()=>User,(user)=>user.deposit)
    user:User
}
