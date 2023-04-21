import { SalesModule } from './sales/sales.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sales } from './sales/sales.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'default',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'SALES',
        entities: [Sales],
        synchronize: true,
      }),
    }),
    SalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
