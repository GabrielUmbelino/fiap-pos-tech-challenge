import { randomInt } from 'crypto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductDto {
  @IsOptional()
  id: number;
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  price?: number;
}

export class FilterProductDto {
  @IsOptional()
  id?: number;
  @IsOptional()
  name?: string;
  @IsOptional()
  price?: number;
}

export class Product {
  id?: number;
  name: string;
  price: number;

  constructor(productDto: ProductDto) {
    this.id = productDto?.id || randomInt(999);
    this.name = productDto.name;
    this.price = productDto.price;
  }
}
