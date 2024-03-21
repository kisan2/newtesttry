/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Withdrawal } from './entities/withdrawal.entity';
import { Equal, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { Amount } from '../Amount/entities/Amount.entities';
import { USDTWithdrawal } from './entities/usdtWithdrawal.entity';
import { UpdateUSDTWithdrawalDto } from './dto/updateUSDTwithdrawal.dto';
import { CreateUSDTWithdrawalDto } from './dto/createUSDTwithdrawal.dto';
import {status} from '../util/status';

@Injectable()
export class WithdrawalService {
  
  constructor(@InjectRepository(Withdrawal) private withdrawRepo:Repository<Withdrawal>,@InjectRepository(User) private userRepo:Repository<User>,@InjectRepository(Amount) private amount:Repository<Amount>,@InjectRepository(USDTWithdrawal) private USDTRepo:Repository<USDTWithdrawal> ){}
  
  async updateUSDTStatus(id:string,data: UpdateUSDTWithdrawalDto) {
    try{
      const USDTwithdrawal = await this.USDTRepo.findOne({where:{id:Equal(id)},relations:{user:{amount:true}}})
      if(!USDTwithdrawal){
        throw new HttpException("Invalid Withdrawal id",HttpStatus.INTERNAL_SERVER_ERROR)
      }
      if(USDTwithdrawal.status == status.pending  && data.status == status.rejected){
        const newAmount = ((+USDTwithdrawal.user.amount.balance )+ (+USDTwithdrawal.withdrawalAmount)).toString();
        const amount = USDTwithdrawal.user.amount
        Object.assign(amount,{balance:newAmount})
        const amountData = await this.amount.save(amount)
        if(!amountData){
          throw new HttpException('cannot save data',HttpStatus.INTERNAL_SERVER_ERROR)
        }
        Object.assign(USDTwithdrawal,data)
        const walletdata = await this.USDTRepo.save(USDTwithdrawal)
        if(!walletdata){
          throw new HttpException("cannot update",HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return {message:"update successfully"}
      
      }else{
      Object.assign(USDTwithdrawal,data)
      const withdrawalData = await this.USDTRepo.save(USDTwithdrawal)
      if(!withdrawalData){
        throw new HttpException("cannot save data",HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {message:"update sucessfully"}
    }
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getAllUSDTwithdrwal() {
    try{
      const data = await this.USDTRepo.find({relations:{user:true}})
      if(!data || data.length == 0){
        throw new HttpException("cannot get data",HttpStatus.NOT_FOUND)
      }
      return {data}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async requestUSDTWithdraww(req: any, USDTwithdrawal: CreateUSDTWithdrawalDto) {
    try{
      const user = await this.userRepo.findOne({where:{id:Equal(req.user.id)},relations:{withdrawal:true,amount:true,deposit:true}})
        console.log(user)
        if(!user){
            throw new HttpException("user not found",HttpStatus.NOT_FOUND)
        }
        if(+user.amount.balance < +USDTwithdrawal.withdrawalAmount){
          throw new HttpException("Insuffecent balance",HttpStatus.NOT_FOUND)
        }
        Object.assign(user.amount,{balance:(+user.amount.balance-(+USDTwithdrawal.withdrawalAmount)).toString()})
        await this.amount.save(user.amount)
        const newInfo = this.USDTRepo.create({...USDTwithdrawal,amountAfterWithdrawal:(+user.amount.balance-(+USDTwithdrawal.withdrawalAmount)).toString(),amountBeforeWithdrawal:(user.amount.balance),user:user})
        const result = await this.USDTRepo.save(newInfo)
        if(!result){
            return {message:"cannot save data"}
        }
        return {message:"save successfully"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllwithdrwal() {
    try{
      const data = await this.withdrawRepo.find({relations:{user:true}})
      if(!data){
        throw new HttpException("cannot data",HttpStatus.NOT_FOUND)
      }
      return {data}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
    async updateBankStatus(id:string,data: UpdateWithdrawalDto) {
        try{
            const withdrawal = await this.withdrawRepo.findOne({where:{id:Equal(id)},relations:{user:{amount:true}}})
            if(!withdrawal){
              throw new HttpException("Invalid Withdrawal id",HttpStatus.INTERNAL_SERVER_ERROR)
            }
            if(withdrawal.status == status.pending && data.status == status.rejected){
              const newAmount = ((+withdrawal.user.amount.balance )+ (+withdrawal.withdrawalAmount)).toString();
              const amount = withdrawal.user.amount
              Object.assign(amount,{balance:newAmount})
              const amountData = await this.amount.save(amount)
              if(!amountData){
                throw new HttpException('cannot save data',HttpStatus.INTERNAL_SERVER_ERROR)
              }
              Object.assign(withdrawal,data)
              const walletdata = await this.withdrawRepo.save(withdrawal)
              if(!walletdata){
                throw new HttpException("cannot update wallet",HttpStatus.INTERNAL_SERVER_ERROR)
              }
              return {message:"update successfully"}
            }else{
            Object.assign(withdrawal,data)
            const walletdata = await this.withdrawRepo.save(withdrawal)
            if(!walletdata){
              throw new HttpException("canont update data",HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return {message:"update sucessfully"}
          }
        }catch(err){
           throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

  async requestBankWithdraww(req:any,withdrawalDto: CreateWithdrawalDto) {
    try{
        const user = await this.userRepo.findOne({where:{id:Equal(req.user.id)},relations:{withdrawal:true,amount:true,deposit:true}})
        console.log(user)
        if(!user){
            throw new HttpException("user not found",HttpStatus.NOT_FOUND)
        }
        if(+user.amount.balance < +withdrawalDto.withdrawalAmount){
          throw new HttpException("Insuffecent balance",HttpStatus.NOT_FOUND)
        }
        // const amountid = user.amount.id;
        Object.assign(user.amount,{balance:(+user.amount.balance-(+withdrawalDto.withdrawalAmount)).toString()})
        await this.amount.save(user.amount)
        const newInfo = this.withdrawRepo.create({...withdrawalDto,amountAfterWithdrawal:(+user.amount.balance-(+withdrawalDto.withdrawalAmount)).toString(),amountBeforeWithdrawal:(user.amount.balance),user:user})
        const result = await this.withdrawRepo.save(newInfo)
        if(!result){
            return {message:"cannot save data"}
        }
        return {message:"save successfully"}
    }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
}
