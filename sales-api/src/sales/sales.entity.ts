import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OperationType } from './sales.enum';

@Entity()
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'set',
    enum: OperationType,
  })
  productType: OperationType;

  @Column('datetime')
  date: Date;

  @Column({
    type: 'decimal',
    default: 0,
    precision: 10
  })
  price: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  seller: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  description: string;
}
