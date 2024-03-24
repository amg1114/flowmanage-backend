import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async login(userFields: LoginRequestDto) {
        const user = await this.usersService.findByEmail(userFields.email);

        if (!await bcrypt.compare(userFields.password, user.password)) {
            throw new HttpException('Invalid credentials', HttpStatus.CONFLICT);
        }

        const payload = { sub: user.id, username: user.email, roles: user.roles };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async registerUser(userFields: CreateUserDto) {
        try {
            const user = await this.usersService.findByEmail(userFields.email);
            if (user) {
                throw new HttpException('User already exists', HttpStatus.CONFLICT);
            }
        }catch{
            return this.usersService.create(userFields);
        }
    }
}
