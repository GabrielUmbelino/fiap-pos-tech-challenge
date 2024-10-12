import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductDto {
  @IsOptional()
  id: number;
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  unitValue?: number;
}

export class FilterProductDto {
  @IsOptional()
  id?: number;
  @IsOptional()
  name?: string;
  @IsOptional()
  unitValue?: number;
}

export class Product {
  id?: number;
  name: string;
  unitValue: number;

  constructor(productDto: ProductDto) {
    this.id = productDto?.id || randomInt(999);
    this.name = productDto.name;
    this.unitValue = productDto.unitValue;
  }
}
