import { Inject, Injectable } from '@nestjs/common';
import { OrderService } from '../order/orderService';
import { IService } from '../../iService';
import {
  FilterOrderItemDto,
  OrderItemDto,
  OrderItem,
} from '../../../shared/models';
import { OrderItemInDbRepository } from '../../../infrastructure/repositories/orderItem';
import { ProductService } from '../product';

@Injectable()
export class OrderItemService implements IService<OrderItem> {
  constructor(
    @Inject('IRepository<OrderItem>')
    private readonly orderItemRepository: OrderItemInDbRepository,
    @Inject('IService<Product>')
    private readonly productService: ProductService,
    @Inject('IService<Order>')
    private readonly orderService: OrderService,
  ) {}

  create(): Promise<OrderItem> {
    throw new Error('Method not implemented.');
  }

  async createFromDto(orderItemDto: OrderItemDto): Promise<OrderItem> {
    const product = await this.productService.findById(orderItemDto.productId);
    const order = await this.orderService.findById({
      id: orderItemDto.orderId,
    });
    console.log({ product, order });

    return this.orderItemRepository.createFromDto(
      {
        product,
        quantity: orderItemDto.quantity,
      },
      order,
    );
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll();
  }

  find(filterOrderItemDto: FilterOrderItemDto): Promise<OrderItem[]> {
    return this.orderItemRepository.find(filterOrderItemDto);
  }

  // async editFromDto(id, orderItemDto: OrderItemDto): Promise<OrderItem> {
  //   const products = await this.productService.find({
  //     id: orderItemDto.productId,
  //   });
  //   console.log(products);
  //   const [product] = products;
  //   return this.orderItemRepository.edit({
  //     id,
  //     quantity: orderItemDto.quantity,
  //     product,
  //   });
  // }

  edit(): Promise<OrderItem> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    return this.orderItemRepository.delete(id);
  }
}
