import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from './sales.entity';
import { InsertResult, Repository } from 'typeorm';
import { Readable } from 'stream';
import { OperationType } from './sales.enum'
import { isDateValid } from 'src/helpers/date';
import { createInterface } from 'readline'
import { once } from 'events'
import { extractOperationDate, extractOperationType, extractProductDescription, extractProductPrice, extractSellerName } from './helpers/extractDataFromFileLines';
@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private salesRepository: Repository<Sales>,
  ) { }

  async addTransactions(salesTransactions: Sales) {
    return await this.salesRepository.save(salesTransactions);
  }

  getAllSales(): Promise<Sales[]> {
    try {
      return this.salesRepository.find()
    } catch (err) {
      console.log(err)
    }
  }

  async uploadSales(file: Express.Multer.File): Promise<InsertResult[]> {
    const promises = []

    try {
      const rl = createInterface({
        input: Readable.from(file.buffer),
        crlfDelay: Infinity
      });

      rl.on('line', (line) => {
        promises.push(new Promise((resolve, reject) => {
          try {
            const operation = this.salesRepository.create({
              productType: extractOperationType(line),
              date: extractOperationDate(line),
              price: extractProductPrice(line),
              seller: extractSellerName(line),
              description: extractProductDescription(line)
            })

            const response = this.salesRepository.insert(operation)
            resolve(response)
          } catch (err) {
            err.line = promises.length + 1
            reject(err)
          }
        }))
      });

      await once(rl, 'close');
    } catch (err) {
      throw err
    }
    return Promise.all(promises)
  }
}
