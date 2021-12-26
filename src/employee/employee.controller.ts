import { Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {

    constructor(private employeeService: EmployeeService){}

    @Post('/seed')
    async seed(){
        await this.employeeService.seed();
        return "Seed is complete"
    }
    @Get('/:id')
    async getEmployeeById(@Param('id')id: string){
        return this.employeeService.getEmployeeById(id)
    }
}
