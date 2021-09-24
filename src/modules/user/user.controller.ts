import { Controller, Body, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';
import { UserInfoResponse } from './vo/user-info.vo';
import { TokenResponse } from './vo/token.vo';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<UserInfoResponse> {
    return this.userService.register(registerDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<any> {
    return this.userService.login(loginDTO);
  }
}
