import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    // create an instance of User entity; [WHY need create]may put validation on Entity,instead of CTO, and hooks such as @AfterInsert() got executed
    return this.repo.save(user); // save an instance to DB; only run hook when called with an instance of Entity,aka. user
  }
}
