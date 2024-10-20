import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from './orderItemEntity';
import { IRepository } from '../iRepository';
import { OrderItem } from '../../../shared/models/orderItem';

@Injectable()
export class OrderItemInDbRepository implements IRepository<OrderItem> {
  constructor(
    @InjectRepository(OrderItemEntity)
    private repository: Repository<OrderItemEntity>,
  ) {}
  findById(): Promise<OrderItem> {
    throw new Error('Method not implemented.');
  }

  create(orderItem: OrderItem): Promise<OrderItem> {
    return this.repository
      .save(orderItem)
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

  find(orderId: number): Promise<OrderItem[]> {
    return this.repository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('orderItem.orderId = :orderId', {
        orderId: orderId,
      })
      .getMany()
      .then((orderItemEntities) => {
        console.log(orderItemEntities);
        return orderItemEntities.map((orderItemEntity) => ({
          id: orderItemEntity.id,
          product: orderItemEntity.product,
          quantity: orderItemEntity.quantity,
          productPrice: orderItemEntity.productPrice,
          order: orderItemEntity.order,
        }));
      })
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the orderItem in the database: '${JSON.stringify(orderId)}': ${error.message}`,
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
