import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { OrderItemDto } from './orderItem';
import { Customer } from './customer';
import { OrderStatusEnum } from '../enums';
import { User } from './user';

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
  status: OrderStatusEnum;
  totalPrice: string;
  user: User;
  // items: OrderItem[];

  constructor(orderDto: OrderDto, user: User) {
    this.id = orderDto?.id || randomInt(999);
    this.status = orderDto.status;
    this.user = user;
    // this.items = items;
  }
}
