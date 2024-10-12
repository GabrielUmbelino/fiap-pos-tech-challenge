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
import {
  Customer,
  CustomerDto,
  FilterCustomerDto,
} from '../shared/models/customer';
import { IService } from '../domain/iService';

@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);
  constructor(
    @Inject('IService<Customer>') private customerService: IService<Customer>,
  ) {}

  @Get()
  findAll(): Promise<Customer[]> {
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
  find(@Query('id') id?: number): Promise<Customer[]> {
    const filterCustomerDto: FilterCustomerDto = {
      id,
    };

    return this.customerService.find(filterCustomerDto);
  }

  @Post()
  async create(@Body() customerDto: CustomerDto): Promise<Customer> {
    const customer = await this.customerService.create(customerDto as Customer);
    this.logger.debug(customerDto);
    this.logger.debug({ customer });
    return customer;
  }
}
