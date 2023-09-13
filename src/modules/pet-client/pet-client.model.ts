import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Appointment } from '../appointment/appointment.model';

export interface IPetClient {
    name: string;
    type: string;
    breed: string;
    gender: string;
    size: string;
    ownerName: string;
    ownerNumber: string;
    nextAppointment?: Date;
    schedules: Appointment[];
}

export enum PetsTypes{
    DOG = 'Dog',
    CAT = 'Cat',
    OTHERS = 'Others'
}

export enum PetsSizes{
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large'
}

export enum PetsGender{
    FEMALE = 'Female',
    MALE= 'Male'
}

@Table
export class PetClient extends Model {
    @Column
    name: string;

    @Column({
        type: DataType.ENUM('Dog', 'Cat', 'Others'),
        allowNull: false
    })
    type: PetsTypes;
   
    @Column({
        type: DataType.ENUM('Female', 'Male'),
        allowNull: false
    })
     gender: string;

    @Column
    breed: string;

    @Column({
        type: DataType.ENUM('Small', 'Medium', 'Large'),
        allowNull: false
    })
    size: PetsSizes;

    @Column
    ownerName: string; // Nome do dono

    @Column
    ownerNumber: string; // Telefone do dono

    @Column
    nextSchedule?: Date;
  
    @HasMany(() => Appointment)
    schedules: Appointment[];
}