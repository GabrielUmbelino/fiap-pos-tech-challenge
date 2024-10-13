import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../../infrastructure/repositories/iRepository';
import { Order, FilterOrderDto } from '../../../shared/models';
import { IService } from '../../iService';

@Injectable()
export class OrderService implements IService<Order> {
  constructor(
    @Inject('IRepository<Order>')
    private readonly orderRepository: IRepository<Order>,
  ) {}

  create(orderDto: Order): Promise<Order> {
    return this.orderRepository.create(orderDto);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  find(filterOrderDto: FilterOrderDto): Promise<Order[]> {
    return this.orderRepository.find(filterOrderDto);
  }

  edit(order: Order): Promise<Order> {
    return this.orderRepository.edit(order);
  }

  delete(id: number): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
