import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number) {
    // return this.repo.findOne({ email: 'wang@exotic.io' });
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.findBy({ email: email });
  }

  async update(id: number, attrs: Partial<User>) {
    //Partial is defined by TS,obj that has part of attributes
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    return this.repo.remove(user);
  }
}
