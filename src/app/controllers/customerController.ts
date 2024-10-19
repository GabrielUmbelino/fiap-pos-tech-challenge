import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Query,
} from '@nestjs/common';

import { ApiQuery } from '@nestjs/swagger';
import { Customer, CustomerDto } from '../../shared/models/customer';
import { User } from '../../shared/models/user';
import { CustomerService } from '../../domain';

@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);
  constructor(
    @Inject('IService<Customer>') private customerService: CustomerService,
  ) {}

  @Get()
  findAll(): Promise<Array<Customer>> {
    return this.customerService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'document',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'phoneNumber',
    type: String,
    required: false,
  })
  @Get(':params')
  find(@Query('id') id?: number): Promise<Customer> {
    return this.customerService.findById(id);
  }

  @Post()
  async create(@Body() customerDto: CustomerDto): Promise<Customer | User> {
    const customer =
      await this.customerService.createUserAndCustomer(customerDto);
    this.logger.debug(customerDto);
    this.logger.debug({ customer });
    return customer;
  }
}
