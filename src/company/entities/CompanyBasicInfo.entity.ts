/* eslint-disable prettier/prettier */
import { BaseEntity } from "../../entity/base_Entity";
import { Column, Entity } from "typeorm";

@Entity()
export class CompanyInfo extends BaseEntity{

    @Column()
    banner:string
    
    @Column()
    sologan:string

    @Column()
    logo:string

}