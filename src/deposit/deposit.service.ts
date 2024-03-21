/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposit } from './entities/deposit.entity';
import { Equal, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { QrDeposit } from './entities/qrdeposit.entity';
import { status } from '../util/status';

@Injectable()
export class DepositService {
  
  constructor(
    @InjectRepository(Deposit) private depositRepo:Repository<Deposit>,
    @InjectRepository(User) private userRepo:Repository<User>,
    @InjectRepository(QrDeposit) private QrDepositRepo:Repository<QrDeposit>
    ){}
    
    async getQrDepositData() {
      try{
        const data = await this.QrDepositRepo.find({relations:{user:true}})
        if(!data){
          throw new HttpException("no data in database",HttpStatus.NOT_FOUND)
        }
        return {data}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  async updateQrStatus(id:string,updateStatus: UpdateDepositDto) {
    try{
      const getDeposit = await this.QrDepositRepo.findOne({where:{id:Equal(id)}})
      if(!getDeposit){
        throw new HttpException("Invalid Deposit Id",HttpStatus.NOT_FOUND)
      }
      if(getDeposit.status == status.complete){
        throw new HttpException("sorry you can't update staus",HttpStatus.FORBIDDEN)
      }
      Object.assign(getDeposit,updateStatus)
      const result = await this.QrDepositRepo.save(getDeposit)
      if(!result){
        throw new HttpException("cannot update status",HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {message:"sucessfully update status"}

    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async addQrDeposit(req:any,receipt:Express.Multer.File) {
    try{
      const user = await this.userRepo.findOne({where:{id:Equal(req.user.id)},relations:{deposit:true}})
      if(!user){
        throw new HttpException('Invalid user id',HttpStatus.NOT_FOUND)
      }
      let deposit:any;
      if(receipt){
        deposit = this.QrDepositRepo.create({user:user,recipt:receipt.filename})
      }
      const data = await this.QrDepositRepo.save(deposit)
      if(!data){
        throw new HttpException("cannot save data",HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {message:"save sucessfully"}

    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async updateBankStatus(id: string, data: UpdateDepositDto) {
    try{
      const deposit = await this.depositRepo.findOne({where:{id:Equal(id)}})
      if(!deposit){
        throw new HttpException("no data in database",HttpStatus.NO_CONTENT);
      }
      if(deposit.status == status.complete){
        throw new HttpException("sorry you can't update status",HttpStatus.FORBIDDEN)
      }
      Object.assign(deposit,data)
      const result = await this.depositRepo.save(deposit)
      if(!result){
        throw new HttpException("cannot save data",HttpStatus.NOT_FOUND)
      }
        return {message:"data update successfully"}
      
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getDepositById(id: string) {
    try{
      const result = await this.depositRepo.findOne({where:{id:Equal(id)}})
      if(!result){
        throw new HttpException('no data found in database',HttpStatus.NO_CONTENT)
      }
      return {result};
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getAllBankDeposit() {
    try{
      const result = await this.depositRepo.find({relations:{user:true}});
      if(!result || result.length == 0){
        throw new HttpException("no data in database",HttpStatus.NO_CONTENT)
      }
      return {result}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async addDepositInfo(req:any,receipt:Express.Multer.File,createDepositDto: CreateDepositDto) {
    try{
      const user = await this.userRepo.findOne({where:{id:Equal(req.user.id)}})
      if(!user){
        throw new HttpException("user not found",HttpStatus.NOT_FOUND)
      }
      const deposit = this.depositRepo.create({...createDepositDto,user:user,receipt:receipt.filename})
      return await this.depositRepo.save(deposit)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
