/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsString } from "class-validator"

export class CompanyInfoDto{

    @ApiProperty({type:"string",format:"binary"})
    @Transform(({value} ) => value.buffer)
    depositQr:string

    @ApiProperty({type:"string",format:"binary"})
    @Transform(({value} ) => value.buffer)
    banner:string
    
    @ApiProperty()
    @IsString()
    sologan:string

    @ApiProperty({type:"string",format:"binary"})
    @Transform(({value} ) => value.buffer)
    logo:string

}