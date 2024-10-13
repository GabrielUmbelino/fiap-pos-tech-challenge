import { FilterOrderDto } from './../model/order';
import { Order, OrderDto } from '../model/order';

/**
 * Our domain input port
 */

export interface IOrderService {
  create(orderDto: OrderDto): Promise<Order>;
  findAll(): Promise<Order[]>;
  find(filterOrderDto: FilterOrderDto): Promise<Order[]>;
  update(id: string, orderDto: OrderDto): Promise<Order>;
  remove(id: string): Promise<void>;
}
