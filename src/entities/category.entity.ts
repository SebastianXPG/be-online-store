import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('CATEGORY')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  idCategory: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  categoryCode: number;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn({ name: 'idProduct' })  
  products: Product[];
}
