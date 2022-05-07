import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './statergy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { Constants } from 'src/utils/utils';

@Module({
  imports: [UsersModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: Constants.JWT_SECRET,
      signOptions: { expiresIn: '3600s' }
    })
  })],
  providers: [AuthService,JwtGuard, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
