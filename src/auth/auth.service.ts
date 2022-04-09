import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.usersService.findOne(username);
        if (user) {
            // Check if passwords match
            const isMatch = await bcrypt.compare(pass, user.password);
            if(isMatch) {
                // Clear passwd for security reasons
                user.password = '';
                return user;
            }

        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
