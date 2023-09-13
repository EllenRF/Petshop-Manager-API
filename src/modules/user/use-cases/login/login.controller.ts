import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUserDto } from './login-dto';
import { Response } from "express";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
@ApiTags('User')
@Controller('/login')
export class LoginController {
    constructor(private readonly appService: LoginService) { }

    @Post('/')
    @ApiOperation({summary:"Sign in User"})
    @ApiResponse({
        status: 200,
        description:"Log User in"
    })
    @ApiBadRequestResponse({description:"Return status 400"})
    async login(@Body() body: LoginUserDto, @Res() res: Response) {
        const { email, password } = body;
        const response = await this.appService.login({ email, password });
        console.log(response)
        res.status(HttpStatus.OK).send(response);
    }

}