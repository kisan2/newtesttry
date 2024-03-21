/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { changePassword } from './dto/ChangeAdminPassword.dto';
import { roles } from '../util/roles';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AdminService {

  constructor(@InjectRepository(Admin) private adminRepo:Repository<Admin>,private jwtService:JwtService,@Inject(CACHE_MANAGER) private cacheManager: Cache){}



  async login(createAdminDto: CreateAdminDto) {
    try{
      const adminData = await this.adminRepo.findOne({where:{email:createAdminDto.email}})
      if(!adminData){
        throw new HttpException("no user found",HttpStatus.NOT_FOUND)
      }
      if(!await bcrypt.compare(createAdminDto.password,adminData.password)){
        throw new HttpException("username or password is incorrect",HttpStatus.UNAUTHORIZED)
      }
      const token = this.jwtService.sign({email:adminData.email,id:adminData.id,role:roles.admin},{expiresIn:"1d",secret:process.env.JWTSECRET})
      console.log(token)
      await this.cacheManager.set(`token:${token}`,token,86400000)
      return {message:'login successfully',token:token}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async signup(adminData: CreateAdminDto) {
    try{
      adminData.password = await bcrypt.hash(adminData.password,10)
      const result =  await this.adminRepo.save(adminData)
      if(!result){
        throw new HttpException("cannot save data",HttpStatus.FORBIDDEN)
      }
      return {message:"save sucessfully"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async changePassword(adminDto:changePassword){
    try{
        const admin = await this.adminRepo.findOne({where:{email:adminDto.email}})
        if(!admin){
            throw new HttpException('Admin not found',HttpStatus.NOT_FOUND);
        }
        const passwordMatch = await bcrypt.compare(adminDto.oldPassword, admin.password);

        if (!passwordMatch) {
            throw new HttpException('Old password is incorrect',HttpStatus.INTERNAL_SERVER_ERROR);
        }
        admin.password = await bcrypt.hash(adminDto.newPassword,10);
        const result = await this.adminRepo.save(admin);
        if(!result){
            throw new HttpException("cannot save data",HttpStatus.BAD_REQUEST)
        }
        return {message:"change succesfully"}
    }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
