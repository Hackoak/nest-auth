import { Delete, Get, Injectable, Post, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './interface/student.interface';
import { StudentDTO } from './dto/student.dto';

@Injectable()
export class StudentService {
     constructor(@InjectModel('Student') private studentModel: Model<Student>) { }

     @Get()
     async getStudent(): Promise<Student[]> {
          return await this.studentModel.find().exec();
     }

     @Get(':id')
     async getStudentById(id: String): Promise<Student> {
          return await this.studentModel.findById(id).exec();
     }
     @Post()
     async createStudent(data: StudentDTO): Promise<Student> {
          const student = new this.studentModel(data);
          return await student.save()
     }
     @Put()
     async updateOneStudent(id: String, data: StudentDTO): Promise<Student> {

          return await this.studentModel.findOneAndUpdate({ _id: id }, data, { new: true }).exec();
     }
     @Delete()
     async deleteStudent(id: String,): Promise<Student> {

          return await this.studentModel.findOneAndDelete({ _id: id }).exec();
     }
}
