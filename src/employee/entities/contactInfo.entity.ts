import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class ContactInfo extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: false})
    email: string;

    @OneToOne(() => Employee, employee => employee.contactInfo, {onDelete: "CASCADE"})
    @JoinColumn({name: "employeeIdFk"})
    employee: Employee;
}