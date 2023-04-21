import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Sales } from '../sales/sales.entity';
import { SalesResponse } from '../types/sales-response';

export class ResponseFindInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map(async (response: Sales[]): Promise<SalesResponse<Sales[]>> => {
                return {
                    success: true,
                    response
                }
            }),
        );
    }
}