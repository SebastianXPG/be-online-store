import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './Category.entity';

@Entity('PRODUCTS')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  idProduct: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Category, { cascade: true })
  @JoinColumn({ name: 'idCategory' })
  category: Category;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  productCode: number;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  img: string;
}
