import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { User } from './models/entities/user.entity';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  createUser(@Body() createUserDto:CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
}
