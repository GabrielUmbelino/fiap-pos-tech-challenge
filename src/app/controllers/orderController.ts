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
  find() // @Query('id') id?: number,
  // @Query('customerId') customerId?: number,
  // @Query('status') status?: Order['status'],
  : Promise<Order[]> {
    // const filterOrderDto: FilterOrderDto = {
    //   id,
    //   customerId,
    //   status,
    // };

    return this.orderService.findAll();
  }

  @Post()
  async create(@Body() orderDto: OrderDto): Promise<Order> {
    const createdOrder = await this.orderService.createFromDto(orderDto);
    this.logger.debug({ createdOrder });
    return createdOrder;
  }

  @Put(':id')
  async put(@Body() orderDto: OrderDto): Promise<Order> {
    const updatedOrder = await this.orderService.editFromDto(orderDto);
    this.logger.debug(`Updated order: ${JSON.stringify(updatedOrder)}`);
    return updatedOrder;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderService.delete(id);
    this.logger.debug(`Deleted order with id: ${id}`);
  }
}
