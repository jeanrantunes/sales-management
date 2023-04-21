import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SalesResponse } from 'src/types/sales-response';
import { InsertResult } from 'typeorm';

export class ResponseInsertInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map(async (response: InsertResult[]): Promise<SalesResponse<Number[]>> => {
                return {
                    success: true,
                    response: (await response).map(item => item.identifiers[0].id)
                }
            }),
        );
    }
}