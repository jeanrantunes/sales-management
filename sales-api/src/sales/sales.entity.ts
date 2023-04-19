import { Column, Decimal128, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionType {
  SALLER_PRODUCER = 1,
  AFFILIATE_SELLING = 2,
  COMMISSION_PAID = 3,
  COMMISSION_RECEIVED = 4,
}

@Entity()
export class SalesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'set',
    enum: TransactionType,
  })
  productType: number;

  @Column('date')
  date: Date;

  @Column('decimal')
  price: number;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  seller: string;
}
