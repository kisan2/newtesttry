/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsNotEmpty} from "class-validator"


export class tradeDto{

    // @ApiProperty() 
    // @IsNotEmpty()
    // @IsIn(["buy","sell"])   
    // tradetype:string

    @ApiProperty()
    @IsNotEmpty() 
    amount:string

    @ApiProperty() 
    @IsNotEmpty()
    @IsIn(["1","2","3"])
    timestamp:string

    @ApiProperty()
    @IsNotEmpty()
    coin:string
}