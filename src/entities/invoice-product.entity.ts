import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity';
import { Product } from './product.entity';

@Entity('INVOICEPRODUCTS')
export class InvoiceProduct {
  @PrimaryGeneratedColumn('uuid')
  idInvoiceProduct: string;

  @Column({ nullable: false })
  countProduct: number;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.idInvoice)
  @JoinColumn({ name: 'idInvoice' })
  invoices: Invoice;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn({ name: 'idProduct' })
  products: Product[];
}
