import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignupUserDTO{
  @ApiProperty({description:"Username", example:"Example"})
  @IsNotEmpty({ message: "Username is a required field!" })
  username: string;

  @ApiProperty({description:"User email", example:"newexample@hotmail.com"})
  @IsNotEmpty({ message: "Email is a required field!" })
  @IsEmail()
  email: string;

  @ApiProperty({description:"User password", example:"Strong.Pass123"})
  @IsNotEmpty({ message: "Password must have at least: 8 characters, 1 uppercase, 1 number and 1 symbol " })
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
  password: string;

}