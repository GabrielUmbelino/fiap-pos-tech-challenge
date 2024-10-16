import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CustomerEntity } from '../customer';
import { OrderItemEntity } from '../orderItem';

@Entity({ name: 'Order' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'STATUS' })
  status: 'new' | 'confirmed' | 'inProgress' | 'finished' | 'canceled';

  @Column({ name: 'TOTAL_PRICE' })
  totalPrice: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer, { cascade: true })
  customer: CustomerEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items: OrderItemEntity[];
}
