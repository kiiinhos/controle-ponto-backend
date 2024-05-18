import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByUserCode(userCode: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByUserCode(userCode);
    if (!user) {
      throw new NotFoundException(`User with userCode ${userCode} not found`);
    }
    return user;
  }
}
