import { IsNotEmpty, IsString } from "class-validator";

export class GuestsInputDTO {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  hostId: string;
}
