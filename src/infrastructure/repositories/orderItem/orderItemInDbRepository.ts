import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from './orderItemEntity';
import { IRepository } from '../iRepository';
import {
  FilterOrderItemDto,
  OrderItem,
} from '../../../shared/models/orderItem';
import { Order } from '../../../shared/models';

@Injectable()
export class OrderItemInDbRepository implements IRepository<OrderItem> {
  constructor(
    @InjectRepository(OrderItemEntity)
    private repository: Repository<OrderItemEntity>,
  ) {}
  create(): Promise<OrderItem> {
    throw new Error('Method not implemented.');
  }

  createFromDto(orderItem: OrderItem, order: Order): Promise<OrderItem> {
    return this.repository
      .save({
        order: order,
        quantity: orderItem.quantity,
        product: orderItem.product,
      })
      .then((orderItemEntity) => orderItemEntity)
      .catch((error) => {
        throw new Error(
          `An error occurred while saving the orderItem to the database: '${JSON.stringify(orderItem)}': ${error.message}`,
        );
      });
  }

  findAll(): Promise<OrderItem[]> {
    throw new Error('Method not implemented.');
  }

  find(filterOrderItemDto: FilterOrderItemDto): Promise<OrderItem[]> {
    return this.repository
      .findBy(filterOrderItemDto)
      .then((orderItemEntities) => {
        return orderItemEntities.map((orderItemEntity) => ({
          id: orderItemEntity.id,
          product: orderItemEntity.product,
          quantity: orderItemEntity.quantity,
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the orderItem in the database: '${JSON.stringify(filterOrderItemDto)}': ${error.message}`,
        );
      });
  }

  delete(id): Promise<void> {
    throw new Error('Method not implemented.' + id);
  }

  edit(): Promise<OrderItem> {
    throw new Error('Method not implemented.');
  }
}
