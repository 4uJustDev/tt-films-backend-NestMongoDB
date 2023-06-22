import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private jwtService : JwtService
    ) {}

    async signUp(signUpDto : SignUpDto) : Promise<{token : string}>{
        const {username, email, password} = signUpDto;

        // const salt = await bcrypt.genSalt();
        const salt = 10;
        const passwordHash = await bcrypt.hash(password, salt)

        const user = await this.userModel.create({username, email, password: passwordHash})

        const token = this.jwtService.sign({id: user._id})

        return { token }
    }

    async login (loginDto : LoginDto) : Promise<{token : string}> {
        const {email, password} =loginDto;

        const user = await this.userModel.findOne({email})
        
        if(!user){
            throw new UnauthorizedException("Invalid email or password")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = this.jwtService.sign({id: user._id})

        return { token }
    }
}
