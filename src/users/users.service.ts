import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/users.dto';

class UserAlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserAlreadyExistsError';
    }
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async create(userDto: CreateUserDto): Promise<{} | UserAlreadyExistsError>{
        // Check if username already exists
        let result = await this.findOne(userDto.username);
        if(result) {
            return new UserAlreadyExistsError('Username ' + userDto.username + ' already exists');
        }
        await this.userModel.create(userDto);
    }

    async findOne(username: string): Promise<User | null> {
        return this.userModel.findOne({username: username});
    }

    // TODO: do we also need the password another time for deletion?
    async delete(username: string) {
        await this.userModel.deleteOne({username: username});
    }

    // TODO: remove this function (just for debug)
    async getAll(): Promise<User[]> {
        return this.userModel.find({});
    }

    async changeProfilePicture(picture: string, username: string) {
        let user = await this.userModel.findOne({username: username});
        user.profilePicture = picture;
        await user.save();
    }

    async getProfilePicture(username: string): Promise<string | null> {
        let user = await this.userModel.findOne({username: username});
        return user.profilePicture;
    }
}
