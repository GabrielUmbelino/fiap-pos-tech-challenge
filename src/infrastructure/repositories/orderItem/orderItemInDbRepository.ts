import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOrderItemDto,
  OrderItem,
} from '../../../shared/models/orderItem';
import { OrderItemEntity } from './orderItem.entity';
import { IRepository } from '../iRepository';

@Injectable()
export class OrderInDbRepository implements IRepository<OrderItem> {
  constructor(
    @InjectRepository(OrderItemEntity)
    private repository: Repository<OrderItemEntity>,
  ) {}

  create(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository
      .save({
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
          quantity: orderItemEntity.quantity,
          product: orderItemEntity.product,
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the customer in the database: '${JSON.stringify(filterOrderItemDto)}': ${error.message}`,
        );
      });
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  edit(): Promise<OrderItem> {
    throw new Error('Method not implemented.');
  }
}
