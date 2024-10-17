import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Guest' })
export class GuestEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;
}
