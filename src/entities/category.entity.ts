import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CATEGORY')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  idCategory: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  categoryCode: number;
}
