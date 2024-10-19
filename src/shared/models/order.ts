import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { OrderItem, OrderItemDto } from './orderItem';
import { OrderStatusEnum } from '../enums';
import { User } from './user';

export class OrderDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  customerId: number;

  @IsOptional()
  totalPrice: string;

  @IsOptional()
  items?: Array<OrderItemDto>;

  @IsOptional()
  status?: Order['status'];
}

export class FilterOrderDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  ids?: Array<number>;

  @IsOptional()
  customerId?: number;

  @IsOptional()
  status?: Order['status'];
}

export class Order {
  id?: number;
  status: OrderStatusEnum;
  totalPrice: string;
  user: User;
  items: OrderItem[];

  constructor(orderDto: OrderDto, user: User) {
    this.id = orderDto?.id || randomInt(999);
    this.status = orderDto.status;
    this.user = user;
    this.items = [];
  }
}
