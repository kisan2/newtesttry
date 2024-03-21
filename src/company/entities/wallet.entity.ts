/* eslint-disable prettier/prettier */
import { BaseEntity } from "../../entity/base_Entity";

import { Column, Entity } from "typeorm";

@Entity()
export class walletInfo extends BaseEntity{

    @Column()
    depositQr:string
    
    @Column()
    walletAddress:string

}