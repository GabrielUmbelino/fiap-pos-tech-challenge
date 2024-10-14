import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { OrderItem } from './orderItem';
import { Customer } from './customer';

export class OrderDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  customerId: number;

  @IsOptional()
  @IsArray()
  itemIds: Array<number>;

  @IsNotEmpty()
  status: Order['status'];
}

export class FilterOrderDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  customerId?: number;

  @IsNotEmpty()
  status?: Order['status'];
}

export class Order {
  id: number;
  status: 'new' | 'confirmed' | 'inProgress' | 'finished' | 'canceled';
  totalPrice: string;
  customer: Customer;
  items: Array<OrderItem>;

  constructor(orderDto: OrderDto, customer: Customer, items: OrderItem[]) {
    this.id = orderDto?.id || randomInt(999);
    this.status = orderDto.status;
    this.customer = customer;
    this.items = items;
  }
}
