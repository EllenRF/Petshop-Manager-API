import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty} from 'class-validator';

export class UpdateAppointmentDTO {
    @ApiProperty({description:"Start Date", example:"2023-11-28T15:25:01.009Z"})
    @IsNotEmpty({ message: "Start Date is a required field!" })
    @IsDateString()
    startDate: Date;

    @ApiProperty({description:"Start Date", example:"2023-11-28T16:25:01.009Z"})
    @IsNotEmpty({ message: "End Date is a required field!" })
    @IsDateString()
    endDate: Date;
}