import { Expose } from 'class-transformer';

export class UserDto {
  // list all property that want to share with outside
  @Expose()
  id: number;
  @Expose()
  email: string;
}
