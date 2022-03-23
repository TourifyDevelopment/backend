import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any): Promise<User | Error> {
        Logger.log(payload);
        let user: User | null = await this.userService.findOne(payload.username);
        Logger.log(user);
        if(user && user !== null) {
            return user;
        }else{
            return new UnauthorizedException();
        }
    }
}