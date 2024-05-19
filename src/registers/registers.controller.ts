import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { RegistersService } from './registers.service';
import { UserEntry, UserExit } from './registers.interface';

@Controller('registers')
export class RegistersController {
  constructor(private readonly registersService: RegistersService) {}

  @Get('entry/:userCode')
  async getEntryHistory(
    @Param('userCode') userCode: string,
  ): Promise<UserEntry[]> {
    return await this.registersService.getEntryHistory(userCode);
  }

  @Get('exit/:userCode')
  async getExitHistory(
    @Param('userCode') userCode: string,
  ): Promise<UserExit[]> {
    return await this.registersService.getExitHistory(userCode);
  }

  @Post('entry')
  @HttpCode(201)
  async registerEntry(@Body() body: { userCode: string }) {
    const { userCode } = body;
    return await this.registersService.registryEntry(userCode);
  }

  @Post('exit')
  @HttpCode(201)
  async registerExit(@Body() body: { userCode: string }) {
    const { userCode } = body;
    return await this.registersService.registryExit(userCode);
  }
}
