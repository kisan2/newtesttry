/* eslint-disable prettier/prettier */
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Cache } from "cache-manager";



@Injectable()
export class CanAccess implements CanActivate{

    constructor(private reflector:Reflector,private jwtService:JwtService,@Inject(CACHE_MANAGER) private CacheManager:Cache){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles =  this.reflector.get<string[]>('roles',context.getHandler())
        const req = context.switchToHttp().getRequest()
        const token = req.headers.authorization;
        if(!token){
            return false;
        }

        const newToken = token.split(" ")[1];
        // const cacheManage:any = await this.CacheManager.get(`token:${newToken}`);
        // if(!cacheManage){
        //     throw new HttpException("invalid token",HttpStatus.NOT_FOUND)
        // }
        const decode = await this.jwtService.decode(await this.CacheManager.get(`token:${newToken}`));
        if(!decode){
            return false;
        }
        if(roles.includes(decode.role)){
            req.user = decode;
            return true;
        }else{
            return false
        }
    }    
}