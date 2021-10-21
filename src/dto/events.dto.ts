import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class EventsInputDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  finishTime: Date;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

export class EventsGetDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class EventsUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  finishTime?: Date;
}
