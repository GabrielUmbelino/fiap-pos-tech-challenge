import { Inject, Injectable } from '@nestjs/common';
import { Order, OrderDto } from '../../../shared/models';
import { IService } from '../../iService';
import { CustomerService } from '../customer';
import { OrderStatusEnum } from '../../../shared';
import { IRepository } from '../../../infrastructure/repositories/iRepository';

@Injectable()
export class OrderService implements IService<Order> {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
    @Inject('IService<Customer>')
    private readonly customerService: CustomerService,
  ) {}
  async create(orderDto: OrderDto): Promise<Order> {
    const user = await this.customerService.findById(orderDto.customerId);

    if (!user) {
      throw new Error('Customer not provided');
    }

    return this.orderRepository.create({
      user,
      totalPrice: '0',
      status: OrderStatusEnum.NEW,
      items: [],
    });
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  find(orderId: number): Promise<Order[]> {
    return this.orderRepository.find(orderId);
  }

  findById(orderId: number): Promise<Order> {
    return this.orderRepository.findById(orderId);
  }

  async edit(orderDto: OrderDto): Promise<Order> {
    const order = await this.orderRepository.findById(orderDto.id);

    return this.orderRepository.edit({
      ...order,
      status: orderDto.status,
    });
  }

  delete(id: number): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
