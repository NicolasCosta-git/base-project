import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class EventsInputDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  finishTime: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
