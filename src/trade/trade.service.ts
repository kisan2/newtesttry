/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TimestampDto } from './dto/timestamp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { timestamprate } from 'src/entity/time_stamprate';
import { Equal, Repository } from 'typeorm';
import { tradeDto } from './dto/trade.dto';
import { Amount } from 'src/Amount/entities/Amount.entities';
import { User } from 'src/user/entities/user.entity';
import { Trade } from './entities/trade.entities';


@Injectable()
export class TradeService {
    
    constructor(
        @InjectRepository(timestamprate) private timestampRepo:Repository<timestamprate>,
        @InjectRepository(Amount) private amountRepo:Repository<Amount>,
        @InjectRepository(User) private userRepo:Repository<User>,
        @InjectRepository(Trade) private tradeRepo:Repository<Trade>
        ){}
        
        async getTradeByUser(req: any) {
            try{
                const data = await this.userRepo.findOne({where:{id:Equal(req.user.id)},relations:{trade:true}})
                if(!data){
                    throw new HttpException("Invalid user id",HttpStatus.NOT_FOUND)
                }
                return {trade:data.trade}
            }catch(err){
                throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
        async getAllTrade() {
            try{
                const trade = await this.tradeRepo.find({relations:{user:true}})
                if(!trade || trade.length == 0){
                    throw new HttpException("no data in database", HttpStatus.NOT_FOUND)
                }
                return {trade}
            }catch(err){
                throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    async buyAndSell(req:any,TradeDto: tradeDto) {
        try{
            const user = await this.userRepo.findOne({where:{id:Equal(req.user.id)},relations:{amount:true}})
            if(!user){
                throw new HttpException("wrong userid",HttpStatus.UNPROCESSABLE_ENTITY)
            }
            if(+user.amount.balance < +TradeDto.amount){
                throw new HttpException("Insufficent balance",HttpStatus.UNPROCESSABLE_ENTITY)
            }
            const createTrade = this.tradeRepo.create({...TradeDto,user:user})
            const trade = await this.tradeRepo.save(createTrade)
            if(!trade){
                throw new HttpException("cannot buy a coin",HttpStatus.FORBIDDEN)
            }
            const newAmount = +user.amount.balance - +TradeDto.amount;
            const amt = this.amountRepo.create({...user.amount,balance:newAmount.toString()})
            Object.assign(user.amount,amt)
            const amount = await this.amountRepo.save(user.amount)
            if(!amount){
                throw new HttpException("cannot update amount",HttpStatus.UNPROCESSABLE_ENTITY)
            }
            setTimeout(async () => {
                const stamp = await this.timestampRepo.findOne({where:{timestamp:Equal(TradeDto.timestamp)}})
                const profit = (+TradeDto.amount) + (((+stamp.rate)/100) * (+TradeDto.amount));
                const newtrade =  this.tradeRepo.create({...trade,tradeAmount:TradeDto.amount,amountAfterTrade:profit.toString(),tradestatus:"close"})
                await this.tradeRepo.save(newtrade);
                const newAmount = +amount.balance + profit;
                const finalamount = this.amountRepo.create({...amount,balance:newAmount.toString()})
                Object.assign(amount,finalamount);
                await this.amountRepo.save(finalamount);
            }, 60000 * +TradeDto.timestamp);
            console.log("end")
            
            return {message:`successfully buy ${TradeDto.coin}`}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async gettimestamp() {
        try{
            const result = await this.timestampRepo.find({})
            if(!result || result.length == 0){
                throw new HttpException("cannot get data",HttpStatus.UNPROCESSABLE_ENTITY)
            }
            return {result}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

  async timestamprate(timestampDto: TimestampDto) {
   try{
    const result = await this.timestampRepo.findOne({where:{timestamp:Equal(timestampDto.timestamp)}})
    if(!result){
        const result = await this.timestampRepo.save(timestampDto)
        if(!result){
            throw new HttpException("cannot save data",HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return {message:"save successfully"}
    }else{
        Object.assign(result,timestampDto);
        const timesatmp = await this.timestampRepo.save(result)
        if(!timesatmp){
            throw new HttpException("cannot update",HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return {message:"update successfulyy"}
    }
   }catch(err){
    throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
   }
  }
}
