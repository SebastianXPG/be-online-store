import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('USERS')
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: number;

  @Column({ nullable: false })
  identification: string;

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  @JoinColumn({ name: 'idInvoice' })
  invoices: Invoice[];
}
