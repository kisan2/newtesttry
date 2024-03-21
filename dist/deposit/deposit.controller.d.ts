/// <reference types="multer" />
import { Request } from 'express';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
export declare class DepositController {
    private readonly depositService;
    constructor(depositService: DepositService);
    addDepositInfo(req: Request, receipt: Express.Multer.File, createDepositDto: CreateDepositDto): Promise<import("./entities/deposit.entity").Deposit>;
    getAllBankDeposit(): Promise<{
        result: import("./entities/deposit.entity").Deposit[];
    }>;
    addQrDeposit(req: Request, receipt: Express.Multer.File): Promise<{
        message: string;
    }>;
    updateBankStatus(id: string, updateStatus: UpdateDepositDto): Promise<{
        message: string;
    }>;
    getQrDepositData(): Promise<{
        data: import("./entities/qrdeposit.entity").QrDeposit[];
    }>;
    getDepositById(id: string): Promise<{
        result: import("./entities/deposit.entity").Deposit;
    }>;
    updateQrStatus(id: string, data: UpdateDepositDto): Promise<{
        message: string;
    }>;
}
