import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Meeting extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    zoomUrl: string;
    
    @ManyToMany(() => Employee, employee => employee.meetings)
    attendes: Employee[]
}