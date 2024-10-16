import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { OrderItemDto } from './orderItem';
import { Customer } from './customer';

export class OrderDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  customerId: number;
  @IsNotEmpty()
  items?: Array<OrderItemDto>;

  @IsNotEmpty()
  status?: Order['status'];
}

export class FilterOrderDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  ids?: Array<number>;

  @IsNotEmpty()
  customerId?: number;

  @IsNotEmpty()
  status?: Order['status'];
}

export class Order {
  id?: number;
  status: 'new' | 'confirmed' | 'inProgress' | 'finished' | 'canceled';
  totalPrice: string;
  customer: Customer;
  // items: OrderItem[];

  constructor(orderDto: OrderDto, customer: Customer) {
    this.id = orderDto?.id || randomInt(999);
    this.status = orderDto.status;
    this.customer = customer;
    // this.items = items;
  }
}
