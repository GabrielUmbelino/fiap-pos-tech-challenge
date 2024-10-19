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
import {
  Category,
  FilterProductDto,
  Product,
  ProductDto,
} from '../../shared/models';
import { IService } from '../../domain/iService';
import { ProductService } from '../../domain';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(
    @Inject('IService<Product>') private productService: ProductService,
    @Inject('IService<Category>') private categoryService: IService<Category>,
  ) {}

  @Get()
  find(@Query() filterProductDto: FilterProductDto): Promise<Product[]> {
    return this.productService.find(filterProductDto);
  }

  @Get(':id')
  findById(@Param('id') id?: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() productDto: ProductDto): Promise<Product> {
    const categories = await this.categoryService.find({
      id: productDto.categoryId,
    });
    const [category] = categories;
    const product = new Product(productDto, category);
    const createdProduct = await this.productService.create(product);
    this.logger.debug(`Updated product: ${JSON.stringify(createdProduct)}`);
    return createdProduct;
  }

  @Put(':id')
  async edit(@Body() productDto: ProductDto): Promise<Product> {
    const [category] = await this.categoryService.find({
      id: productDto.categoryId,
    });
    const product = new Product(productDto, category);
    const updatedProduct = await this.productService.edit(product);
    this.logger.debug(`Updated product: ${JSON.stringify(updatedProduct)}`);
    return updatedProduct;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.delete(id);
    this.logger.debug(`Deleted product with id: ${id}`);
  }
}
