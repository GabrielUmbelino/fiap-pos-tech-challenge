import { randomUUID } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  unitValue?: number;
}

export class FilterProductDto {
  @IsOptional()
  id?: string;
  @IsOptional()
  name?: string;
  @IsOptional()
  unitValue?: number;
}

export class Product {
  id: string;
  name: string;
  unitValue: number;

  constructor(productDto: ProductDto) {
    this.id = productDto?.id || randomUUID();
    this.name = productDto.name;
    this.unitValue = productDto.unitValue;
  }
}
