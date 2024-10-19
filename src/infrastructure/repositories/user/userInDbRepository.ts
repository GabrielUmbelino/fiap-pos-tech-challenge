import { Injectable } from '@nestjs/common';
import { IRepository } from '../iRepository';
import { User } from '../../../shared/models/user';
import { UserEntity } from './userEntity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserInDbRepository implements IRepository<User> {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(): Promise<User> {
    return this.repository.save({}).catch((error) => {
      throw new Error(
        `An error occurred while saving the User to the database: : ${error.message}`,
      );
    });
  }

  findById(id: number) {
    return this.repository
      .createQueryBuilder('customer')
      .where('User.id = :id', { id })
      .getOne()
      .catch((error) => {
        throw new Error(
          `An error occurred while searching the customer in the database: ${error.message}`,
        );
      });
  }

  find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  edit(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
