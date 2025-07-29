import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  //pass a dto into cons
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run sth before a req handled by request handler
    console.log('I run before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // Run sth after controller send the response
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
