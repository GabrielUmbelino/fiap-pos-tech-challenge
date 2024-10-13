import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Order' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'STATUS' })
  status: string;
  // TODO: implement relationship with orderProducts
  // TODO: implement relationship with customer
}
