import { IsNotEmpty, IsString } from 'class-validator'

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

export class GuestsGetByEventDTO {
  @IsString()
  @IsNotEmpty()
  eventId: string;
}

export class GuestsUserDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class GuestsRejectDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
