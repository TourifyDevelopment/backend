import {
    Controller,
    Request,
    Post,
    Body,
    UseGuards,
    HttpException,
    HttpStatus,
    Get,
    HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CreateUserDto } from './users/dto/users.dto';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './users/schemas/users.schema';
import { ChangeProfilePictureDto } from './users/dto/changeprofilepic.dto';
import { UserLoginDto } from './users/dto/userlogin.dto';
import { DeleteUserDto } from './users/dto/deleteuser.dto';

@Controller()
export class AppController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @Get('/')
    @HttpCode(200)
    async test() {
        return 'OK';
    }

    @ApiResponse({
        status: 201,
        description: 'Login user with username and password - get access token',
    })
    @HttpCode(201)
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req, @Body() _: UserLoginDto) {
        const user: User | null = await this.usersService.findOne(
      req.user.username,
    );
        if (user !== null) {
            return this.authService.login(user);
        } else {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
    }

    @ApiResponse({
        status: 201,
        description: 'Register user with username and password',
    })
    @HttpCode(201)
    @Post('auth/register')
    async register(@Body() user: CreateUserDto) {
        const returnValue = await this.usersService.create(user);
        if (returnValue instanceof Error) {
            throw new HttpException(
                'Username already taken',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }
    }

    @ApiResponse({
        status: 201,
        description: 'Delete user with username (user must be logged in)',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({
        status: 405,
        description:
      'Cannot delete another user(Log in as the user you want to delete)',
    })
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @Post('auth/delete')
    async deleteUser(@Request() req, @Body() deleteUserDto: DeleteUserDto) {
    // Check if logged in user has the same username as the supplied username
        if (req.user.username === deleteUserDto.username) {
            const result = await this.usersService.delete(deleteUserDto.username);
            if (result instanceof Error) {
                throw new HttpException(result.message, HttpStatus.NOT_FOUND);
            }
        } else {
            throw new HttpException(
                'Cannot delete another user',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
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
        description: 'Changed profile picture',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Post('user/profilePic')
    async changeProfilePicture(
    @Request() req,
        @Body() changePictureDto: ChangeProfilePictureDto,
    ) {
        const result = await this.usersService.changeProfilePicture(
      changePictureDto.picture,
      req.user.username,
    );
        if (result instanceof Error) {
            throw new HttpException(result.message, HttpStatus.NOT_FOUND);
        }
    }

    @ApiResponse({
        status: 200,
        description: 'Get profile Picture',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get('user/profilePic')
    async getProfilePicture(@Request() req): Promise<string | null> {
        let result = await this.usersService.getProfilePicture(req.user.username);
        if (result == null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    @ApiResponse({
        status: 200,
        description:
      'Returns Unauthorized if the user is not logged in or the jwt token is not valid',
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get('user/valid')
    async isValid(@Request() req) {
        return { username: req.user.username };
    }
}
