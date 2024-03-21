import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Cache } from "cache-manager";
export declare class CanAccess implements CanActivate {
    private reflector;
    private jwtService;
    private CacheManager;
    constructor(reflector: Reflector, jwtService: JwtService, CacheManager: Cache);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
