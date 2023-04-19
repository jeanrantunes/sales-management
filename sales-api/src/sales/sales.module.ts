import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesEntity } from './sales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesEntity])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
