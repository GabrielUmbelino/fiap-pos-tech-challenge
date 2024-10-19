import { Customer, CustomerDto } from '../../../shared/models/customer';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

export class MockCustomerRepository implements IRepository<Customer> {
  find(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }
  findById(): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  edit(): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly customers: Customer[] = [];

  async create(customerDto: CustomerDto): Promise<Customer> {
    const createdCustomer = new Customer(customerDto);
    this.customers.push(createdCustomer);
    return Promise.resolve(createdCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return Promise.resolve(this.customers);
  }
}
