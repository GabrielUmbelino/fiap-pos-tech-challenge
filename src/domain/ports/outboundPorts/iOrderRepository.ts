import { Order, OrderDto, FilterOrderDto } from '../model/order';

export interface IOrderRepository {
  update(id: string, orderDto: OrderDto): Promise<Order>;
  remove(id: string): Promise<void>;
  create(orderDto: OrderDto): Promise<Order>;
  findAll(): Promise<Order[]>;
  find(filterOrderDto: FilterOrderDto): Promise<Order[]>;
}

export const IOrderRepository = Symbol('IOrderRepository');
