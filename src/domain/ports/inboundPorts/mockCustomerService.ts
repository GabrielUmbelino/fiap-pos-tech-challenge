import { Customer, CustomerDto } from '../model/customer';
import { ICustomerRepository } from '../outboundPorts/ICustomerRepository';

export class MockCustomerService implements ICustomerRepository {
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
