import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './login-dto';
import { User } from '../../user.model';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {

    constructor(private jwtService: JwtService) { }

    async login(login: LoginUserDto): Promise<Object> {
        const userExists = await User.findOne({
            where: {
                email: login.email,
            }
        });

        if (!userExists) throw new HttpException("User doesn't exist, check your credentials", 400);
        const validPassword = await bcrypt.compare(login.password, userExists.password);
        if (!validPassword) throw new HttpException("Invalid password, try again!", 400);
        const payload = { sub: userExists.id, email: userExists.email }

        return {
            message: "Logged in succesfully!",
            user: userExists,
        access_token: await this.jwtService.signAsync(payload, {secret: "716f925b8fc42ac54bd726d2a424550af5cea212"}),
        }
    }
}