import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CustomerService } from '../../ports/inboundPorts/customerService';
import { CustomerCommand } from '../model/customerCommand';

@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private customerService: CustomerService) {}

  @Get()
  findAll(): any[] {
    return this.customerService.findAll();
  }

  @Post()
  create(@Body() customerCommand: CustomerCommand): any {
    const customer = this.customerService.create(customerCommand.name);
    this.logger.debug(customerCommand);
    this.logger.debug({ customer });
    return { ...customer };
  }
}
