import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('INVOICES')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  idInvoice: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'idUser' })
  user: User;

  @OneToOne(() => Product, { cascade: true })
  @JoinColumn({ name: 'idProduct' })
  product: Product;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'datetime', nullable: false })
  date: Date;

  @Column({ type: 'double precision', nullable: false })
  totalPrice: number;
}
