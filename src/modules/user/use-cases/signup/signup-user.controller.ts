import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SignupUserService } from './signup-user.service';
import { User } from 'src/modules/user/user.model';
import { SignupUserDTO } from './signup-user.dto';
import {Response} from 'express'
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('/signup')
export class SignupUserController {

    constructor(private readonly appService: SignupUserService) {}

    @Post('/')
    @ApiOperation({summary:"Sign up User"})
    @ApiResponse({
        status: 201,
        description:"Create a new user"
    })
    @ApiBadRequestResponse({description:"Return status 400"})
    async register(@Res() res: Response, @Body() newUser: SignupUserDTO): Promise<User> {
      try{
        const response = await this.appService.createUser(newUser);
        res.status(HttpStatus.CREATED).send(response)
        return response;
      }catch(error){
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
      }
  
    }
}
