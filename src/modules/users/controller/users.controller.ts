import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from '../dto/users-dto';
import { UsersService } from '../service/users.service';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiResponse({ type: UserDto, isArray: true })
  async getAll(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: UserDto })
  async getOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getUser(id);
  }

  @Post()
  @ApiBody({ type: UserDto })
  @ApiResponse({ type: UserDto })
  async create(@Body() userDto: UserDto): Promise<UserDto> {
    return await this.userService.create(userDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ type: UserDto })
  async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<UserDto> {
    return await this.userService.update(id, userDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
