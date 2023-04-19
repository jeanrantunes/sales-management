import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesEntity } from './sales.entity';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesEntity)
    private salesRepository: Repository<SalesEntity>,
  ) {}

  async addTransactions(salesTransactions: SalesEntity) {
    return await this.salesRepository.save(salesTransactions);
  }

  uploadSales(file: Express.Multer.File) {
    const data = createReadStream(file.buffer, 'utf8');
    console.log(data);
  }
}
