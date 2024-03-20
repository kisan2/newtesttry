/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/entity/baseEntity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class Admin extends BaseEntity {
    @Column()
    email:string

    @Column()
    password:string
}
