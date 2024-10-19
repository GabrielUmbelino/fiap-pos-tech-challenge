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
import { OrderItemService } from '../../domain';
import { OrderItem, OrderItemDto } from '../../shared/models';

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
  @Get(':orderId')
  findByOrderId(@Param('orderId') orderId?: number): Promise<OrderItem[]> {
    return this.orderItemService.findByOrderId(orderId);
  }

  @Post()
  async create(@Body() orderItemDto: OrderItemDto): Promise<OrderItem> {
    const createdOrder = await this.orderItemService.create(orderItemDto);
    this.logger.debug({ createdOrder });
    return createdOrder;
  }

  @Put(':id')
  async put(
    @Param('id') id: number,
    @Body() orderItemDto: OrderItemDto,
  ): Promise<OrderItem> {
    const updatedOrderItem = await this.orderItemService.edit({
      ...orderItemDto,
      id,
    });
    this.logger.debug(`Updated order: ${JSON.stringify(updatedOrderItem)}`);
    return updatedOrderItem;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderItemService.delete(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
