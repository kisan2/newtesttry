/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompanyInfo } from './entities/CompanyBasicInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyInfoDto } from './dto/create_CompanyInfo.dto';
import { createWalletDto } from './dto/createWallet.dto';
import { walletInfo } from './entities/wallet.entity';

@Injectable()
export class CompanyService {
    
    constructor(
        @InjectRepository(CompanyInfo) private companyRepo: Repository<CompanyInfo>,
        @InjectRepository(walletInfo) private walletRepo:Repository<walletInfo>
        ) { }
        
        async getWalletInfo() {
            try{
                const data = await this.walletRepo.find({})
                if(!data || data.length == 0){
                    throw new HttpException("no data in database",HttpStatus.NOT_FOUND)
                }
                return {data}
            }catch(err){
                throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    async addWalletInfo(depositQr:Express.Multer.File, walletInfo: createWalletDto) {
      try{
        console.log(depositQr)
        console.log(walletInfo)
        const data = await this.walletRepo.find({})
            if (data.length > 0) {
                if (depositQr) {
                    data[0].depositQr = depositQr.filename;
                }
                Object.assign(data[0],walletInfo)
                // const newwallet = this.walletRepo.create({...data,walletAddress:walletInfo.walletAddress})
                const result = await this.walletRepo.save(data)
                if (!result) {
                    throw new HttpException("cannot update data", HttpStatus.INTERNAL_SERVER_ERROR)
                }
                return { message: "update successfully" }
            }else{
            let depositQr: any;
            if (depositQr) {
                depositQr = depositQr.filename;
            }

            const wallet = this.walletRepo.create({ ...walletInfo, depositQr:depositQr})
            const company = this.walletRepo.save(wallet)
            if (!company) {
                throw new HttpException("cannot save data", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return {message:"successfully added"}
        }
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
    
    async getCompanyInfo() {
        try{
            const companyInfo = await this.companyRepo.find({})
            if(!companyInfo || companyInfo.length == 0){
                throw new HttpException("cannot find data",HttpStatus.NOT_FOUND)
            }
            return {companyInfo}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addBasicInfo(files: { depositQr?: Express.Multer.File[], banner?: Express.Multer.File[], logo?: Express.Multer.File[] }, companyInfo: CompanyInfoDto) {
        try {
            const data = await this.companyRepo.find({})
            if (data.length > 0) {
                if (files) {
                    if (files?.banner && files?.banner?.length > 0) {
                        data[0].banner = files.banner[0].filename;
                    }
                    if (files?.logo && files?.logo.length > 0) {
                        data[0].logo = files.logo[0].filename;
                    }
                }
                Object.assign(data,companyInfo)
                const result = await this.companyRepo.save(data)
                if (!result) {
                    throw new HttpException("cannot update data", HttpStatus.INTERNAL_SERVER_ERROR)
                }
                return { message: "update successfully" }
            }
            let banner: any;
            let logo: any;
            if (files) {
                if (files?.banner && files?.banner?.length > 0) {
                    banner = files.banner[0].filename;
                }
                if (files?.logo && files?.logo.length > 0) {
                    logo = files.logo[0].filename;
                }
            }

            const newCompany = this.companyRepo.create({ ...companyInfo, banner: banner, logo: logo })

            const company = this.companyRepo.save(newCompany)
            if (!company) {
                throw new HttpException("cannot save data", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
