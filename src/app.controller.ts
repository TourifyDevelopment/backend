import { Controller, Request, Post, Body, UseGuards, HttpException, HttpStatus, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserDto } from './users/dto/users.dto';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './users/schemas/users.schema';


@Controller()
export class AppController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @ApiResponse({
        status: 200,
        description: 'Login user with username and password - get access token',
    })
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        let user: User | null = await this.usersService.findOne(req.user.username);
        if(user !== null) {
            return this.authService.login(user);
        }else{
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Register user with username and password',
    })
    @Post('auth/register')
    async register(@Body() user: UserDto) {
        let returnValue = await this.usersService.create(user);
        if (returnValue instanceof Error) {
            throw new HttpException('Username already taken', HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Delete user with username (user must be logged in)',
    })
    @UseGuards(JwtAuthGuard)
    @Post('auth/delete')
    async deleteUser(@Request() req) {
        // Check if logged in user has the same username as the supplied username
        if (req.user.username === req.body.username) {
            await this.usersService.delete(req.body.username);
        } else {
            throw new HttpException('Cannot delete another user', HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @Get('user/all')
    async getAllUser() {
        return await this.usersService.getAll();
    }

}
