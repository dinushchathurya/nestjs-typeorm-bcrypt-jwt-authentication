import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepositiry: Repository<User>) { }

    async createUser(createUserDto:CreateUserDto): Promise<User> {
        const user = await this.usersRepositiry.create(createUserDto);
        await user.save();

        delete user.password;
        return user;
    }

    async findUserByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }
}
