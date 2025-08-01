import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersServide: UsersService) {}

  async signup(email: string, password: string) {
    // 1) check if email in use
    const users = await this.usersServide.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    //2)  hash pass
    // generate a salt
    const salt = randomBytes(8).toString('hex');
    //hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join the hashed result and salt
    const result = salt + '.' + hash.toString('hex');
    // 3) create new User save
    const user = await this.usersServide.create(email, result);
    // 4) return user to controller for cookie setting
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersServide.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedhash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedhash !== hash.toString('hex')) {
      throw new BadRequestException('Bad request');
    } else {
      return user;
    }
  }
}
