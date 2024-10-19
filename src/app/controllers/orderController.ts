import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Order, OrderDto } from '../../shared/models';
import { OrderService } from '../../domain';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(@Inject('IService<Order>') private orderService: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiQuery({
    name: 'id',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'customerId',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: String,
    required: true,
  })
  @Get(':params')
  find(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post()
  async create(@Body() orderDto: OrderDto): Promise<Order> {
    const createdOrder = await this.orderService.createFromDto(orderDto);
    this.logger.debug({ createdOrder });
    return createdOrder;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderService.delete(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
