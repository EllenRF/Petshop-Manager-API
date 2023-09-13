import { Module } from "@nestjs/common";
import { SignupUserController } from "./use-cases/signup/signup-user.controller";
import { LoginController } from "./use-cases/login/login.controller";
import { SignupUserService } from "./use-cases/signup/signup-user.service";
import { LoginService } from "./use-cases/login/login.service";

@Module({
  controllers: [SignupUserController, LoginController],
  providers: [SignupUserService, LoginService]
})
export class UserModule {}
