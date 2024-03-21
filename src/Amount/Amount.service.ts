/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Amount } from './entities/Amount.entities';
import { Equal, Repository} from 'typeorm';
import { AmountDto } from './dto/Amount.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AmountService {

    constructor(@InjectRepository(Amount) private AmountRepo:Repository<Amount>,@InjectRepository(User) private userRepo:Repository<User>){}

    async updateAmount(AmountDto:AmountDto) {
        try{
            const user = await this.userRepo.findOne({where:{id:Equal(AmountDto.userId)},relations:{amount:true}})
            if(!user){
                throw new HttpException("no user found",HttpStatus.NOT_FOUND)
            }
            const newAmount = user.amount;
            Object.assign(newAmount,AmountDto);
            // const newAmount = this.AmountRepo.create({...AmountDto,user:user})
            const result = await this.AmountRepo.save(newAmount);
            if(!result){
                throw new HttpException("cannot save data ",HttpStatus.FORBIDDEN)
            }
            return {message:"save successfully"}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
  }
}
