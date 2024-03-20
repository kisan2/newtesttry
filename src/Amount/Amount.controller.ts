/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Patch, UseGuards, ValidationPipe } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AmountDto } from './dto/Amount.dto';
import { Roles } from 'src/decorator/Role.decorator';
import { roles } from 'src/util/roles';
import { CanAccess } from 'src/Guard/CanAccess.guard';
import { AmountService } from './Amount.service';

@Controller('Amount')
@ApiBearerAuth("jwt")
@ApiTags("Amount")
export class AmountController {
  constructor(private readonly amountService: AmountService) {}

  @Patch()
  @ApiBody({
    type: AmountDto,
  })
  @Roles(roles.admin)
  @UseGuards(CanAccess)
  async updateAmount(@Body(new ValidationPipe()) AmountDto:AmountDto){
    try{
      return await this.amountService.updateAmount(AmountDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
