import { Amount } from './entities/Amount.entities';
import { Repository } from 'typeorm';
import { AmountDto } from './dto/Amount.dto';
import { User } from 'src/user/entities/user.entity';
export declare class AmountService {
    private AmountRepo;
    private userRepo;
    constructor(AmountRepo: Repository<Amount>, userRepo: Repository<User>);
    updateAmount(AmountDto: AmountDto): Promise<{
        message: string;
    }>;
}
