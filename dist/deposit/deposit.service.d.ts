/// <reference types="multer" />
import { CreateDepositDto } from './dto/create-deposit.dto';
import { Deposit } from './entities/deposit.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { QrDeposit } from './entities/qrdeposit.entity';
export declare class DepositService {
    private depositRepo;
    private userRepo;
    private QrDepositRepo;
    constructor(depositRepo: Repository<Deposit>, userRepo: Repository<User>, QrDepositRepo: Repository<QrDeposit>);
    getQrDepositData(): Promise<{
        data: QrDeposit[];
    }>;
    updateQrStatus(id: string, updateStatus: UpdateDepositDto): Promise<{
        message: string;
    }>;
    addQrDeposit(req: any, receipt: Express.Multer.File): Promise<{
        message: string;
    }>;
    updateBankStatus(id: string, data: UpdateDepositDto): Promise<{
        message: string;
    }>;
    getDepositById(id: string): Promise<{
        result: Deposit;
    }>;
    getAllBankDeposit(): Promise<{
        result: Deposit[];
    }>;
    addDepositInfo(req: any, receipt: Express.Multer.File, createDepositDto: CreateDepositDto): Promise<Deposit>;
}
