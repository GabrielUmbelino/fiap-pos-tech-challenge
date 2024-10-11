import { Inject, Injectable } from '@nestjs/common';
import { Customer, CustomerDto, FilterCustomerDto } from '../model/customer';
import { ICustomerService } from './iCustomerService';
import { ICustomerRepository } from '../outboundPorts/ICustomerRepository';
@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  create(customerDto: CustomerDto): Promise<Customer> {
    return this.customerRepository.create(customerDto);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  find(filterCustomerDto: FilterCustomerDto): Promise<Customer[]> {
    return this.customerRepository.find(filterCustomerDto);
  }
}
