import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByUserCode(userCode: string): Promise<UserEntity> {
    let user = await this.userRepository.findOne({ where: { userCode } });
    if (!user) {
      user = new UserEntity();
      user.userCode = userCode;
      await this.userRepository.save(user);
    }
    return user;
  }
}
