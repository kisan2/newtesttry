/// <reference types="multer" />
import { CompanyService } from './company.service';
import { CompanyInfoDto } from './dto/create_CompanyInfo.dto';
import { createWalletDto } from './dto/createWallet.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    addBasicInfo(files: {
        depositQr?: Express.Multer.File[];
        banner?: Express.Multer.File[];
        logo?: Express.Multer.File[];
    }, companyInfo: CompanyInfoDto): Promise<{
        message: string;
    }>;
    addWalletInfo(depositQr: Express.Multer.File, walletInfo: createWalletDto): Promise<{
        message: string;
    }>;
    getCompanyInfo(): Promise<{
        companyInfo: import("./entities/CompanyBasicInfo.entity").CompanyInfo[];
    }>;
    getWalletInfo(): Promise<{
        data: import("./entities/wallet.entity").walletInfo[];
    }>;
}
