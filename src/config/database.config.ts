/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { Withdrawal } from '../withdrawal/entities/withdrawal.entity';
import { Deposit } from '../deposit/entities/deposit.entity';
import { ConfigService } from '@nestjs/config';
import { Trade } from '../trade/entities/trade.entities';
import { Amount } from '../Amount/entities/Amount.entities';
import { timestamprate } from '../entity/time_stamprate';
import { QrDeposit } from '../deposit/entities/qrdeposit.entity';
import { CompanyInfo } from '../company/entities/CompanyBasicInfo.entity';
import { walletInfo } from '../company/entities/wallet.entity';
import { USDTWithdrawal } from '../withdrawal/entities/usdtWithdrawal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        url:"postgres://default:0zSdkW2qoKHt@ep-weathered-silence-a4d0u2v8-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
        synchronize:true,
        logging:true,
        entities: [Admin,User,Withdrawal,Deposit,Amount,Trade,timestamprate,QrDeposit,CompanyInfo,walletInfo,USDTWithdrawal],
        autoLoadEntities: true,
    }),
  ],
})
export class DatabaseConnection {}
