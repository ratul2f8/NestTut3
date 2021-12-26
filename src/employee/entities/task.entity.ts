import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";
@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @ManyToOne(() => Employee, employee => employee.tasks, {onDelete: "SET NULL", nullable: true})
    @JoinColumn({name: "employeeIdFk"})
    employee: Employee;
}