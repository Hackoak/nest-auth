import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Student } from './interface/student.interface';
import { StudentDTO } from './dto/student.dto';
import { StudentService } from './student.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('student')
export class StudentController {
     constructor(private readonly studentService: StudentService) { }
     @Get()
     async getStudent(): Promise<Student[]> {
          return await this.studentService.getStudent();
     }

     @UseGuards(JwtGuard)
     @Get(":id")
     async getStudentById(@Param('id') id: String): Promise<Student> {
          return await this.studentService.getStudentById(id);
     }


     @Post()
     async createStudent(@Body() data: StudentDTO): Promise<Student> {
          return await this.studentService.createStudent(data);
     }

     @Put(":id")
     async updateOneStudent(@Param('id') id: String, @Body() data: StudentDTO): Promise<Student> {
          return await this.studentService.updateOneStudent(id, data);
     }

     @Delete(":id")
     async deleteStudent(@Param('id') id: String): Promise<Student> {
          return await this.studentService.deleteStudent(id);
     }
}
