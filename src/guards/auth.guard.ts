import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export class AuthGurad implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
