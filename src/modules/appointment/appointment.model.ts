import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { PetClient } from '../pet-client/pet-client.model';

export interface IAppointment {
    petClientId: Number;
    type: string;
    price: Number;
    startDate: Date;
    endDate: Date;
}

export enum AppointmentTypes {
    GROOMING = 'Grooming',
    VETERINARY = 'Veterinary'
}

@Table
export class Appointment extends Model {
    @ForeignKey(() => PetClient)
    @Column
    petClientId: Number;

    @BelongsTo(() => PetClient)
    petClient: PetClient;

    @Column({
        type: DataType.ENUM('Grooming', 'Veterinary'),
        allowNull: false
    })
    type: AppointmentTypes;

    @Column
    price: Number;

    @Column
    startDate: Date;

    @Column
    endDate: Date;
}