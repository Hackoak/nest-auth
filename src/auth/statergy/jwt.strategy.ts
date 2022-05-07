import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Constants } from 'src/utils/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(private authService: AuthService) {
          super({
               jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
               ignoreExpiration: false,
               secretOrKey: Constants.JWT_SECRET
          }
          );
     }

     async validate(payload: any): Promise<any> {

          return { ...payload.user };
     }
}