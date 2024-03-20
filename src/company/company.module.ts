/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyInfo } from './entities/CompanyBasicInfo.entity';
import { walletInfo } from './entities/wallet.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CompanyInfo,walletInfo])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
