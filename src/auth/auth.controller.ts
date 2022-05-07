import { Get, Post, Controller, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { NewUserDTO } from 'src/users/dto/new_user.dto';
import { ExistingUserDTO } from 'src/users/dto/user.dto';
import { UserInterface } from 'src/users/interface/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
     constructor(private readonly authService: AuthService) {

     }
     @Post('register')
     async register(@Body() user: NewUserDTO): Promise<UserInterface> {
          return await this.authService.register(user);
     }
     
     @Post('login')
     @HttpCode(HttpStatus.OK)
     async login(@Body() user: ExistingUserDTO): Promise<{ token: String }> {
          return await this.authService.login(user);
     }

}
