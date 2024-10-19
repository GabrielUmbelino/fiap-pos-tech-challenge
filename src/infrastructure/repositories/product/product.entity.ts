import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../category';

@Entity({ name: 'Product' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category, {
    cascade: true,
  })
  category: CategoryEntity;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'price' })
  price: string;

  @Column({ name: 'status' })
  status: 'available' | 'draft' | 'outOfStock' | 'deleted';

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'image', nullable: true })
  imageBase64: string;
}
