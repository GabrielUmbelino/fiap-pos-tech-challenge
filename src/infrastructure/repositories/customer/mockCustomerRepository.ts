import { Customer, CustomerDto } from '../../../shared/models/customer';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

export class MockCustomerRepository implements IRepository<Customer> {
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

  async find(customerDto: CustomerDto): Promise<Customer[]> {
    const filteredCustomers = this.customers?.filter((customer) => {
      if (customer.id === customerDto.id) return true;
      if (customer.name === customerDto.name) return true;
      if (customer.document === customerDto.document) return true;
      if (customer.phoneNumber === customerDto.phoneNumber) return true;

      return;
    });

    return Promise.resolve(filteredCustomers);
  }
}
