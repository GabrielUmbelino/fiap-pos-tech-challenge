import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../category';

@Entity({ name: 'Product' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category, { cascade: true })
  category: CategoryEntity;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'PRICE' })
  price: string;

  @Column({ name: 'STATUS' })
  status: 'available' | 'draft' | 'outOfStock' | 'deleted';

  @Column({ name: 'DESCRIPTION', nullable: true })
  description: string;

  @Column({ name: 'IMAGE', nullable: true })
  imageBase64: string;
}
