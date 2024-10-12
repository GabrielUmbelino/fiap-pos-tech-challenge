import { Injectable } from '@nestjs/common';
import { Customer, FilterCustomerDto } from '../../../shared/models/customer';
import { IRepository } from '../iRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerInDbRepository implements IRepository<Customer> {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
  ) {}

  create(customer: Customer): Promise<Customer> {
    return this.repository
      .save({
        name: customer.name,
        document: customer.document,
        phoneNumber: customer.phoneNumber,
      })
      .then((customerEntity) => {
        return {
          id: customerEntity.id,
          name: customerEntity.name,
          document: customerEntity.document,
          phoneNumber: customerEntity.phoneNumber,
        };
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while saving the customer to the database: '${JSON.stringify(customer)}': ${error.message}`,
        );
      });
  }

  findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }

  find(customerDto: FilterCustomerDto): Promise<Customer[]> {
    return this.repository
      .findBy(customerDto)
      .then((customerEntities) => {
        return customerEntities.map((customerEntity) => ({
          id: customerEntity.id,
          name: customerEntity.name,
          document: customerEntity.document,
          phoneNumber: customerEntity.phoneNumber,
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the customer in the database: '${JSON.stringify(customerDto)}': ${error.message}`,
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
