import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './entities/contactInfo.entity';
import { Employee } from './entities/employee.entity';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}

  async seed() {
    try {
      const ceo = this.employeeRepository.create({ name: 'Rony Hive' });
      await this.employeeRepository.save(ceo);

      const ceoContactInfo = this.contactInfoRepository.create({
        email: 'peter@parker.com',
        employee: ceo,
      });
      await this.contactInfoRepository.save(ceoContactInfo);

      const projectManager = this.employeeRepository.create({
        name: 'Gwen Stacy',
        manager: ceo,
      });

      const task1 = this.taskRepository.create({
        name: 'Create PowerPoint presentation slides',
      });
      await this.taskRepository.save(task1);

      const task2 = this.taskRepository.create({
        name: 'Create JIRA tickets',
      });
      await this.taskRepository.save(task2);

      projectManager.tasks = [task1, task2];
      await this.employeeRepository.save(projectManager);

      const meeting1 = this.meetingRepository.create({
        zoomUrl: 'zoom@join.com',
      });
      meeting1.attendes = [projectManager, ceo];
      await this.meetingRepository.save(meeting1);
    } catch (e) {
      console.error(e);
      throw new BadRequestException();
    }
  }

  async getEmployeeById(id: string) {
    try {

      /*****
       * 
       * if eager is set to true like this in the employee entity, it will pull the contact info every time.Or use the query builder to map nested properties otherwise
       * 
       * @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee, {eager: true})
       */
      // const data = await  this.employeeRepository.findOne(id, {
      //   relations: ['meetings', 'tasks', 'directReports', 'manager', 'contactInfo']
      // });
      const data = await this.employeeRepository
        .createQueryBuilder('employee')
        .leftJoinAndSelect('employee.manager', 'manager')
        .leftJoinAndSelect('manager.contactInfo', "managerContactInfo")
        .leftJoinAndSelect("employee.meetings", "meetings")
        .leftJoinAndSelect("employee.tasks", "tasks")
        .leftJoinAndSelect("employee.contactInfo", "contactInfo")
        .where('employee.id = :id', { id })
        .getOneOrFail();
      return data;
    } catch (e) {
      console.error(e);
      throw new BadRequestException();
    }
  }
}
