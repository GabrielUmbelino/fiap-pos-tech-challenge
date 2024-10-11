import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Customer' })
export class ClienteEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'EMAIL' })
  email: string;

  @Column({ name: 'CPF' })
  cpf: string;
}
