import { randomInt } from 'crypto';
import { IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  id?: number;
}

export class FilterUserDto {
  @IsOptional()
  id?: number;
}

export class User {
  id?: number;

  constructor(userDto: UserDto) {
    this.id = userDto?.id || randomInt(999);
  }
}
