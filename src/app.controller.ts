import { Controller, Request, Post, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserDto } from './users/dto/users.dto';
import { UsersService } from './users/users.service';


@Controller()
export class AppController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @ApiResponse({
        status: 200,
        description: 'Login user with username and password - get access token',
    })
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @ApiResponse({
        status: 200,
        description: 'Register user with username and password',
    })
    @Post('auth/register')
    async register(@Body() user: UserDto) {
        await this.usersService.create(user);
    }

    @ApiResponse({
        status: 200,
        description: 'Delete user with username (user must be logged in)',
    })
    @UseGuards(LocalAuthGuard)
    @Post('auth/delete')
    async deleteUser(@Request() req) {
        // Check if logged in user has the same username as the supplied username
        if(req.user.username === req.body.username) {
            await this.usersService.delete(req.body.username);
        }else {
            throw new HttpException('Forbidden', HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

}
