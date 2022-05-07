import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/users/dto/new_user.dto';
import { ExistingUserDTO } from 'src/users/dto/user.dto';
import { UserInterface } from 'src/users/interface/user.interface';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
     constructor(private usersService: UsersService, private jwtService: JwtService) { }


     async register(user: Readonly<NewUserDTO>): Promise<UserInterface | any> {
          const { name, email, password } = user;

          const existingUser = await this.usersService.findByEmail(email);

          if (existingUser) return 'Email is already taken';

          const hashedPassword = await this.hashPassword(password);

          const newUser = await this.usersService.createuser(name, email, hashedPassword);

          return this.usersService.getUserDetail(newUser);

     }

     async login(existingUser: ExistingUserDTO): Promise<{ token: String } | null> {
          const { email, password } = existingUser;

          const user = await this.validateUser(email, password);
          console.log(user);
          if (!user) return null;
          const jwt = await this.jwtService.signAsync({ user })
          return { token: jwt };

     }
     
     //? Functions
     async hashPassword(password: String): Promise<String> {
          return bcrypt.hash(password, 12)
     }

     async doesPasswordMatch(password: String, hashedpassword: String): Promise<boolean> {
          return bcrypt.compare(password, hashedpassword)
     }

     async validateUser(email: String, password: String): Promise<UserInterface | null> {
          const user = await this.usersService.findByEmail(email);
          const doesUserExist = !!user;

          if (!doesUserExist) return null;

          const doesPasswordMatch = await this.doesPasswordMatch(
               password,
               user.password
          );

          if (!doesPasswordMatch) return null;

          return this.usersService.getUserDetail(user);
     }
}