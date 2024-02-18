import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    login(@Body() userFields: LoginRequestDto) {
        return this.authService.login(userFields);
    }
    
    @Get('profile')
    getProfile(): any {
        return "req.user";
    }
}
