import { randomUUID } from 'crypto';
import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Product } from './product';

export class OrderDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  customerName: string;

  @IsOptional()
  @IsArray()
  productsOrder?: Array<Product>;

  @IsNotEmpty()
  orderStatus?: string;
}

export class FilterOrderDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  customerName: string;

  @IsOptional()
  @IsArray()
  productsOrder?: Array<Product>;

  @IsNotEmpty()
  orderStatus?: string;
}

export class Order {
  id: string;
  customerName: string;
  productsOrder?: Array<Product>;
  orderStatus?: string;

  constructor(orderDto: OrderDto) {
    this.id = orderDto?.id || randomUUID();
    this.customerName = orderDto.customerName;
    this.productsOrder = orderDto.productsOrder;
    this.orderStatus = orderDto.orderStatus;
  }
}
