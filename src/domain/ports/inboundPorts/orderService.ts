import { Inject, Injectable } from '@nestjs/common';
import { Order, OrderDto, FilterOrderDto } from '../model/order';
import { IOrderService } from './iOrderService';
import { IOrderRepository } from '../outboundPorts/IOrderRepository';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  create(orderDto: OrderDto): Promise<Order> {
    return this.orderRepository.create(orderDto);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  find(filterOrderDto: FilterOrderDto): Promise<Order[]> {
    return this.orderRepository.find(filterOrderDto);
  }

  update(id: string, orderDto: OrderDto): Promise<Order> {
    return this.orderRepository.update(id, orderDto);
  }

  remove(id: string): Promise<void> {
    return this.orderRepository.remove(id);
  }
}
