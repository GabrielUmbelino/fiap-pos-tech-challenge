import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../../shared/models';
import { CustomerEntity } from './customer.entity';
import { IRepository } from '../iRepository';

@Injectable()
export class CustomerInDbRepository implements IRepository<Customer> {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
  ) {}

  create(customer: Customer): Promise<Customer> {
    return this.repository
      .save({
        id: customer.id,
        name: customer.name,
        document: customer.document,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while saving the customer to the database: '${JSON.stringify(customer)}': ${error.message}`,
        );
      });
  }
  findAll(): Promise<Customer[]> {
    return this.repository
      .createQueryBuilder('customer')
      .getMany()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the customer in the database: ${error.message}`,
        );
      });
  }

  find(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<Customer> {
    return this.repository
      .createQueryBuilder('customer')
      .where('customer.id = :id', { id })
      .getOne()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the customer in the database: '${JSON.stringify(id)}': ${error.message}`,
        );
      });
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  edit(): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
}
