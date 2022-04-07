import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/users.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

class UserAlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserAlreadyExistsError';
    }
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async create(userDto: CreateUserDto): Promise<{} | UserAlreadyExistsError> {
        // Check if username already exists
        let result = await this.findOne(userDto.username);
        if (result) {
            this.logger.log({
                level: 'error',
                message: 'Cannot create user - username already exists',
            });
            return new UserAlreadyExistsError(
                'Username ' + userDto.username + ' already exists',
            );
        }
        await this.userModel.create(userDto);
    }

    async findOne(username: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username: username });
        if (user == null) {
            this.logger.log({
                level: 'error',
                message: 'Cannot get user - username not found',
            });
        }
        return user;
    }

    // TODO: do we also need the password another time for deletion?
    async delete(username: string): Promise<Error | {}> {
        const user = await this.userModel.deleteOne({ username: username });
        if (user.deletedCount == 0) {
            this.logger.log({
                level: 'error',
                message: 'Cannot delete user - user with username not found',
            });
            return new Error('User with username not found');
        } else {
            return {};
        }
    }

    // TODO: remove this function (just for debug)
    async getAll(): Promise<User[]> {
        return this.userModel.find({});
    }

    async changeProfilePicture(
        picture: string,
        username: string,
    ): Promise<{} | Error> {
        const user = await this.userModel.findOne({ username: username });
        if (user == null) {
            this.logger.log({
                level: 'error',
                message:
                    'Cannot change profile picture of user - user not found',
            });
            return new Error('Cannot change profile picture');
        } else {
            user.profilePicture = picture;
            await user.save();
            return {};
        }
    }

    async getProfilePicture(username: string): Promise<string | null> {
        const user = await this.userModel.findOne({ username: username });
        if (user == null) {
            this.logger.log({
                level: 'error',
                message: 'Cannot get profile picture of user - user not found',
            });
            return null;
        }
        return user.profilePicture;
    }
}
