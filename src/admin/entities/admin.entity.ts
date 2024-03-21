/* eslint-disable prettier/prettier */
import { BaseEntity } from "../../entity/base_Entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class Admin extends BaseEntity {
    @Column()
    email:string

    @Column()
    password:string
}
