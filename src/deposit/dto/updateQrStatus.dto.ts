/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class updateQrStatus{
    @ApiProperty()
    @IsNotEmpty()
    @IsIn(["pending","completed","rejected"])
    status:string

    
    @ApiProperty()
    statusReason:string
}