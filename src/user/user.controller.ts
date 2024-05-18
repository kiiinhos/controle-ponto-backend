import {
  Controller,
  Get,
  Param,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userCode')
  @HttpCode(200)
  async getUser(@Param('userCode') userCode: string) {
    const user = await this.userService.getUserByUserCode(userCode);
    if (!user) {
      throw new NotFoundException(`User with userCode ${userCode} not found`);
    }
    return user;
  }
}
