/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/entity/baseEntity";
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