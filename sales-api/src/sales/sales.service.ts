import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesEntity } from './sales.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesEntity)
    private salesRepository: Repository<SalesEntity>,
  ) {}

  async addTransactions(salesTransactions: SalesEntity) {
    return await this.salesRepository.save(salesTransactions);
  }
}
