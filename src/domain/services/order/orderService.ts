import { Inject, Injectable } from '@nestjs/common';
import { Order, FilterOrderDto, OrderDto } from '../../../shared/models';
import { IService } from '../../iService';
import { CustomerService } from '../customer';
import { OrderInDbRepository } from '../../../infrastructure/repositories/order';
import { OrderStatusEnum } from '../../../shared';

@Injectable()
export class OrderService implements IService<Order> {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: OrderInDbRepository,
    @Inject('IService<Customer>')
    private readonly customerService: CustomerService,
  ) {}
  create(): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  async createFromDto(orderDto: OrderDto): Promise<Order> {
    const user = await this.customerService.findById(orderDto.customerId);
    if (!user) {
      throw new Error('Customer not provided');
    }

    return this.orderRepository.create({
      user,
      totalPrice: '0',
      status: OrderStatusEnum.NEW,
    });
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  find(order: FilterOrderDto): Promise<Order[]> {
    return this.orderRepository.find(order);
  }

  findById(filterOrderDto: FilterOrderDto): Promise<Order> {
    return this.orderRepository.findById(filterOrderDto);
  }

  edit(): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
