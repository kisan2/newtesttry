/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class IsUserGuarad implements CanActivate{
    constructor(private jwtService:JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req =  context.switchToHttp().getRequest()
        const token = req.headers.authorization;
        if(!token){
            return false;
        }
        const newToken = token.split(" ")[1]
        console.log(newToken)
        const isVerify = await this.jwtService.verify(newToken)
        if(isVerify){
            return true
        }else{
            return false
        }

    }
    
}