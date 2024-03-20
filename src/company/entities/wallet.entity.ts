/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/entity/baseEntity";
import { Column, Entity } from "typeorm";

@Entity()
export class walletInfo extends BaseEntity{

    @Column()
    depositQr:string
    
    @Column()
    walletAddress:string

}