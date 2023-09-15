import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument} from '../users/schemas/user.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private userService : UsersService,
        private jwtService : JwtService
    ) {}

    async registration(dto : CreateUserDto) : Promise<{token : string}>{

        const candidate = await this.userService.getUserByEmail(dto.email)

        if (candidate){
            throw new UnauthorizedException("This email is already use")
        }

        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(dto.password, salt)

        const user = await this.userService.createUser({...dto, password : passwordHash})

        console.log("AUTH USER" + user)
        return this.generateToken(user)
    }

    async login (dto : CreateUserDto) : Promise<{token : string}> {

        const user = await this.validateUser(dto);

        return this.generateToken(user);
    }

    async generateToken(user){
        const payload = {email: user.email, id: user._id, roles: user.roles};

        return {
            token: this.jwtService.sign(payload)
        };

    }

    async validateUser(dto : CreateUserDto){
        const user = await this.userService.getUserByEmail(dto.email);

        const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);

        if(isPasswordCorrect && user){

            return user;
        }

        throw new UnauthorizedException("Invalid email or password");
    }

}
