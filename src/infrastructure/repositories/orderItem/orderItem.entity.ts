import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../product';
import { OrderEntity } from '../order/order.entity';

@Entity({ name: 'OrderItem' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'QUANTITY' })
  quantity: number;

  @Column({ name: 'PRODUCT_PRICE', nullable: true })
  productPrice?: string;

  @ManyToOne(() => ProductEntity, (product) => product, { cascade: true })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.items, { cascade: true })
  order: OrderEntity;
}
