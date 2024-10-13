import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Product' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'PRODUCT_CATEGORY_ID' })
  productCategoryId: number;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'DESCRIPTION' })
  description: string;

  @Column({ name: 'PRICE' })
  price: number;

  @Column({ name: 'IMAGE' })
  imageBase64: string;

  @Column({ name: 'STATUS' })
  status: string;
}
