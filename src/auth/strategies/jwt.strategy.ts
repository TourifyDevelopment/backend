import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //secretOrKey: configService.get<string>('JWT_SECRET'),
      secretOrKey: 'jalsdfjkaksd',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}