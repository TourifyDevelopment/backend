import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            //secret: process.env.JWT_SECRET,
            secret: 'jalsdfjkaksd',
            signOptions: { expiresIn: '60s' },
        }),

    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
