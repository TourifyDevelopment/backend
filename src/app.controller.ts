import { Controller, Request, Post, Body, UseGuards, HttpException, HttpStatus, Get, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
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

    @Get('/')
    @HttpCode(200)
    async test() {
        return 'OK'
    }

    @ApiResponse({
        status: 201,
        description: 'Login user with username and password - get access token',
    })
    @HttpCode(201)
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
        status: 201,
        description: 'Register user with username and password',
    })
    @HttpCode(201)
    @Post('auth/register')
    async register(@Body() user: UserDto) {
        let returnValue = await this.usersService.create(user);
        if (returnValue instanceof Error) {
            throw new HttpException('Username already taken', HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @ApiResponse({
        status: 201,
        description: 'Delete user with username (user must be logged in)',
    })
    @HttpCode(201)
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

    @ApiResponse({
        status: 200,
        description: 'Return all user',
        type: [User],
    })
    @HttpCode(200)
    @Get('user/all')
    async getAllUser(): Promise<User[] | null> {
        return await this.usersService.getAll();
    }

    @ApiResponse({
        status: 201,
        description: 'Change profile picture',
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Post('user/profilePic')
    async changeProfilePicture(@Request() req) {
        await this.usersService.changeProfilePicture(req.body.picture, req.user.username);
    }

    @ApiResponse({
        status: 200,
        description: 'Get profile Picture',
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get('user/profilePic')
    async getProfilePicture(@Request() req): Promise<string | null> {
        return this.usersService.getProfilePicture(req.user.username);
    }

    @ApiResponse({
        status: 200,
        description: 'Returns Unauthorized if the user is not logged in or the jwt token is not valid'
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get('user/valid')
    async isValid(@Request() req) {
        return {username: req.user.username};
    }
}
