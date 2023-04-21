import {
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SalesService } from './sales.service';
import { ResponseInsertInterceptors } from '../interceptors/response-insert.interceptor';
import { ResponseFindInterceptors } from '../interceptors/response-find.interceptor';
import { InsertResult } from 'typeorm';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ResponseInsertInterceptors)
  async uploadSalesTransactions(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 4 }),
          new FileTypeValidator({ fileType: 'text/plain' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<InsertResult[]> {
    try {
      return await this.salesService.uploadSales(file)
    } catch (err) {

      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        line: err.line
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: err
      });
    }
  }

  @Get('/')
  @UseInterceptors(ResponseFindInterceptors)
  async findAll() {
    return this.salesService.getAllSales()
  }
}
