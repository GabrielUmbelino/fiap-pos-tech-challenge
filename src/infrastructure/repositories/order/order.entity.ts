import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CustomerEntity } from '../customer';
import { OrderItemEntity } from '../orderItem';

@Entity({ name: 'Order' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'status' })
  status: 'new' | 'confirmed' | 'inProgress' | 'finished' | 'canceled';

  @Column({ name: 'total_price' })
  totalPrice: string;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn()
  customer: CustomerEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items: OrderItemEntity[];
}
