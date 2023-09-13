import { IsDate, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { AppointmentTypes } from '../../appointment.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDTO {
    @ApiProperty({description:"Pet ID", example:"5"})
    @IsNotEmpty({ message: "The pet ID is a required field!" })
    petClientId: Number;

    @ApiProperty({description:"Appointment type", example:"Grooming"})
    @IsNotEmpty({ message: "Type is a required field!" })
    @IsEnum(AppointmentTypes, { message: "Appointment type must be only: Grooming or Veterinary", })
    type: string;

    @ApiProperty({description:"Appointment price", example:" Price of the pet"})
    @IsNotEmpty({ message: "Price is a required field!" })
    price: Number;

    @ApiProperty({description:"Start of the appointment", example:" 2023-11-28T15:25:01.009Z"})
    @IsNotEmpty({ message: "Start Date is a required field!" })
    @IsDateString()
    startDate: Date;

    @ApiProperty({description:"End of the appointment ", example:" 2023-11-28T16:25:01.009Z"})
    @IsNotEmpty({ message: "End Date is a required field!" })
    @IsDateString()
    endDate: Date;
}