import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Product } from './product';

export class OrderDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  customerId: number;

  @IsOptional()
  @IsArray()
  orderProducts?: Array<Product>;

  @IsNotEmpty()
  status?: string;
}

export class FilterOrderDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  customerId: number;

  @IsOptional()
  @IsArray()
  orderProducts?: Array<Product>;

  @IsNotEmpty()
  status?: string;
}

export class Order {
  id: number;
  customerId: number;
  orderProducts?: Array<Product>;
  status?: string;

  constructor(orderDto: OrderDto) {
    this.id = orderDto?.id || randomInt(999);
    this.customerId = orderDto.customerId;
    this.orderProducts = orderDto.orderProducts;
    this.status = orderDto.status;
  }
}
