import {
  NestInterceptor,
  Injectable,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }
    return handler.handle();
  }
}
