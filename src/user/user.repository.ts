import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByUserCode(userCode: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { userCode } });
    console.log('Retorno da busca por usuário:', user);
    return user;
  }

  async register(user: Partial<UserEntity>): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { userCode: user.userCode },
    });
    if (!existingUser) {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } else {
      console.log('Usuário já existe:', existingUser);
      return existingUser;
    }
  }
}
