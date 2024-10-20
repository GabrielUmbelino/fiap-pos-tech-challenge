import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IService } from '../../domain/iService';
import { FilterProductDto, Product, ProductDto } from '../../shared/models';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(
    @Inject('IService<Product>') private productService: IService<Product>,
  ) {}

  @Get()
  find(@Query() filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.productService.find(filterProductDto.categoryId);
  }

  @Get(':id')
  findById(@Param('id') id?: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() productDto: ProductDto): Promise<Product> {
    const createdProduct = await this.productService.create(productDto);
    this.logger.debug(`Updated product: ${JSON.stringify(createdProduct)}`);
    return createdProduct;
  }

  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productService.edit({
      ...productDto,
      id,
    });
    this.logger.debug(`Updated product: ${JSON.stringify(updatedProduct)}`);
    return updatedProduct;
  }

  @Delete(':productId')
  async delete(@Param('productId') productId: number): Promise<void> {
    await this.productService.delete(productId);
    this.logger.debug(`Deleted product with id: ${productId}`);
  }
}
