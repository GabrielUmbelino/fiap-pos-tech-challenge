import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'DOCUMENT' })
  document: string;

  @Column({ name: 'PHONE_NUMBER' })
  phoneNumber: string;
}
