import { CompanyService } from './company.service';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    getCompanyInfo(): Promise<{
        companyInfo: import("./entities/CompanyBasicInfo.entity").CompanyInfo[];
    }>;
    getWalletInfo(): Promise<{
        data: import("./entities/wallet.entity").walletInfo[];
    }>;
}
