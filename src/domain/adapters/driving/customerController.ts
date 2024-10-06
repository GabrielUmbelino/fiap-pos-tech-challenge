import { FilterCustomerDto } from './../../ports/model/customer';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CustomerService } from '../../ports/inboundPorts/customerService';
import { Customer, CustomerDto } from '../../ports/model/customer';
import { ApiQuery } from '@nestjs/swagger';

@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);
  constructor(private customerService: CustomerService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @ApiQuery({
    name: "id",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "name",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "document",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "phoneNumber",
    type: String,
    required: false
  })

  @Get(':params')
  find(
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('document') document?: string,
    @Query('phoneNumber') phoneNumber?: string,
  ): Promise<Customer[]> {

    const filterCustomerDto: FilterCustomerDto = {
      id,
      name,
      document,
      phoneNumber,
    };

    return this.customerService.find(filterCustomerDto);
  }

  @Post()
  async create(@Body() customerDto: CustomerDto): Promise<Customer> {
    const customer = await this.customerService.create(customerDto);
    this.logger.debug(customerDto);
    this.logger.debug({ customer });
    return customer;
  }
}
