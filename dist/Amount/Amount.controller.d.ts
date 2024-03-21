import { AmountDto } from './dto/Amount.dto';
import { AmountService } from './Amount.service';
export declare class AmountController {
    private readonly amountService;
    constructor(amountService: AmountService);
    updateAmount(AmountDto: AmountDto): Promise<{
        message: string;
    }>;
}
