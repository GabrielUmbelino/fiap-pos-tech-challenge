import { randomUUID } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class OrderDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  unitValue?: number;
}

export class FilterOrderDto {
  @IsOptional()
  id?: string;
  @IsOptional()
  name?: string;
  @IsOptional()
  unitValue?: number;
}

export class Order {
  id: string;
  name: string;
  unitValue: number;

  constructor(orderDto: OrderDto) {
    this.id = orderDto?.id || randomUUID();
    this.name = orderDto.name;
    this.unitValue = orderDto.unitValue;
  }
}
