import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

import { LoginRequestDto } from './dto/login-request.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    login(@Body() userFields: LoginRequestDto) {
        return this.authService.login(userFields);
    }
    
    @Public()
    @Post('register')
    registerUser(@Body() userFields: CreateUserDto): any {
        return this.authService.registerUser(userFields);
    }
}
