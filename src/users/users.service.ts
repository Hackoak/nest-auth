import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
import { UserDocument } from './entity/user.schema';



@Injectable()
export class UsersService {
     constructor(@InjectModel('user') private readonly userModel:Model<UserDocument>){}
    

      getUserDetail(user: UserDocument):UserInterface  {
           return {
                id: user._id,
                name: user.name,
                email: user.email,
           };
     }

     async findByEmail(email: String): Promise<UserDocument | null>{
          return await this.userModel.findOne({email}).exec()
     }
     async findById(id: String): Promise<UserDocument | null>{
          const user = await this.userModel.findById(id).exec();
          if (!user) return null;
          return user;
     }

     async createuser(name: String, email: String, hashedPass: String): Promise<UserDocument>{
          const newuser = new this.userModel({ name, email, password: hashedPass });
          return newuser.save();
     }
}