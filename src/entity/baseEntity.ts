/* eslint-disable prettier/prettier */
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @UpdateDateColumn()
    updatedAt:Date

    @CreateDateColumn()
    createdAt:Date

    @DeleteDateColumn()
    deletedAt:Date

}