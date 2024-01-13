import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('INVOICES')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  idInvoice: string;

  @ManyToOne(() => User, (user) => user.invoices)
  @JoinColumn({ name: 'idUser' })
  user: User;

  @ManyToOne(() => Product, (product) => product.invoices)
  @JoinColumn({ name: 'idProduct' })
  products: Product[];

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'datetime', nullable: false })
  date: Date;

  @Column({ type: 'double precision', nullable: false })
  totalPrice: number;
}
