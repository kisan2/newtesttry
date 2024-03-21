/* eslint-disable prettier/prettier */
import { roles } from './../util/roles';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, IsNull, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { User } from './entities/user.entity';
import { UserLoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Amount } from '../Amount/entities/Amount.entities';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>,private jwtService:JwtService,@InjectRepository(Amount) private AmountRepo:Repository<Amount>,@Inject(CACHE_MANAGER) private cacheManager:Cache ){}
  
  async getAllData() {
    try{
      const users = await this.userRepo.find({});
      if(!users || users.length == 0){
        throw new HttpException("cannot get data",HttpStatus.NOT_FOUND)
      }
      return {users}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  async getDelData() {
    try{
      const result = await this.userRepo.find({where:{deletedAt:Not(IsNull())},withDeleted:true});
      if(!result || result.length == 0){
        throw new HttpException("No data in database",HttpStatus.FORBIDDEN);
      }
      return {result}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async signup(files:{ validId?: Express.Multer.File[],profile?: Express.Multer.File[]},createUserDto: CreateUserDto) {
    try{
      if(files){
        if(files.profile){
          createUserDto.profile = files.profile[0].filename
        }
        if(files.validId){
          createUserDto.validId = files.validId[0].filename
        }
      }
      const amount = await this.AmountRepo.save(this.AmountRepo.create({balance:"0"}))
      const newpassword = await bcrypt.hash(createUserDto.password,10)
      createUserDto.password = newpassword;
      const newuser = this.userRepo.create({...createUserDto,amount:amount})
      const user =  await this.userRepo.save(newuser);
      if(!user){
        throw new HttpException("cannot save user",HttpStatus.FORBIDDEN)
      }
      return {message:"Save successfully"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUserData() {
    try{
      const result = await this.userRepo.find({relations:{deposit:true,withdrawal:true,amount:true}});
    if(!result || result.length == 0){
      throw new HttpException("no data in database",HttpStatus.NO_CONTENT)
    }
    return {result}
    }catch(err){
      throw new HttpException("something went wrong" + err ,HttpStatus.BAD_REQUEST)
    }
  }

  async getUserById(id: string) {
    try{
      const result = await this.userRepo.findOne({where:{id:Equal(id)},relations:{withdrawal:true,deposit:true,amount:true,trade:true}})
      if(!result){
        throw new HttpException("no data found",HttpStatus.NOT_FOUND)
      }
      return {result}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUserById(files:{ validId?: Express.Multer.File[], profile?: Express.Multer.File[] },id: string, updateUserDto: CreateUserDto) {
    try{
      const user = await this.userRepo.findOne({where:{id:Equal(id)}})
      if(!user){
        throw new HttpException("user not found",HttpStatus.NO_CONTENT)
      }
      if(files){
        if(files.profile){
          updateUserDto.profile = files.profile[0].filename;
        }
        if(files.validId){
          updateUserDto.validId =files.validId[0].filename;
        }
      }
      Object.assign(user,updateUserDto);
      const result =  await this.userRepo.save(user)
      if(!result){
        throw new HttpException("cannot save data",HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {message:"update successfully"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeUserId(id: string) {
    try{
      const user = await this.userRepo.findOne({where:{id:Equal(id)},relations:{deposit:true,withdrawal:true,amount:true}})
      if(+user.amount.balance > 0){
        throw new HttpException("cannot delete user, amount is more then 0",HttpStatus.FORBIDDEN)
      }
      if(!user){
        throw new HttpException("Invalid Id",HttpStatus.NOT_FOUND)
      }
      const result =await this.userRepo.softRemove(user)
      if(!result){
        throw new HttpException("cannot save data",HttpStatus.FORBIDDEN)
      }
      return {message:"remove succesffully"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    async restore(id:string){
      try{
        const data = await this.userRepo.findOne({where:{deletedAt:Not(IsNull()),id:Equal(id)},withDeleted:true})
        if(!data){
          throw new HttpException("Invalid user id",HttpStatus.FORBIDDEN)
        }
        data.deletedAt = null
        const result = await this.userRepo.save(data)
        if(!result){
          throw new HttpException("cannot restore data",HttpStatus.FORBIDDEN)
        }
        return {message:"restore data"}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async userlogin(UserLoginDto:UserLoginDto){
      try{
        const user = await this.userRepo.findOne({where:{email:UserLoginDto.email}})
        if(!user){
          throw new HttpException("user not found",HttpStatus.UNAUTHORIZED)
        }
        if(!await bcrypt.compare(UserLoginDto.password,user.password)){
          throw new HttpException("username or password is incorrect",HttpStatus.UNAUTHORIZED)
        }
        const token = this.jwtService.sign({username:user.email,id:user.id,role:roles.user},{expiresIn:"1d",secret:process.env.JWTSECRET})
        await this.cacheManager.set(`token:${token}`,token,86400000)
        return {message:"sucessfully login",token:token,userId:user.id}
      }catch(err){
        throw new HttpException("err"+err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
}
