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
import { ApiQuery } from '@nestjs/swagger';
import { FilterOrderDto, OrderItem, OrderItemDto } from '../../shared/models';
import { OrderItemService } from '../../domain';

@Controller('order-item')
export class OrderItemController {
  private readonly logger = new Logger(OrderItemController.name);
  constructor(
    @Inject('IService<OrderItem>')
    private orderItemService: OrderItemService,
  ) {}

  @Get()
  findAll(): Promise<OrderItem[]> {
    return this.orderItemService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: Number,
    required: false,
  })
  @Get(':params')
  find(@Query('id') id?: number): Promise<OrderItem[]> {
    const filterOrderDto: FilterOrderDto = {
      id,
    };

    return this.orderItemService.find(filterOrderDto);
  }

  @Post()
  async create(@Body() orderItemDto: OrderItemDto): Promise<OrderItem> {
    const createdOrder =
      await this.orderItemService.createFromDto(orderItemDto);
    this.logger.debug({ createdOrder });
    return createdOrder;
  }

  @Put(':id')
  async put() // @Param('id') id,
  // @Body() orderItemDto: OrderItemDto,
  : Promise<OrderItem> {
    const updatedOrderItem = await this.orderItemService.edit();
    this.logger.debug(`Updated order: ${JSON.stringify(updatedOrderItem)}`);
    return updatedOrderItem;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderItemService.delete(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
