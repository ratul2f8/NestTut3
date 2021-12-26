import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contactInfo.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee
  //, {eager: true}
  )
  contactInfo: ContactInfo;

  @OneToMany(() => Task, (task) => task.employee)
  tasks: Task[];

  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'managerIdFk' })
  manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  directReports: Employee[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendes)
  @JoinTable({
    name: 'employee_meetings',
    joinColumn: {
      name: 'employeeIdFk',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'meetingIdFk',
      referencedColumnName: 'id',
    }
  })
  meetings: Meeting[];
}
