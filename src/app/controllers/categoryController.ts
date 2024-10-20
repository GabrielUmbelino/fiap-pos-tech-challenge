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
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { IService } from '../../domain/iService';
import { Category, CategoryDto } from '../../shared/models';

@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(
    @Inject('IService<Category>') private categoryService: IService<Category>,
  ) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'categoryName',
    type: String,
    required: false,
  })
  @Get(':id')
  find(@Param('id') id?: number): Promise<Category[]> {
    return this.categoryService.find(id);
  }

  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
    const category = await this.categoryService.create(categoryDto);
    this.logger.debug(`Created category: ${JSON.stringify(category)}`);
    return category;
  }

  @Put(':id')
  async edit(
    @Param('id') id,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryService.edit({
      ...categoryDto,
      id,
    });
    this.logger.debug(`Updated category: ${JSON.stringify(updatedCategory)}`);
    return updatedCategory;
  }

  @Delete(':categoryId')
  async delete(@Param('categoryId') categoryId: number): Promise<void> {
    await this.categoryService.delete(categoryId);
    this.logger.debug(`Deleted category with id: ${categoryId}`);
  }
}
