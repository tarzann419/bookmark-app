/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// auth is for prefix
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        // console.log({
        //     dto,
        // })
        return this.authService.signup(dto);
    }

    @Post('signin')
    signIn(){
        return 'This is the Sign In';
    }
}
