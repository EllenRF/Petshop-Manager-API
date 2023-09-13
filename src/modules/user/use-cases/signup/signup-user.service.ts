import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/user.model';
import { SignupUserDTO } from './signup-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class SignupUserService {
    async createUser(newUser: SignupUserDTO): Promise<User> {
        const userAlreadyExists = await User.findOne({ where: { email: newUser.email } });
        if (userAlreadyExists) throw new HttpException("User already exists!", 400);
        newUser.password = await hash(newUser.password, Number(process.env.SALTORROUNDS));
        const signedupUser = await User.create({ ...newUser });
        return signedupUser;
      }
}
