import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import dbConfig from 'orm.config';
import { Employee } from './employee/entities/employee.entity';
import { ContactInfo } from './employee/entities/contactInfo.entity';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), EmployeeModule, TypeOrmModule.forFeature([Employee, ContactInfo])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
