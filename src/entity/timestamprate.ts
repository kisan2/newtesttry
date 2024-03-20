/* eslint-disable prettier/prettier */
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity()
export class timestamprate extends BaseEntity{
    @Column()
    timestamp:string

    @Column()
    rate:string
}