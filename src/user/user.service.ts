import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  addUser = async (body: UserDto): Promise<User> => {
    try {
      const user = this.usersRepository.create({
        userName: body.userName,
        description: body.description,
      });
      await this.usersRepository.save(user);
      return user;
    } catch (e) {
      this.logger.error('Error in adding user', e);
      throw e;
    }
  };

  getUserById = async (id: number): Promise<User> => {
    return this.usersRepository.findOne(id);
  };

  getAllUsers = async (): Promise<User[]> => {
    try {
      return await this.usersRepository.find();
    } catch (e) {
      this.logger.error(e);
    }
  };
}
