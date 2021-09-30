import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './models/dto/user-login.dto';
import { User } from 'src/users/models/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(private usersService:UsersService, private jwtService:JwtService) { }

    async login(authLoginDto: UserLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        const { email, password } = userLoginDto;

        const user = await this.usersService.findUserByEmail(email);
        if (!(await user.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        return user;
    }
    
}
