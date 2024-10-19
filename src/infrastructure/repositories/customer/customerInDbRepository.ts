import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, User } from '../../../shared/models';
import { CustomerEntity } from './customerEntity';
import { IRepository } from '../iRepository';
import { UserEntity } from '../user';

@Injectable()
export class CustomerInDbRepository implements IRepository<Customer | User> {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  findById(): Promise<Customer | User> {
    throw new Error('Method not implemented.');
  }

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
  findAll(): Promise<Array<Customer | User>> {
    return this.userRepository
      .query(
        `
      SELECT
        "u"."id",
        "c"."name",
        "c"."document",
        "c"."phone_number",
        "c"."email"
      FROM
        "User" "u"
        LEFT JOIN "Customer" "c" ON "c"."id" = "u"."id"  
      `,
      )
      .then((customers) => {
        return customers.map((customer) => {
          if (!customer.name) return { id: customer.id };

          return {
            id: customer.id,
            name: customer.name,
            document: customer.document,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
          };
        });
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the customer in the database: ${error.message}`,
        );
      });
  }

  find(id: number): Promise<Array<Customer | User>> {
    return this.userRepository
      .query(
        `
      SELECT
        "u"."id",
        "c"."name",
        "c"."document",
        "c"."phone_number",
        "c"."email"
      FROM
        "User" "u"
        LEFT JOIN "Customer" "c" ON "c"."id" = "u"."id"
      WHERE
        "u"."id" = ${id}
      `,
      )
      .then((customers) => {
        return customers.map((customer) => {
          if (!customer.name) return { id: customer.id };

          return {
            id: customer.id,
            name: customer.name,
            document: customer.document,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
          };
        });
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the customer in the database: ${error.message}`,
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
