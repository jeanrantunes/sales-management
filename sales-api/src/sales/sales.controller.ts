import {
  Controller,
  FileTypeValidator,
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

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
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
  ) {
    try {
      const i = await this.salesService.uploadSales(file)
      console.log(i)
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
}
