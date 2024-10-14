import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Product } from './product';

export class OrderItemDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  @IsArray()
  productId: Array<number>;

  @IsNotEmpty()
  quantity: number;
}

export class FilterOrderItemDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  customerId: number;
}

export class OrderItem {
  id: number;
  quantity: number;
  product: Product;

  constructor(orderDto: OrderItemDto, product: Product) {
    this.id = orderDto?.id || randomInt(999);
    this.quantity = orderDto.quantity;
    this.product = product;
  }
}
