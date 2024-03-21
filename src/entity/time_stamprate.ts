/* eslint-disable prettier/prettier */
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base_Entity";

@Entity()
export class timestamprate extends BaseEntity{
    @Column()
    timestamp:string

    @Column()
    rate:string
}