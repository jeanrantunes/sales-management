import { Body, Controller, Post } from '@nestjs/common';

@Controller('sales')
export class SalesController {
  @Post('upload')
  addSalesTransactions(@Body() file: any) {
    console.log(file);
  }
}
