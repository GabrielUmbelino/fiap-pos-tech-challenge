import { CustomerDto } from '../model/customer';
import { CustomerService } from './customerService';
import { MockCustomerService } from './mockCustomerService';

const customerDto: CustomerDto = {
  name: 'John Doe',
  document: '00000000000',
  phoneNumber: '41 999999999',
};

describe('Customer Service', () => {
  let customerService: CustomerService;
  let mockCustomerService: MockCustomerService;

  beforeEach(async () => {
    mockCustomerService = new MockCustomerService();
    customerService = new CustomerService(mockCustomerService);
  });

  it('should create a customer', async () => {
    const createdCustomer = await customerService.create(customerDto);

    expect(createdCustomer).toBeDefined();
    expect(createdCustomer.id).toBeDefined();
    expect(createdCustomer.name).toBe(customerDto.name);
    expect(createdCustomer.document).toBe(customerDto.document);
    expect(createdCustomer.phoneNumber).toBe(customerDto.phoneNumber);
  });

  it('should list all customers', async () => {
    await customerService.create(customerDto);
    const allCustomers = await customerService.findAll();
    expect(allCustomers.length).toBe(1);
  });

  it('get customer by Id', async () => {
    const createdCustomer = await customerService.create(customerDto);
    const allCustomers = await customerService.find({
      id: createdCustomer.id,
    });
    expect(allCustomers.length).toBe(1);
  });
});
