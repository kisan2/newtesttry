/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/entity/baseEntity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, OneToOne} from 'typeorm'

@Entity()
export class Amount extends BaseEntity{

    @Column({default:"0"})
    balance:string

    @OneToOne(()=>User,(user)=>user.amount)
    @JoinColumn()
    user:User

}