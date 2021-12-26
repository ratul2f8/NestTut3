import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from './entities/contactInfo.entity';
import { Employee } from './entities/employee.entity';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
@Module({
  imports: [TypeOrmModule.forFeature([Employee, ContactInfo, Task, Meeting])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
