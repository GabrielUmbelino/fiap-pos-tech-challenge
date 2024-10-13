import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;
}
