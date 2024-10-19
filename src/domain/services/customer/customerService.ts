import { Inject, Injectable } from '@nestjs/common';
import { Customer, CustomerDto } from '../../../shared/models/customer';
import { IService } from '../../iService';
import { CustomerInDbRepository } from '../../../infrastructure/repositories/customer';
import { UserInDbRepository } from '../../../infrastructure/repositories/user';
import { User } from '../../../shared/models';

@Injectable()
export class CustomerService implements IService<Customer> {
  constructor(
    @Inject('IRepository<Customer>')
    private readonly customerRepository: CustomerInDbRepository,
    @Inject('IRepository<User>')
    private readonly userRepository: UserInDbRepository,
  ) {}
  create(): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  async createUserAndCustomer(
    customerDto: CustomerDto,
  ): Promise<Customer | User> {
    const user = await this.userRepository.create();
    if (!customerDto?.document?.length) return user;

    return this.customerRepository.create({
      id: user.id,
      name: customerDto.name,
      document: customerDto.document,
      phoneNumber: customerDto.phoneNumber,
      email: customerDto.email,
    });
  }

  async findById(customerId: number): Promise<Customer> {
    const customer = this.customerRepository.findById(customerId);
    return customer;
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  find(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }

  edit(): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
