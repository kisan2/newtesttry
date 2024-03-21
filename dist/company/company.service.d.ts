/// <reference types="multer" />
import { CompanyInfo } from './entities/CompanyBasicInfo.entity';
import { Repository } from 'typeorm';
import { CompanyInfoDto } from './dto/create_CompanyInfo.dto';
import { createWalletDto } from './dto/createWallet.dto';
import { walletInfo } from './entities/wallet.entity';
export declare class CompanyService {
    private companyRepo;
    private walletRepo;
    constructor(companyRepo: Repository<CompanyInfo>, walletRepo: Repository<walletInfo>);
    getWalletInfo(): Promise<{
        data: walletInfo[];
    }>;
    addWalletInfo(depositQr: Express.Multer.File, walletInfo: createWalletDto): Promise<{
        message: string;
    }>;
    getCompanyInfo(): Promise<{
        companyInfo: CompanyInfo[];
    }>;
    addBasicInfo(files: {
        depositQr?: Express.Multer.File[];
        banner?: Express.Multer.File[];
        logo?: Express.Multer.File[];
    }, companyInfo: CompanyInfoDto): Promise<{
        message: string;
    }>;
}
