import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './sales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sales])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule { }
