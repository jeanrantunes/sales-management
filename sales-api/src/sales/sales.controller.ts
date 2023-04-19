import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadSalesTransactions(
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
    this.salesService.uploadSales(file);
  }
}
