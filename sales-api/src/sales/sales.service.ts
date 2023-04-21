import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesEntity } from './sales.entity';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import { eachLine } from 'line-reader';
import { OperationType } from './sales.enum'
import { isDateValid } from 'src/helpers/date';
import { createInterface } from 'readline'
import { once } from 'events'
@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesEntity)
    private salesRepository: Repository<SalesEntity>,
  ) { }

  async addTransactions(salesTransactions: SalesEntity) {
    return await this.salesRepository.save(salesTransactions);
  }

  async uploadSales(file: Express.Multer.File) {
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
              productType: this.getOperationType(line),
              date: this.getOperationDate(line),
              price: this.getProductPrice(line),
              seller: this.getSeller(line),
            })

            const ret = this.salesRepository.insert(operation)
            resolve(ret)
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

  getOperationType(line: string) {
    const possibleOperationType = parseInt(line.slice(0, 1))
    const operationTypes = Object.values(OperationType)

    if (!operationTypes.includes(possibleOperationType)) {
      throw new Error("Operation type is not valid");
    }
    return possibleOperationType
  }

  getOperationDate(line: string) {
    const operationDate = line.slice(1, 26)

    if (!isDateValid(new Date(operationDate))) {
      throw new Error("Operation date is not valid");
    }

    return operationDate
  }

  getProductDescription(line: string) {
    const productDescription = line.slice(26, 56)

    if (!productDescription) {
      throw new Error("Missing product description");
    }

    return productDescription
  }

  getProductPrice(line: string) {
    const price = Number(line.slice(56, 66))

    if (isNaN(price)) {
      throw new Error("Product price is not valid");
    }

    return price
  }

  getSeller(line: string) {
    const seller = line.slice(66, 86)

    if (!seller) {
      throw new Error("Seller is missing");
    }

    return seller
  }
}
