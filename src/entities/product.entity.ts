import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { Invoice } from './invoice.entity';

@Entity('PRODUCTS')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  idProduct: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  productCode: number;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  img: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'IdCategory' })
  category: Category;

  @OneToMany(() => Invoice, (invoice) => invoice.products)
  @JoinColumn({ name: 'idInvoice' })
  invoices: Invoice[];
}
